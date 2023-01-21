import { yupResolver } from "@hookform/resolvers/yup"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { GetBoardsDocument, useCreateBoardMutation } from "#api/boards"
import { useGetCurrenciesQuery } from "#api/currencies"
import { Dialog } from "#components/Dialog"
import { RowGroup } from "#components/RowGroup"

import { FieldName, IFormValues, defaultValues, validationSchema } from "./form-helpers"

export const CreateBoardFormDialog: FC = () => {
  const navigate = useNavigate()

  const { formState, handleSubmit, register, setError } = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  })

  const getCurrenciesResult = useGetCurrenciesQuery()

  const [createBoard] = useCreateBoardMutation({
    refetchQueries: [
      { query: GetBoardsDocument, variables: { iAmMemberOf: true } },
      { query: GetBoardsDocument, variables: { iAmMemberOf: false } },
    ],
  })

  const currencies = getCurrenciesResult.data?.currencies

  const submitRecordForm = handleSubmit(async ({ defaultCurrencySlug, name }) => {
    if (defaultCurrencySlug === null) return
    try {
      const createBoardResult = await createBoard({ variables: { defaultCurrencySlug, name, subjectId: 1 } })
      if (createBoardResult.errors !== undefined) throw createBoardResult.errors
      navigate(`/boards/${createBoardResult.data?.createBoard.id}/records`)
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorFields = (error as any).graphQLErrors[0].extensions.exception.response.fields

      Object.entries(errorFields).forEach(([fieldName, error]) => {
        setError(fieldName as FieldName, { type: "custom", message: error as string })
      })
    }
  })

  const closeDialogHref = `/boards`

  return (
    <Dialog closeDialogHref={closeDialogHref}>
      <Dialog.Header>
        <Typography variant="h2">Create a board</Typography>
      </Dialog.Header>
      <Dialog.Body>
        <form>
          <RowGroup>
            <TextField
              {...register("name")}
              error={formState.errors.name !== undefined}
              helperText={formState.errors.name?.message}
              label="Name"
            />
            <FormControl fullWidth>
              <InputLabel>Default currency</InputLabel>
              <Select
                {...register(FieldName.DefaultCurrencySlug)}
                error={formState.errors.defaultCurrencySlug !== undefined}
              >
                {currencies?.map((currency) => (
                  <MenuItem key={currency.slug} value={currency.slug}>
                    {currency.name} {currency.symbol}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </RowGroup>
        </form>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="secondary" component={Link} to={closeDialogHref} variant="contained">
          Cancel
        </Button>
        <Button color="primary" disabled={!formState.isValid} onClick={submitRecordForm} variant="contained">
          Create
        </Button>
      </Dialog.Footer>
    </Dialog>
  )
}
