import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"

import {
  GetBudgetCategoriesDocument,
  useCreateBudgetCategoryMutation,
  useGetBudgetCategoryTypesQuery,
  useUpdateBudgetCategoryMutation,
} from "#api/budget"
import { BudgetCategory } from "#api/types"
import { Dialog } from "#components/Dialog"
import { RowGroup } from "#components/RowGroup"

import { FieldName, TFormDefaultValues, TFormValidValues, validationSchema } from "./form-helpers"

type TCategoryFormDialogProps = {
  category: Pick<BudgetCategory, "id" | "name" | "type"> | undefined
}

export const CategoryFormDialog: FC<TCategoryFormDialogProps> = ({ category }) => {
  const navigate = useNavigate()
  const params = useParams<{ boardId: string }>()

  const defaultValues: TFormDefaultValues = {
    [FieldName.Name]: category === undefined ? "" : category.name,
    [FieldName.TypeId]: category === undefined ? null : category.type.id,
  }

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
    setValue,
    watch,
  } = useForm<TFormDefaultValues, void, TFormValidValues>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  })

  const getBudgetCategoryTypesResult = useGetBudgetCategoryTypesQuery()
  const [createCategory] = useCreateBudgetCategoryMutation({
    refetchQueries: [
      {
        query: GetBudgetCategoriesDocument,
        variables: {
          boardsIds: [Number(params.boardId)],
          orderingById: "DESC",
        },
      },
    ],
  })
  const [updateCategory] = useUpdateBudgetCategoryMutation()

  const budgetCategoryTypes = getBudgetCategoryTypesResult.data?.budgetCategoryTypes ?? []

  const closeDialogHref = `/boards/${params.boardId}/settings`

  const submitCategoryForm = handleSubmit(async (formValues) => {
    if (params.boardId === undefined) return
    try {
      if (category === undefined) {
        const response = await createCategory({
          variables: {
            boardId: Number(params.boardId),
            name: formValues.name,
            typeId: formValues.typeId,
          },
        })
        if (response.errors !== undefined) throw response.errors
      } else {
        const response = await updateCategory({
          variables: {
            boardId: Number(params.boardId),
            id: category.id,
            name: formValues.name,
            typeId: formValues.typeId,
          },
        })
        if (response.errors !== undefined) throw response.errors
      }
      navigate(closeDialogHref)
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorFields = (error as any).graphQLErrors[0].extensions.exception.response.fields

      Object.entries(errorFields).forEach(([fieldName, error]) => {
        setError(fieldName as FieldName, { type: "custom", message: error as string })
      })
    }
  })

  return (
    <Dialog closeDialogHref={closeDialogHref}>
      <Dialog.Header>
        <Typography variant="h2">{category === undefined ? "Add a category" : "Edit category"}</Typography>
      </Dialog.Header>
      <Dialog.Body>
        <form>
          <RowGroup>
            <TextField
              {...register(FieldName.Name)}
              error={errors.name !== undefined}
              helperText={errors.name?.message}
              label="Name"
            />
            <FormControl>
              <FormLabel id={FieldName.TypeId}>Gender</FormLabel>
              <RadioGroup
                aria-labelledby={FieldName.TypeId}
                defaultValue={null}
                name={FieldName.TypeId}
                onChange={(event) => {
                  setValue(FieldName.TypeId, parseInt(event.target.value), { shouldValidate: true })
                }}
                value={watch("typeId")}
              >
                {budgetCategoryTypes.map((type) => (
                  <FormControlLabel control={<Radio />} key={type.id} label={type.name} value={type.id} />
                ))}
              </RadioGroup>
              {<FormHelperText error>{errors.typeId?.message}</FormHelperText>}
            </FormControl>
          </RowGroup>
        </form>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="secondary" component={Link} role="button" to={closeDialogHref} variant="contained">
          Cancel
        </Button>
        <Button disabled={!isValid} onClick={submitCategoryForm} variant="contained">
          {category === undefined ? "Add" : "Save"}
        </Button>
      </Dialog.Footer>
    </Dialog>
  )
}
