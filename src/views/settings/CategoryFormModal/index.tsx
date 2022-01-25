import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import RowGroup from '#components/RowGroup'
import { createCategoryTc, updateCategoryTc } from '#models/finance'
import { FinanceCategory, FinanceCategoryType } from '#types/finance'
import { useAppDispatch } from '#utils/hooks'

import { FormField, FormValues } from './form-helpers'

const CategoryFormModal: FC<Props> = ({ category, categoryTypes, closeModal }) => {
  const dispatch = useAppDispatch()

  const defaultValues = category
    ? { name: category.name, typeId: category.type.id }
    : { name: undefined, typeId: undefined }

  const { handleSubmit, register } = useForm<FormValues>({ defaultValues })

  const submitCategoryForm = handleSubmit(({ name, typeId }) => {
    if (category) {
      dispatch(updateCategoryTc({ categoryId: category.id, name, typeId: Number(typeId) }))
    } else {
      dispatch(createCategoryTc({ name, typeId: Number(typeId) }))
    }

    closeModal()
  })

  return (
    <Dialog open onClose={closeModal}>
      <DialogTitle>{category ? 'Edit category' : 'Create category'}</DialogTitle>
      <form onSubmit={submitCategoryForm}>
        <DialogContent>
          <RowGroup>
            <TextField label="Name" {...register(FormField.Name, { required: true })} />
            <FormControl>
              <FormLabel htmlFor={FormField.TypeId}>Type</FormLabel>
              <RadioGroup id={FormField.TypeId} aria-labelledby={FormField.TypeId}>
                {categoryTypes.map(({ name, id }) => (
                  <FormControlLabel
                    control={<Radio />}
                    key={id}
                    label={name}
                    value={id}
                    {...register(FormField.TypeId, { required: true })}
                  />
                ))}
              </RadioGroup>
            </FormControl>
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
  category: FinanceCategory | null
  categoryTypes: FinanceCategoryType[]
  closeModal(): void
}

export default CategoryFormModal
