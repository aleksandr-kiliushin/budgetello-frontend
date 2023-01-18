import { yupResolver } from "@hookform/resolvers/yup"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { format as formatDate } from "date-fns"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import {
  GetBudgetRecordsDocument,
  useCreateBudgetRecordMutation,
  useGetBudgetCategoriesQuery,
  useUpdateBudgetRecordMutation,
} from "#api/budget"
import { useGetCurrenciesQuery } from "#api/currencies"
import { Board, BudgetCategory, BudgetRecord, Currency } from "#api/types"
import { Dialog } from "#components/Dialog"
import { IDialogProps } from "#components/Dialog/types"
import { RowGroup } from "#components/RowGroup"
import { theme } from "#styles/theme"

import { FormField, IFormValues, validationSchema } from "./form-helpers"

const budgetCategoryIndicatorColorByBudgetCategoryType = new Map([
  [1, theme.palette.error.main],
  [2, theme.palette.success.main],
])

interface IRecordFormDialogProps {
  closeDialogHref: NonNullable<IDialogProps["closeDialogHref"]>
  record:
    | {
        amount: BudgetRecord["amount"]
        category: {
          board: Pick<Board, "id" | "name">
          id: BudgetCategory["id"]
          name: BudgetCategory["name"]
          type: BudgetCategory["type"]
        }
        currency: Currency
        date: BudgetRecord["date"]
        id: BudgetRecord["id"]
        isTrashed: BudgetRecord["isTrashed"]
      }
    | undefined
}

export const RecordFormDialog: React.FC<IRecordFormDialogProps> = ({ closeDialogHref, record }) => {
  const params = useParams<{ boardId: string }>()
  const navigate = useNavigate()

  const defaultValues = record
    ? {
        amount: record.amount,
        categoryId: record.category.id,
        currencySlug: record.currency.slug,
        date: record.date,
      }
    : {
        amount: null,
        categoryId: null,
        currencySlug: "gel",
        date: formatDate(new Date(), "yyyy-MM-dd"),
      }

  const { formState, handleSubmit, register } = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  })

  const getCurrenciesResult = useGetCurrenciesQuery()
  const getBoardBudgetCategoriesResult = useGetBudgetCategoriesQuery({
    variables: { boardsIds: [Number(params.boardId)] },
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

  if (!getCurrenciesResult.data) return null
  if (!getBoardBudgetCategoriesResult.data) return null

  const submitRecordForm = handleSubmit((formValues) => {
    if (formValues.amount === null) return
    if (formValues.categoryId === null) return

    if (record === undefined) {
      createBudgetRecord({
        variables: {
          amount: formValues.amount,
          categoryId: formValues.categoryId,
          currencySlug: formValues.currencySlug,
          date: formValues.date,
        },
      })
    } else {
      updateBudgetRecord({
        variables: {
          amount: formValues.amount,
          categoryId: formValues.categoryId,
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
            <TextField
              {...register(FormField.Amount, { valueAsNumber: true })}
              error={formState.errors.amount !== undefined}
              fullWidth
              helperText={formState.errors.amount?.message}
              label="Amount"
              type="number"
            />
            <FormControl fullWidth>
              <InputLabel>Currency</InputLabel>
              <Select
                {...register(FormField.CurrencySlug)}
                defaultValue={formState.defaultValues?.currencySlug}
                label="Currency"
              >
                {getCurrenciesResult.data.currencies.map((currency) => (
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
                {...register(FormField.CategoryId, { valueAsNumber: true })}
                defaultValue={formState.defaultValues?.categoryId}
                label="Category"
              >
                {getBoardBudgetCategoriesResult.data.budgetCategories.map((category) => (
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
            <TextField {...register(FormField.Date, { required: true })} label="Date" type="date" />
          </RowGroup>
        </form>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="secondary" href={closeDialogHref} variant="contained">
          Cancel
        </Button>
        <Button color="primary" disabled={!formState.isValid} onClick={submitRecordForm} variant="contained">
          {record === undefined ? "Add" : "Save"}
        </Button>
      </Dialog.Footer>
    </Dialog>
  )
}
