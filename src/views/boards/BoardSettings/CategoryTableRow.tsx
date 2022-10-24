import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { TableCell, TableRow } from "@mui/material"
import React from "react"
import { useToggle } from "react-use"

import { BudgetCategory } from "#api/types"
import { useDialog } from "#components/useDialog"

import { CategoryDeletionModal } from "./CategoryDeletionModal"
import { CategoryFormModal } from "./CategoryFormModal"

interface ICategoryTableRowProps {
  category: Pick<BudgetCategory, "id" | "name" | "type">
}

export const CategoryTableRow: React.FC<ICategoryTableRowProps> = ({ category }) => {
  const [, openBudgetCategoryFormDialog] = useDialog({ id: "budget-category-form-dialog" })

  const [isCategoryDeletionModalShown, toggleIsCategoryDeletionModalShown] = useToggle(false)

  return (
    <>
      <TableRow>
        <TableCell width="38%">{category.name}</TableCell>
        <TableCell width="38%">{category.type.name}</TableCell>
        <TableCell onClick={openBudgetCategoryFormDialog} width="12%">
          <EditOutlinedIcon id={`${category.name}-${category.type.name}-category-edit-button`} />
        </TableCell>
        <TableCell onClick={toggleIsCategoryDeletionModalShown} width="12%">
          <DeleteOutlineIcon id={`${category.name}-${category.type.name}-category-delete-button`} />
        </TableCell>
      </TableRow>
      <CategoryFormModal category={category} />
      {isCategoryDeletionModalShown && (
        <CategoryDeletionModal category={category} closeModal={toggleIsCategoryDeletionModalShown} />
      )}
    </>
  )
}
