import { css } from '@emotion/react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import RestoreIcon from '@mui/icons-material/Restore'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Fragment, useState } from 'react'

import { IFinanceCategory, IFinanceRecord } from '#interfaces/finance'
import { deleteRecordTc, restoreRecordTc } from '#models/finance'
import { useAppDispatch } from '#utils/hooks'

import RecordFormModal from './RecordFormModal'

const RecordTableRow = ({ categories, isTrash, record }: Props) => {
  const dispatch = useAppDispatch()
  const [isRecordEditingModalShown, setIsRecordEditingModalShown] = useState(false)

  const { amount, date, category } = record

  const mapIsTrashToActionCell = new Map([
    [
      false,
      // eslint-disable-next-line react/jsx-key
      <TableCell onClick={() => setIsRecordEditingModalShown(true)} width="12%">
        <EditOutlinedIcon />
      </TableCell>,
    ],
    [
      true,
      // eslint-disable-next-line react/jsx-key
      <TableCell onClick={() => dispatch(restoreRecordTc({ recordId: record.id }))} width="12%">
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
        <TableCell onClick={() => dispatch(deleteRecordTc(record))} width="12%">
          <DeleteOutlineIcon />
        </TableCell>
      </TableRow>
      {isRecordEditingModalShown ? (
        <RecordFormModal
          categories={categories}
          closeModal={() => setIsRecordEditingModalShown(false)}
          record={record}
        />
      ) : null}
    </Fragment>
  )
}

interface Props {
  categories: IFinanceCategory[]
  isTrash: boolean
  record: IFinanceRecord
}

export default RecordTableRow
