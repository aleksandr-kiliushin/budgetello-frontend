import { Button } from "@mui/material"
import React from "react"
import { useParams } from "react-router-dom"

import { GetBudgetCategoriesDocument, useDeleteBudgetCategoryMutation } from "#api/budget"
import { BudgetCategory } from "#api/types"
import { Dialog } from "#components/Dialog"

import { IBoardsRouteParams } from "../types"

interface ICategoryDeletionDialogProps {
  category: Pick<BudgetCategory, "id" | "name" | "type">
  closeDialog(): void
}

export const CategoryDeletionDialog: React.FC<ICategoryDeletionDialogProps> = ({ category, closeDialog }) => {
  const params = useParams<IBoardsRouteParams>()
  const [deleteCategory] = useDeleteBudgetCategoryMutation()

  const onDeleteButtonClick = async () => {
    await deleteCategory({
      refetchQueries: [{ query: GetBudgetCategoriesDocument, variables: { boardsIds: [Number(params.boardId)] } }],
      variables: { categoryId: category.id },
    })
  }

  return (
    <Dialog closeDialog={closeDialog}>
      <Dialog.Header>Delete category</Dialog.Header>
      <Dialog.Body>
        Are you sure you want to delete <b>{category.name}</b> category?
      </Dialog.Body>
      <Dialog.Footer>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={onDeleteButtonClick}>Yes, delete</Button>
      </Dialog.Footer>
    </Dialog>
  )
}
