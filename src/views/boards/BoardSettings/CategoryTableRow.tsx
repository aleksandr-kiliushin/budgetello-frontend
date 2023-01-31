import { DeleteOutlined as DeleteOutlinedIcon, EditOutlined as EditOutlinedIcon } from "@mui/icons-material"
import { Button, TableCell, TableRow } from "@mui/material"
import { FC } from "react"
import { Link, useLocation, useParams } from "react-router-dom"

import { BudgetCategory } from "#api/types"

import { CategoryDeletionDialog } from "./CategoryDeletionDialog"
import { CategoryFormDialog } from "./CategoryFormDialog"

interface ICategoryTableRowProps {
  category: Pick<BudgetCategory, "id" | "name" | "type">
}

export const CategoryTableRow: FC<ICategoryTableRowProps> = ({ category }) => {
  const params = useParams<{ boardId: string }>()
  const location = useLocation()

  return (
    <>
      <TableRow>
        <TableCell>{category.name}</TableCell>
        <TableCell>{category.type.name}</TableCell>
        <TableCell>
          <Button
            component={Link}
            id={`${category.name}-${category.type.name}-category-edit-button`}
            size="small"
            startIcon={<EditOutlinedIcon />}
            to={`/boards/${params.boardId}/settings/edit-budget-category/${category.id}`}
          />
        </TableCell>
        <TableCell>
          <Button
            color="error"
            component={Link}
            id={`${category.name}-${category.type.name}-category-delete-button`}
            size="small"
            startIcon={<DeleteOutlinedIcon />}
            to={`/boards/${params.boardId}/settings/delete-budget-category/${category.id}`}
          />
        </TableCell>
      </TableRow>
      {location.pathname.endsWith(`/edit-budget-category/${category.id}`) && <CategoryFormDialog category={category} />}
      {location.pathname.endsWith(`/delete-budget-category/${category.id}`) && <CategoryDeletionDialog />}
    </>
  )
}
