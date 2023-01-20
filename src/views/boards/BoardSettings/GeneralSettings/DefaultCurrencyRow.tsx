import {
  DoneOutlined as DoneOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  UndoOutlined as UndoOutlinedIcon,
} from "@mui/icons-material"
import { Button, MenuItem, Select, TableCell, TableRow } from "@mui/material"
import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { useGetBoardQuery, useUpdateBoardMutation } from "#api/boards"
import { useGetCurrenciesQuery } from "#api/currencies"

export const DefaultCurrencyRow: FC = () => {
  const params = useParams<{ boardId: string }>()

  const [mode, setMode] = useState<"view" | "edit">("view")

  const getBoardResult = useGetBoardQuery({ variables: { id: Number(params.boardId) } })
  const board = getBoardResult.data?.board

  const getCurrenciesResult = useGetCurrenciesQuery()
  const currencies = getCurrenciesResult.data?.currencies

  const [updateBoard] = useUpdateBoardMutation()

  const { register, handleSubmit, formState } = useForm<{ defaultCurrencySlug: string }>()

  const updateBoardDefaultCurrency = handleSubmit(async (formValues) => {
    await updateBoard({
      variables: {
        defaultCurrencySlug: formValues.defaultCurrencySlug,
        id: Number(params.boardId),
      },
    })
    setMode("view")
  })

  if (mode === "view") {
    return (
      <TableRow>
        <TableCell>Default currency</TableCell>
        <TableCell>
          {board?.defaultCurrency ? (
            <>
              {board.defaultCurrency.name} {board.defaultCurrency.symbol}
            </>
          ) : (
            "Not selected"
          )}
        </TableCell>
        <TableCell>
          <Button onClick={() => setMode("edit")} size="small" startIcon={<EditOutlinedIcon />} />
        </TableCell>
        <TableCell />
      </TableRow>
    )
  }

  if (mode === "edit") {
    return (
      <TableRow>
        <TableCell>Default currency</TableCell>
        <TableCell>
          <Select {...register("defaultCurrencySlug")} defaultValue={board?.defaultCurrency?.slug ?? ""} size="small">
            {currencies?.map((option) => (
              <MenuItem key={option.slug} value={option.slug}>
                {option.name} {option.symbol}
              </MenuItem>
            ))}
          </Select>
        </TableCell>
        <TableCell>
          <Button onClick={() => setMode("view")} size="small" startIcon={<UndoOutlinedIcon />} />
        </TableCell>
        <TableCell>
          <Button
            color="success"
            disabled={!formState.isDirty}
            onClick={updateBoardDefaultCurrency}
            size="small"
            startIcon={<DoneOutlinedIcon />}
          />
        </TableCell>
      </TableRow>
    )
  }

  return null
}
