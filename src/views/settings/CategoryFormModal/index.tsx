import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import { FC } from "react"
import { useForm } from "react-hook-form"

import RowGroup from "#components/RowGroup"
import RadioGroup from "#components/form-contructor/RadioGroup"
import { createCategoryTc, updateCategoryTc } from "#models/finances"
import { FinanceCategory, FinanceCategoryType } from "#types/finance"
import { useAppDispatch } from "#utils/hooks"

import { FormField, FormValues, validationSchema } from "./form-helpers"

const CategoryFormModal: FC<Props> = ({ category, categoryTypes, closeModal }) => {
  const dispatch = useAppDispatch()

  // ToDo: Note: It is encouraged that you set a defaultValue for all inputs to non-undefined
  // such as the empty string or null (https://react-hook-form.com/kr/v6/api/).
  const defaultValues = category ? { name: category.name, typeId: category.type.id } : { name: "" }

  const {
    formState: { isValid },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  })

  const submitCategoryForm = handleSubmit(({ name, typeId }) => {
    if (category) {
      dispatch(updateCategoryTc({ categoryId: category.id, name, typeId: Number(typeId) }))
    } else {
      dispatch(createCategoryTc({ name, typeId }))
    }

    closeModal()
  })

  const categoryTypeOptions = categoryTypes.map(({ id, name }) => ({
    label: name,
    value: id,
  }))

  return (
    <Dialog open onClose={closeModal}>
      <DialogTitle>{category ? "Edit category" : "Create category"}</DialogTitle>
      <form aria-label="finance-category-form" onSubmit={submitCategoryForm}>
        <DialogContent>
          <RowGroup>
            <TextField label="Name" {...register(FormField.Name)} />
            <RadioGroup
              defaultValue={defaultValues.typeId}
              label="Category type"
              name={FormField.TypeId}
              options={categoryTypeOptions}
              register={register}
            />
          </RowGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button disabled={!isValid} type="submit">
            Submit
          </Button>
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
