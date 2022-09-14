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
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  })

  const submitCategoryForm = handleSubmit(async ({ name, typeId }) => {
    try {
      if (category === null) {
        const error = await dispatch(createCategoryTc({ name, typeId })).unwrap()
        if (error !== undefined) throw error
      } else {
        const error = await dispatch(
          updateCategoryTc({ categoryId: category.id, name, typeId: Number(typeId) })
        ).unwrap()
        if (error !== undefined) throw error
      }
      closeModal()
    } catch (error) {
      if (typeof error !== "object") return
      if (error === null) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.entries((error as any).fields).forEach(([fieldName, error]) => {
        setError(fieldName as FormField, { type: "custom", message: error as string })
      })
    }
  })

  return (
    <Dialog open onClose={closeModal}>
      <DialogTitle>{category ? "Edit category" : "Create category"}</DialogTitle>
      <form aria-label="finance-category-form" onSubmit={submitCategoryForm}>
        <DialogContent>
          <RowGroup>
            <TextField
              {...register(FormField.Name)}
              error={errors.name !== undefined}
              helperText={errors.name?.message}
              label="Name"
            />
            <RadioGroup
              defaultValue={defaultValues.typeId}
              // error={errors.typeId !== undefined}
              // helperText={errors.typeId?.message}
              label="Category type"
              name={FormField.TypeId}
              options={categoryTypes.map(({ id, name }) => ({ label: name, value: id }))}
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
