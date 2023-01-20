import {
  DoneOutlined as DoneOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  UndoOutlined as UndoOutlinedIcon,
} from "@mui/icons-material"
import { Button, MenuItem, Select, TableCell, TableRow } from "@mui/material"
import React, { FC, useEffect, useState } from "react"
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

  const { register, handleSubmit, formState, resetField } = useForm<{ defaultCurrencySlug: string }>({
    defaultValues: { defaultCurrencySlug: "" },
  })

  useEffect(() => {
    if (board === undefined) return
    if (board.defaultCurrency === null) return
    if (board.defaultCurrency === undefined) return
    resetField("defaultCurrencySlug", { defaultValue: board.defaultCurrency.slug })
  }, [board, mode, resetField])

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
          <Select
            {...register("defaultCurrencySlug")}
            defaultValue={formState.defaultValues?.defaultCurrencySlug}
            size="small"
          >
            {currencies?.map((currency) => (
              <MenuItem key={currency.slug} value={currency.slug}>
                {currency.name} {currency.symbol}
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
