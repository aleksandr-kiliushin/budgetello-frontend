import { yupResolver } from "@hookform/resolvers/yup"
import { Button, TextField, Typography } from "@mui/material"
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
import { Dialog } from "#components/Dialog"
import { RowGroup } from "#components/RowGroup"
import { RadioGroup } from "#components/form-contructor/RadioGroup"
import { IBoardsRouteParams } from "#views/boards/types"

import { FormField, FormValues, validationSchema } from "./form-helpers"

interface ICategoryFormDialogProps {
  category: Pick<BudgetCategory, "id" | "name" | "type"> | undefined
  closeDialog(): void
}

export const CategoryFormDialog: React.FC<ICategoryFormDialogProps> = ({ category, closeDialog }) => {
  const params = useParams<IBoardsRouteParams>()

  // ToDo: Note: It is encouraged that you set a defaultValue for all inputs to non-undefined
  // such as the empty string or null (https://react-hook-form.com/kr/v6/api/).
  const defaultValues = category === undefined ? { name: "" } : { name: category.name, typeId: category.type.id }

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

  const getBudgetCategoryTypesResult = useGetBudgetCategoryTypesQuery()
  const [createCategory] = useCreateBudgetCategoryMutation({
    refetchQueries: [{ query: GetBudgetCategoriesDocument, variables: { boardsIds: [Number(params.boardId)] } }],
  })
  const [updateCategory] = useUpdateBudgetCategoryMutation()

  if (!getBudgetCategoryTypesResult.data) return null

  const submitCategoryForm = handleSubmit(async (formValues) => {
    if (params.boardId === undefined) return
    try {
      if (category === undefined) {
        const result = await createCategory({
          variables: {
            boardId: Number(params.boardId),
            name: formValues.name,
            typeId: formValues.typeId,
          },
        })
        if (result.errors !== undefined) throw errors
      } else {
        const result = await updateCategory({
          variables: {
            boardId: Number(params.boardId),
            id: category.id,
            name: formValues.name,
            typeId: formValues.typeId,
          },
        })
        if (result.errors !== undefined) throw errors
      }
      closeDialog()
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorFields = (error as any).graphQLErrors[0].extensions.exception.response.fields

      Object.entries(errorFields).forEach(([fieldName, error]) => {
        setError(fieldName as FormField, { type: "custom", message: error as string })
      })
    }
  })

  return (
    <Dialog closeDialog={closeDialog}>
      <Dialog.Header>
        <Typography variant="h2">{category ? "Edit category" : "Create category"}</Typography>
      </Dialog.Header>
      <Dialog.Body>
        <form>
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
              options={getBudgetCategoryTypesResult.data.budgetCategoryTypes.map(({ id, name }) => ({
                label: name,
                value: id,
              }))}
              register={register}
              setValue={setValue}
            />
          </RowGroup>
        </form>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="secondary" onClick={closeDialog} variant="contained">
          Cancel
        </Button>
        <Button disabled={!isValid} onClick={submitCategoryForm} variant="contained">
          {category === undefined ? "Create" : "Save"}
        </Button>
      </Dialog.Footer>
    </Dialog>
  )
}
