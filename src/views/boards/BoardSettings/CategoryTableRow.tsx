import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { TableCell, TableRow } from "@mui/material"
import React from "react"
import { useToggle } from "react-use"

import { BudgetCategory } from "#api/types"

import { CategoryDeletionDialog } from "./CategoryDeletionDialog"
import { CategoryFormDialog } from "./CategoryFormDialog"

interface ICategoryTableRowProps {
  category: Pick<BudgetCategory, "id" | "name" | "type">
}

export const CategoryTableRow: React.FC<ICategoryTableRowProps> = ({ category }) => {
  const [isCategoryEditingDialogShown, toggleIsCategoryEditingDialogShown] = useToggle(false)
  const [isCategoryDeletionDialogShown, toggleIsCategoryDeletionDialogShown] = useToggle(false)

  return (
    <>
      <TableRow>
        <TableCell width="38%">{category.name}</TableCell>
        <TableCell width="38%">{category.type.name}</TableCell>
        <TableCell onClick={toggleIsCategoryEditingDialogShown} width="12%">
          <EditOutlinedIcon id={`${category.name}-${category.type.name}-category-edit-button`} />
        </TableCell>
        <TableCell onClick={toggleIsCategoryDeletionDialogShown} width="12%">
          <DeleteOutlineIcon id={`${category.name}-${category.type.name}-category-delete-button`} />
        </TableCell>
      </TableRow>
      {isCategoryEditingDialogShown && (
        <CategoryFormDialog category={category} closeDialog={toggleIsCategoryEditingDialogShown} />
      )}
      {isCategoryDeletionDialogShown && (
        <CategoryDeletionDialog category={category} closeDialog={toggleIsCategoryDeletionDialogShown} />
      )}
    </>
  )
}
