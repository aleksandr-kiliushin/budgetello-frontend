import {
  DoneOutlined as DoneOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  UndoOutlined as UndoOutlinedIcon,
} from "@mui/icons-material"
import { Button, TableCell, TableRow, TextField } from "@mui/material"
import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { useGetBoardQuery, useUpdateBoardMutation } from "#api/boards"

enum FieldName {
  Name = "name",
}

export const BoardNameRow: FC = () => {
  const params = useParams<{ boardId: string }>()

  const [mode, setMode] = useState<"view" | "edit">("view")

  const getBoardResult = useGetBoardQuery({ variables: { id: Number(params.boardId) } })
  const board = getBoardResult.data?.board

  const [updateBoard] = useUpdateBoardMutation()

  const { formState, handleSubmit, register, setError } = useForm<{ [FieldName.Name]: string }>()

  const updateBoardName = handleSubmit(async (formValues) => {
    try {
      const response = await updateBoard({
        variables: {
          id: Number(params.boardId),
          name: formValues.name,
        },
      })
      if (response.errors !== undefined) throw response.errors
      setMode("view")
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorFields = (error as any).graphQLErrors[0].extensions.exception.response.fields

      Object.entries(errorFields).forEach(([fieldName, error]) => {
        setError(fieldName as FieldName.Name, { type: "custom", message: error as string })
      })
    }
  })

  if (mode === "view") {
    return (
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>{board?.name}</TableCell>
        <TableCell>
          <Button id="edit-board-name" onClick={() => setMode("edit")} size="small" startIcon={<EditOutlinedIcon />} />
        </TableCell>
        <TableCell />
      </TableRow>
    )
  }

  if (mode === "edit") {
    return (
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>
          <TextField
            {...register(FieldName.Name)}
            defaultValue={board?.name}
            error={formState.errors.name !== undefined}
            helperText={formState.errors.name?.message}
            size="small"
          />
        </TableCell>
        <TableCell>
          <Button
            id="cancel-board-name-editing"
            onClick={() => setMode("view")}
            size="small"
            startIcon={<UndoOutlinedIcon />}
          />
        </TableCell>
        <TableCell>
          <Button
            color="success"
            disabled={!formState.isDirty}
            id="submit-board-name-editing"
            onClick={updateBoardName}
            size="small"
            startIcon={<DoneOutlinedIcon />}
          />
        </TableCell>
      </TableRow>
    )
  }

  return null
}
