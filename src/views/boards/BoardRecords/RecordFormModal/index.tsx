import { yupResolver } from "@hookform/resolvers/yup"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { format as formatDate } from "date-fns"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import {
  GetBudgetRecordsDocument,
  useCreateBudgetRecordMutation,
  useGetBudgetCategoriesQuery,
  useUpdateBudgetRecordMutation,
} from "#api/budget"
import { Board, BudgetCategory, BudgetRecord } from "#api/types"
import { RowGroup } from "#components/RowGroup"
import { IBoardsRouteParams } from "#views/boards/types"

import { FormField, IFormValues, validationSchema } from "./form-helpers"

interface IRecordFormModalProps {
  closeModal(): void
  record: {
    amount: BudgetRecord["amount"]
    category: {
      board: Pick<Board, "id" | "name">
      id: BudgetCategory["id"]
      name: BudgetCategory["name"]
      type: BudgetCategory["type"]
    }
    date: BudgetRecord["date"]
    id: BudgetRecord["id"]
    isTrashed: BudgetRecord["isTrashed"]
  } | null // replace with undefined
}

export const RecordFormModal: React.FC<IRecordFormModalProps> = ({ closeModal, record }) => {
  const params = useParams<IBoardsRouteParams>()

  const defaultValues = record
    ? {
        amount: record.amount,
        categoryId: record.category.id,
        date: record.date,
      }
    : {
        amount: null,
        categoryId: null,
        date: formatDate(new Date(), "yyyy-MM-dd"),
      }

  const { formState, handleSubmit, register } = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  })

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

  if (getBoardBudgetCategoriesResult.data === undefined) return null

  const submitRecordForm = handleSubmit((formValues) => {
    if (formValues.amount === null) return
    if (formValues.categoryId === null) return

    if (record === null) {
      createBudgetRecord({
        variables: {
          amount: formValues.amount,
          categoryId: formValues.categoryId,
          date: formValues.date,
        },
      })
    } else {
      updateBudgetRecord({
        variables: {
          amount: formValues.amount,
          categoryId: formValues.categoryId,
          date: formValues.date,
          id: Number(record.id),
        },
      })
    }

    closeModal()
  })

  return (
    <Dialog onClose={closeModal} open>
      <DialogTitle>{record === null ? "Add a record" : "Edit record"}</DialogTitle>
      <form onSubmit={submitRecordForm}>
        <DialogContent>
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
              <InputLabel>Category</InputLabel>
              {/* TODO: Fix converting value to string. */}
              <Select {...register(FormField.CategoryId, { valueAsNumber: true })} label="Category">
                {getBoardBudgetCategoriesResult.data.budgetCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField {...register(FormField.Date, { required: true })} label="Date" type="date" />
          </RowGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button disabled={!formState.isValid} type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
