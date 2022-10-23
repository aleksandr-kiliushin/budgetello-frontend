import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import React from "react"
import { useParams } from "react-router-dom"

import { GetBudgetCategoriesDocument, useDeleteBudgetCategoryMutation } from "#api/budget"
import { BudgetCategory } from "#api/types"

import { IBoardsRouteParams } from "../types"

interface ICategoryDeletionModalProps {
  category: Pick<BudgetCategory, "id" | "name" | "type">
  closeModal(): void
}

export const CategoryDeletionModal: React.FC<ICategoryDeletionModalProps> = ({ category, closeModal }) => {
  const params = useParams<IBoardsRouteParams>()
  const [deleteCategory] = useDeleteBudgetCategoryMutation()

  const onDeleteButtonClick = async () => {
    await deleteCategory({
      refetchQueries: [{ query: GetBudgetCategoriesDocument, variables: { boardsIds: [Number(params.boardId)] } }],
      variables: { categoryId: category.id },
    })
  }

  return (
    <Dialog onClose={closeModal} open>
      <DialogTitle>Delete category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <b>{category.name}</b> category?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={onDeleteButtonClick}>Yes, delete</Button>
      </DialogActions>
    </Dialog>
  )
}
