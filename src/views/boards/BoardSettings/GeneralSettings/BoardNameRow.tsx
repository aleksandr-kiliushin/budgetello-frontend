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

export const BoardNameRow: FC = () => {
  const params = useParams<{ boardId: string }>()

  const [mode, setMode] = useState<"view" | "edit">("view")

  const getBoardResult = useGetBoardQuery({ variables: { id: Number(params.boardId) } })
  const board = getBoardResult.data?.board

  const [updateBoard] = useUpdateBoardMutation()

  const { register, handleSubmit, formState } = useForm<{ name: string }>()

  const updateBoardName = handleSubmit(async (formValues) => {
    await updateBoard({
      variables: {
        id: Number(params.boardId),
        name: formValues.name,
      },
    })
    setMode("view")
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
          <TextField {...register("name")} defaultValue={board?.name} size="small" />
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
