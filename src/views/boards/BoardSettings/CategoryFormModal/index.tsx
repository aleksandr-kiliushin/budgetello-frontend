import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import React from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import {
  GetBudgetCategoriesDocument,
  useCreateBudgetCategoryMutation,
  useGetBudgetCategoryTypesQuery,
  useUpdateBudgetCategoryMutation,
} from "#api/budget"
import { BudgetCategory } from "#api/types"
import { RowGroup } from "#components/RowGroup"
import { RadioGroup } from "#components/form-contructor/RadioGroup"
import { IBoardsRouteParams } from "#views/boards/types"

import { FormField, FormValues, validationSchema } from "./form-helpers"

interface ICategoryFormModalProps {
  category: Pick<BudgetCategory, "id" | "name" | "type"> | null
  closeModal(): void
}

export const CategoryFormModal: React.FC<ICategoryFormModalProps> = ({ category, closeModal }) => {
  const params = useParams<IBoardsRouteParams>()

  // ToDo: Note: It is encouraged that you set a defaultValue for all inputs to non-undefined
  // such as the empty string or null (https://react-hook-form.com/kr/v6/api/).
  const defaultValues = category === null ? { name: "" } : { name: category.name, typeId: category.type.id }

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  })

  const queryBudgetCategoryTypesResponse = useGetBudgetCategoryTypesQuery()
  const [createCategory] = useCreateBudgetCategoryMutation({
    refetchQueries: [{ query: GetBudgetCategoriesDocument, variables: { boardsIds: [Number(params.boardId)] } }],
  })
  const [updateCategory] = useUpdateBudgetCategoryMutation()

  if (queryBudgetCategoryTypesResponse.data === undefined) return null

  const submitCategoryForm = handleSubmit(async (formValues) => {
    if (params.boardId === undefined) return
    try {
      if (category === null) {
        const response = await createCategory({
          variables: {
            boardId: Number(params.boardId),
            name: formValues.name,
            typeId: formValues.typeId,
          },
        })
        if (response.errors !== undefined) throw errors
      } else {
        const response = await updateCategory({
          variables: {
            boardId: Number(params.boardId),
            id: category.id,
            name: formValues.name,
            typeId: formValues.typeId,
          },
        })
        if (response.errors !== undefined) throw errors
      }
      closeModal()
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorFields = (error as any).graphQLErrors[0].extensions.exception.response.fields

      Object.entries(errorFields).forEach(([fieldName, error]) => {
        setError(fieldName as FormField, { type: "custom", message: error as string })
      })
    }
  })

  return (
    <Dialog onClose={closeModal} open>
      <DialogTitle>{category ? "Edit category" : "Create category"}</DialogTitle>
      <form aria-label="budget-category-form" onSubmit={submitCategoryForm}>
        <DialogContent>
          <RowGroup>
            <TextField
              {...register(FormField.Name)}
              error={errors.name !== undefined}
              helperText={errors.name?.message}
              label="Name"
            />
            <RadioGroup
              fieldValue={watch("typeId")}
              helperText={errors.typeId?.message}
              label="Category type"
              name={FormField.TypeId}
              options={queryBudgetCategoryTypesResponse.data.budgetCategoryTypes.map(({ id, name }) => ({
                label: name,
                value: id,
              }))}
              register={register}
              setValue={setValue}
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
