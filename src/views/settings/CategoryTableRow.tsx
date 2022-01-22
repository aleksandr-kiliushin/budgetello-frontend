import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { FC, Fragment } from 'react'
import { useToggle } from 'react-use'

import { FinanceCategory, FinanceCategoryType } from '#types/finance'

import CategoryDeletionModal from './CategoryDeletionModal'
import CategoryFormModal from './CategoryFormModal'

interface Props {
  category: FinanceCategory
  categoryTypes: FinanceCategoryType[]
}

const CategoryTableRow: FC<Props> = ({ category, categoryTypes }) => {
  const [isCategoryEditingModalShown, toggleIsCategoryEditingModalShown] = useToggle(false)
  const [isCategoryDeletionModalShown, toggleIsCategoryDeletionModalShown] = useToggle(false)

  const { name, type } = category

  return (
    <Fragment>
      <TableRow>
        <TableCell width="38%">{name}</TableCell>
        <TableCell width="38%">{type.name}</TableCell>
        <TableCell onClick={toggleIsCategoryEditingModalShown} width="12%">
          <EditOutlinedIcon />
        </TableCell>
        <TableCell onClick={toggleIsCategoryDeletionModalShown} width="12%">
          <DeleteOutlineIcon />
        </TableCell>
      </TableRow>
      {isCategoryEditingModalShown && (
        <CategoryFormModal
          category={category}
          categoryTypes={categoryTypes}
          closeModal={toggleIsCategoryEditingModalShown}
        />
      )}
      {isCategoryDeletionModalShown && (
        <CategoryDeletionModal
          category={category}
          closeModal={toggleIsCategoryDeletionModalShown}
        />
      )}
    </Fragment>
  )
}

export default CategoryTableRow
