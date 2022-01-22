import { css } from '@emotion/react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import RestoreIcon from '@mui/icons-material/Restore'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { FC, Fragment } from 'react'
import { useToggle } from 'react-use'

import { deleteRecordTc, restoreRecordTc } from '#models/finance'
import { FinanceCategory, FinanceRecord } from '#types/finance'
import { useAppDispatch } from '#utils/hooks'

import RecordFormModal from './RecordFormModal'

const RecordTableRow: FC<Props> = ({ categories, isTrash, record }) => {
  const dispatch = useAppDispatch()
  const [isRecordEditingModalShown, toggleIsRecordEditingModalShown] = useToggle(false)

  const { amount, date, category } = record

  const restoreRecord = (): void => {
    dispatch(restoreRecordTc({ recordId: record.id }))
  }
  const deleteRecord = (): void => {
    dispatch(deleteRecordTc(record))
  }

  const mapIsTrashToActionCell = new Map([
    [
      false,
      // eslint-disable-next-line react/jsx-key
      <TableCell onClick={toggleIsRecordEditingModalShown} width="12%">
        <EditOutlinedIcon />
      </TableCell>,
    ],
    [
      true,
      // eslint-disable-next-line react/jsx-key
      <TableCell onClick={restoreRecord} width="12%">
        <RestoreIcon />
      </TableCell>,
    ],
  ])
  const mapCategoryTypeIdToColor = new Map([
    [1, 'darkred'],
    [2, 'darkgreen'],
  ])
  const mapCategoryTypeIdToPseudoElementContent = new Map([
    [1, '-'],
    [2, '+'],
  ])

  return (
    <Fragment>
      <TableRow>
        <TableCell
          css={css`
            color: ${mapCategoryTypeIdToColor.get(category.type.id)};
            &::before {
              content: '${mapCategoryTypeIdToPseudoElementContent.get(category.type.id)}';
            }
          `}
          width="23%"
        >
          {amount}
        </TableCell>
        <TableCell width="29%">{category.name}</TableCell>
        <TableCell width="24%">{date.slice(2)}</TableCell>
        {mapIsTrashToActionCell.get(isTrash)}
        <TableCell onClick={deleteRecord} width="12%">
          <DeleteOutlineIcon />
        </TableCell>
      </TableRow>
      {isRecordEditingModalShown ? (
        <RecordFormModal
          categories={categories}
          closeModal={toggleIsRecordEditingModalShown}
          record={record}
        />
      ) : null}
    </Fragment>
  )
}

interface Props {
  categories: FinanceCategory[]
  isTrash: boolean
  record: FinanceRecord
}

export default RecordTableRow
