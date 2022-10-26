import {
  DeleteOutline as DeleteOutlineIcon,
  EditOutlined as EditOutlinedIcon,
  Restore as RestoreIcon,
} from "@mui/icons-material"
import { TableCell, TableRow } from "@mui/material"
import React from "react"
import { useToggle } from "react-use"

import { useDeleteBudgetRecordMutation, useUpdateBudgetRecordMutation } from "#api/budget"
import { Board, BudgetCategory, BudgetRecord } from "#api/types"
import { theme } from "#styles/theme"

import { RecordFormDialog } from "./RecordFormDialog"

const mapCategoryTypeIdToPseudoElementContent = new Map([
  [1, "-"],
  [2, "+"],
])

const amountColorByBudgetCategoryType = new Map([
  [1, theme.palette.error.main],
  [2, theme.palette.success.main],
])

interface IRecordTableRowProps {
  isTrash: boolean
  record: {
    amount: BudgetRecord["amount"]
    category: {
      board: Pick<Board, "id" | "name">
      id: BudgetCategory["id"]
      name: BudgetCategory["name"]
      type: BudgetCategory["type"]
    }
    date: BudgetRecord["date"]
    id: BudgetRecord["id"]
    isTrashed: BudgetRecord["isTrashed"]
  }
}

export const RecordTableRow: React.FC<IRecordTableRowProps> = ({ isTrash, record }) => {
  const [isRecordEditingDialogShown, toggleIsRecordEditingDialogShown] = useToggle(false)

  const [deleteBudgetRecord] = useDeleteBudgetRecordMutation({
    update: (cache) => cache.modify({ fields: { budgetRecords() {} } }),
  })
  const [updateBudgetRecord] = useUpdateBudgetRecordMutation({
    update: (cache) => cache.modify({ fields: { budgetRecords() {} } }),
  })

  const mapIsTrashToActionCell = new Map([
    [
      false,
      // eslint-disable-next-line react/jsx-key
      <TableCell
        id={`${record.date}-${record.category.type.name}-${record.category.name}-${record.amount}-edit-button`}
        onClick={toggleIsRecordEditingDialogShown}
        width="12%"
      >
        <EditOutlinedIcon />
      </TableCell>,
    ],
    [
      true,
      // eslint-disable-next-line react/jsx-key
      <TableCell
        id={`${record.date}-${record.category.type.name}-${record.category.name}-${record.amount}-restore-button`}
        onClick={() => updateBudgetRecord({ variables: { id: record.id, isTrashed: false } })}
        width="12%"
      >
        <RestoreIcon />
      </TableCell>,
    ],
  ])

  return (
    <>
      <TableRow>
        <TableCell
          sx={{
            color: amountColorByBudgetCategoryType.get(record.category.type.id),
            "&::before": {
              content: `"${mapCategoryTypeIdToPseudoElementContent.get(record.category.type.id)}"`,
            },
          }}
          width="23%"
        >
          {record.amount}
        </TableCell>
        <TableCell width="29%">{record.category.name}</TableCell>
        <TableCell width="24%">{record.date.slice(2)}</TableCell>
        {mapIsTrashToActionCell.get(isTrash)}
        <TableCell
          id={`${record.date}-${record.category.type.name}-${record.category.name}-${record.amount}-delete-button`}
          onClick={() => {
            // TODO: Replace recordId with id.
            if (record.isTrashed) {
              deleteBudgetRecord({ variables: { recordId: record.id } })
            } else {
              updateBudgetRecord({ variables: { id: record.id, isTrashed: true } })
            }
          }}
          width="12%"
        >
          <DeleteOutlineIcon />
        </TableCell>
      </TableRow>
      {isRecordEditingDialogShown && (
        <RecordFormDialog closeDialog={toggleIsRecordEditingDialogShown} record={record} />
      )}
    </>
  )
}
