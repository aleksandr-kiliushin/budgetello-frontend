import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { format as formatDate } from "date-fns"
import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"

import { useGetBoardQuery } from "#api/boards/index.generated"
import {
  GetBudgetRecordsDocument,
  useCreateBudgetRecordMutation,
  useGetBudgetCategoriesQuery,
  useUpdateBudgetRecordMutation,
} from "#api/budget/index.generated"
import { useGetCurrenciesQuery } from "#api/currencies/index.generated"
import { Board, BudgetCategory, BudgetRecord, Currency, User } from "#api/types.generated"
import { useGetUserQuery } from "#api/users/index.generated"
import { Dialog } from "#components/Dialog"
import { RowGroup } from "#components/RowGroup"
import { theme } from "#styles/theme"

import { FieldName, TFormDefaultValues, TFormValidValues, validationSchema } from "./form-helpers"

const budgetCategoryIndicatorColorByBudgetCategoryType = new Map([
  [1, theme.palette.error.main],
  [2, theme.palette.success.main],
])

type TRecordFormDialogProps = {
  record:
    | {
        author: Pick<User, "id" | "username">
        amount: BudgetRecord["amount"]
        category: {
          board: Pick<Board, "id" | "name">
          id: BudgetCategory["id"]
          name: BudgetCategory["name"]
          type: BudgetCategory["type"]
        }
        comment: BudgetRecord["comment"]
        currency: Currency
        date: BudgetRecord["date"]
        id: BudgetRecord["id"]
        isTrashed: BudgetRecord["isTrashed"]
      }
    | undefined
}

export const RecordFormDialog: FC<TRecordFormDialogProps> = ({ record }) => {
  const params = useParams<{ boardId: string }>()
  const navigate = useNavigate()

  const getBoardResult = useGetBoardQuery({ variables: { id: Number(params.boardId) } })
  const board = getBoardResult.data?.board

  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })
  const authorizedUser = getAuthorizedUserResult.data?.user

  const defaultValues: TFormDefaultValues = record
    ? {
        amount: record.amount,
        categoryId: record.category.id,
        comment: record.comment,
        currencySlug: record.currency.slug,
        date: record.date,
      }
    : {
        amount: null,
        categoryId: null,
        comment: "",
        currencySlug: null,
        date: formatDate(new Date(), "yyyy-MM-dd"),
      }

  const { formState, handleSubmit, register, watch, setValue } = useForm<TFormDefaultValues, void, TFormValidValues>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    // Is it possible for a board to have default currency nul | undefined?
    if (board?.defaultCurrency && watch("currencySlug") === null) {
      setValue(FieldName.CurrencySlug, board.defaultCurrency.slug)
    }
  }, [board, setValue, watch])

  const getCurrenciesResult = useGetCurrenciesQuery()
  const getBoardBudgetCategoriesResult = useGetBudgetCategoriesQuery({
    variables: { boardsIds: [Number(params.boardId)], orderingByType: "ASC" },
  })

  const [createBudgetRecord] = useCreateBudgetRecordMutation({
    refetchQueries: [
      {
        query: GetBudgetRecordsDocument,
        variables: {
          boardsIds: [Number(params.boardId)],
          isTrashed: false,
          orderingByDate: "DESC",
          orderingById: "DESC",
          skip: 0,
          take: 50,
        },
      },
    ],
  })
  const [updateBudgetRecord] = useUpdateBudgetRecordMutation()

  const currencies = getCurrenciesResult.data?.currencies
  const boardBudgetCategories = getBoardBudgetCategoriesResult.data?.budgetCategories

  const closeDialogHref = `/boards/${params.boardId}/records${location.search}`

  const submitRecordForm = handleSubmit((formValues) => {
    if (record === undefined) {
      createBudgetRecord({
        variables: {
          amount: formValues.amount,
          categoryId: formValues.categoryId,
          comment: formValues.comment,
          currencySlug: formValues.currencySlug,
          date: formValues.date,
        },
      })
    } else {
      updateBudgetRecord({
        variables: {
          amount: formValues.amount,
          categoryId: formValues.categoryId,
          comment: formValues.comment,
          currencySlug: formValues.currencySlug,
          date: formValues.date,
          id: Number(record.id),
        },
      })
    }

    navigate(closeDialogHref)
  })

  return (
    <Dialog closeDialogHref={closeDialogHref}>
      <Dialog.Header>
        <Typography variant="h2">{record === undefined ? "Add a record" : "Edit record"}</Typography>
      </Dialog.Header>
      <Dialog.Body>
        <form>
          <RowGroup>
            <Box sx={{ display: "grid", gridAutoFlow: "column", justifyContent: "start", columnGap: "4px" }}>
              Author: <strong>{record === undefined ? authorizedUser?.username : record.author.username}</strong>
            </Box>
            <TextField
              {...register(FieldName.Amount, { valueAsNumber: true })}
              error={formState.errors.amount !== undefined}
              fullWidth
              helperText={formState.errors.amount?.message}
              label="Amount"
              type="number"
            />
            <FormControl fullWidth>
              <Select {...register(FieldName.CurrencySlug)} value={watch(FieldName.CurrencySlug)}>
                {currencies?.map((currency) => (
                  <MenuItem key={currency.slug} value={currency.slug}>
                    {currency.name} {currency.symbol}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              {/* TODO: Fix converting value to string. */}
              <Select
                {...register(FieldName.CategoryId, { valueAsNumber: true })}
                defaultValue={formState.defaultValues?.categoryId}
                label="Category"
              >
                {boardBudgetCategories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    <Typography
                      component="span"
                      sx={{ color: budgetCategoryIndicatorColorByBudgetCategoryType.get(category.type.id) }}
                    >
                      ●
                    </Typography>
                    &nbsp;
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField {...register(FieldName.Date, { required: true })} label="Date" type="date" />
            <TextField {...register(FieldName.Comment)} label="Comment" />
          </RowGroup>
        </form>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="secondary" component={Link} role="button" to={closeDialogHref} variant="contained">
          Cancel
        </Button>
        <Button color="primary" disabled={!formState.isValid} onClick={submitRecordForm} variant="contained">
          {record === undefined ? "Add" : "Save"}
        </Button>
      </Dialog.Footer>
    </Dialog>
  )
}
