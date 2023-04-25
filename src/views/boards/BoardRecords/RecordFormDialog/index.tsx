import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { format as formatDate } from "date-fns"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"

import { useGetBoardQuery } from "#api/boards"
import {
  GetBudgetRecordsDocument,
  useCreateBudgetRecordMutation,
  useGetBudgetCategoriesQuery,
  useUpdateBudgetRecordMutation,
} from "#api/budget"
import { useGetCurrenciesQuery } from "#api/currencies"
import { Board, BudgetCategory, BudgetRecord, Currency, User } from "#api/types"
import { useGetUserQuery } from "#api/users"
import { Dialog } from "#components/Dialog"
import { RowGroup } from "#components/RowGroup"
import { theme } from "#styles/theme"

import { FieldName, IFormValues, validationSchema } from "./form-helpers"

const budgetCategoryIndicatorColorByBudgetCategoryType = new Map([
  [1, theme.palette.error.main],
  [2, theme.palette.success.main],
])

interface IRecordFormDialogProps {
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

export const RecordFormDialog: React.FC<IRecordFormDialogProps> = ({ record }) => {
  const params = useParams<{ boardId: string }>()
  const navigate = useNavigate()

  const getBoardResult = useGetBoardQuery({ variables: { id: Number(params.boardId) } })
  const board = getBoardResult.data?.board

  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })
  const authorizedUser = getAuthorizedUserResult.data?.user

  const defaultValues = record
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
        currencySlug: board?.defaultCurrency?.slug ?? "",
        date: formatDate(new Date(), "yyyy-MM-dd"),
      }

  // TODO: Remove destructuring.
  const { formState, handleSubmit, register } = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  })

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
    if (formValues.amount === null) return
    if (formValues.categoryId === null) return

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
              <InputLabel>Currency</InputLabel>
              <Select
                {...register(FieldName.CurrencySlug)}
                defaultValue={formState.defaultValues?.currencySlug}
                label="Currency"
              >
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
            <Box sx={{ display: "grid" }}>
              <label htmlFor={FieldName.Comment}>Comment</label>
              <textarea {...register(FieldName.Comment)} />
            </Box>
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
