import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { useGetBudgetCategoriesQuery } from "#api/budget"
import { BudgetRecord } from "#api/types"
import { RowGroup } from "#components/RowGroup"
import { createRecordTc, updateRecordTc } from "#models/budget"
import { useAppDispatch } from "#utils/hooks"
import { IBoardsRouteParams } from "#views/boards/types"

import { FormField, IFormValues, validationSchema } from "./form-helpers"

interface IRecordFormModalProps {
  closeModal(): void
  record: BudgetRecord | null
}

export const RecordFormModal: React.FC<IRecordFormModalProps> = ({ closeModal, record }) => {
  const params = useParams<IBoardsRouteParams>()
  const dispatch = useAppDispatch()

  const defaultValues = record
    ? {
        amount: record.amount,
        categoryId: record.category.id,
        date: record.date,
      }
    : {
        amount: null,
        categoryId: null,
        date: format(new Date(), "yyyy-MM-dd"),
      }

  const { formState, handleSubmit, register } = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  })

  const getBoardBudgetCategoriesResponse = useGetBudgetCategoriesQuery({
    variables: { boardsIds: [Number(params.boardId)] },
  })
  if (getBoardBudgetCategoriesResponse.data === undefined) return null

  const submitRecordForm = handleSubmit(({ amount, categoryId, date }) => {
    if (amount === null) return
    if (categoryId === null) return

    const payload = { amount, categoryId, date }

    if (record) {
      dispatch(updateRecordTc({ ...payload, id: record.id }))
    } else {
      dispatch(createRecordTc(payload))
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
                {getBoardBudgetCategoriesResponse.data.budgetCategories.map((category) => (
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
