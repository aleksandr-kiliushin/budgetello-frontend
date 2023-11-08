import {
  DeleteOutlined as DeleteOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  Restore as RestoreIcon,
} from "@mui/icons-material"
import { Button, TableCell, TableRow } from "@mui/material"
import { format as formatDate, parse as parseDate } from "date-fns"
import { FC } from "react"
import { Link, useLocation, useParams } from "react-router-dom"

import { useDeleteBudgetRecordMutation, useUpdateBudgetRecordMutation } from "#api/budget/index.generated"
import { Board, BudgetCategory, BudgetRecord, Currency, User } from "#api/types.generated"
import { theme } from "#styles/theme"

import { RecordFormDialog } from "./RecordFormDialog"

const amountSignByCategoryTypeId = new Map([
  [1, "-"],
  [2, "+"],
])

const amountColorByBudgetCategoryType = new Map([
  [1, theme.palette.error.main],
  [2, theme.palette.success.main],
])

type TRecordTableRowProps = {
  isTrash: boolean
  record: {
    author: Pick<User, "id" | "username">
    amount: BudgetRecord["amount"]
    category: {
      board: Pick<Board, "id" | "name">
      id: BudgetCategory["id"]
      name: BudgetCategory["name"]
      type: BudgetCategory["type"]
    }
    comment: BudgetRecord["comment"]
    currency: Currency
    date: BudgetRecord["date"]
    id: BudgetRecord["id"]
    isTrashed: BudgetRecord["isTrashed"]
  }
}

export const RecordTableRow: FC<TRecordTableRowProps> = ({ isTrash, record }) => {
  const location = useLocation()
  const params = useParams<{ boardId: string; recordId: string }>()

  const [deleteBudgetRecord] = useDeleteBudgetRecordMutation({
    update: (cache) => cache.modify({ fields: { budgetRecords() {} } }),
  })
  const [updateBudgetRecord] = useUpdateBudgetRecordMutation({
    update: (cache) => cache.modify({ fields: { budgetRecords() {} } }),
  })

  const actionCellByIsTrash = new Map([
    [
      false,
      // eslint-disable-next-line react/jsx-key
      <TableCell>
        <Button
          aria-label={`Edit record of ${record.category.name} (${record.category.type.name}) category, of amount ${record.amount}, dated ${record.date}`}
          component={Link}
          role="button"
          size="small"
          startIcon={<EditOutlinedIcon />}
          to={`/boards/${params.boardId}/records/edit/${record.id}${location.search}`}
        />
      </TableCell>,
    ],
    [
      true,
      // eslint-disable-next-line react/jsx-key
      <TableCell>
        <Button
          aria-label={`Restore record of ${record.category.name} (${record.category.type.name}) category, of amount ${record.amount}, dated ${record.date}`}
          color="success"
          onClick={() => updateBudgetRecord({ variables: { id: record.id, isTrashed: false } })}
          size="small"
          startIcon={<RestoreIcon />}
        />
      </TableCell>,
    ],
  ])

  const parsedDate = parseDate(record.date, "yyyy-MM-dd", new Date())
  const prettifiedDate = formatDate(parsedDate, "dd MMM yy")

  return (
    <>
      <TableRow>
        <TableCell
          sx={{
            color: amountColorByBudgetCategoryType.get(record.category.type.id),
            "&::before": {
              content: `"${amountSignByCategoryTypeId.get(record.category.type.id)}${record.currency.symbol} "`,
            },
          }}
        >
          {record.amount}
        </TableCell>
        <TableCell>{record.category.name}</TableCell>
        <TableCell>{prettifiedDate}</TableCell>
        {actionCellByIsTrash.get(isTrash)}
        <TableCell>
          <Button
            aria-label={`Delete record of ${record.category.name} (${record.category.type.name}) category, of amount ${record.amount}, dated ${record.date}`}
            color="error"
            onClick={() => {
              // TODO: Replace recordId with id.
              if (record.isTrashed) {
                deleteBudgetRecord({ variables: { recordId: record.id } })
              } else {
                updateBudgetRecord({ variables: { id: record.id, isTrashed: true } })
              }
            }}
            size="small"
            startIcon={<DeleteOutlinedIcon />}
          />
        </TableCell>
      </TableRow>
      {location.pathname.endsWith(`/edit/${record.id}`) && <RecordFormDialog record={record} />}
    </>
  )
}
