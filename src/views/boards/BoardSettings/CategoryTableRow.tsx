import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { Button, TableCell, TableRow } from "@mui/material"
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
        <TableCell>{category.name}</TableCell>
        <TableCell>{category.type.name}</TableCell>
        <TableCell>
          <Button
            id={`${category.name}-${category.type.name}-category-edit-button`}
            onClick={toggleIsCategoryEditingDialogShown}
            size="small"
            startIcon={<EditOutlinedIcon />}
          />
        </TableCell>
        <TableCell>
          <Button
            color="error"
            id={`${category.name}-${category.type.name}-category-delete-button`}
            onClick={toggleIsCategoryDeletionDialogShown}
            size="small"
            startIcon={<DeleteOutlineIcon />}
          />
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
