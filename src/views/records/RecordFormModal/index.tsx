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
import { FC } from "react"
import { useForm } from "react-hook-form"

import RowGroup from "#components/RowGroup"
import { createRecordTc, updateRecordTc } from "#models/finances"
import { FinanceCategory, FinanceRecord } from "#types/finance"
import { useAppDispatch } from "#utils/hooks"

import { FormFieldName, FormValues } from "./form-helpers"

const RecordFormModal: FC<Props> = ({ categories, closeModal, record }) => {
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

  const { handleSubmit, register } = useForm<FormValues>({ defaultValues })

  const submitRecordForm = handleSubmit(({ amount, categoryId, date }) => {
    if (amount === null) return
    if (categoryId === null) return

    const payload = {
      amount,
      categoryId,
      date,
    }

    if (record) {
      dispatch(updateRecordTc({ ...payload, id: record.id }))
    } else {
      dispatch(createRecordTc(payload))
    }

    closeModal()
  })

  return (
    <Dialog onClose={closeModal} open>
      <DialogTitle>Add a record</DialogTitle>
      <form onSubmit={submitRecordForm}>
        <DialogContent>
          <RowGroup>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              {...register(FormFieldName.Amount, { required: true, valueAsNumber: true })}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select defaultValue="" label="Category" {...register(FormFieldName.CategoryId, { required: true })}>
                {categories.map(({ name, id }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField fullWidth label="Date" type="date" {...register(FormFieldName.Date, { required: true })} />
          </RowGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

interface Props {
  categories: FinanceCategory[]
  closeModal(): void
  record: FinanceRecord | null
}

export default RecordFormModal
