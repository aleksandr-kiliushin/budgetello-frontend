import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { FC, Fragment } from "react"
import { useToggle } from "react-use"

import { IFinanceCategory, IFinanceCategoryType } from "#types/finance"

import { CategoryDeletionModal } from "./CategoryDeletionModal"
import { CategoryFormModal } from "./CategoryFormModal"

interface ICategoryTableRowProps {
  category: IFinanceCategory
  categoryTypes: IFinanceCategoryType[]
}

export const CategoryTableRow: FC<ICategoryTableRowProps> = ({ category, categoryTypes }) => {
  const [isCategoryEditingModalShown, toggleIsCategoryEditingModalShown] = useToggle(false)
  const [isCategoryDeletionModalShown, toggleIsCategoryDeletionModalShown] = useToggle(false)

  return (
    <Fragment>
      <TableRow>
        <TableCell width="38%">{category.name}</TableCell>
        <TableCell width="38%">{category.type.name}</TableCell>
        <TableCell onClick={toggleIsCategoryEditingModalShown} width="12%">
          <EditOutlinedIcon data-testid={`${category.name}-${category.type.name}-category-edit-button`} />
        </TableCell>
        <TableCell onClick={toggleIsCategoryDeletionModalShown} width="12%">
          <DeleteOutlineIcon data-testid={`${category.name}-${category.type.name}-category-delete-button`} />
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
        <CategoryDeletionModal category={category} closeModal={toggleIsCategoryDeletionModalShown} />
      )}
    </Fragment>
  )
}
