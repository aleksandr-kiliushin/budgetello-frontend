import { Button, Typography } from "@mui/material"
import React from "react"
import { useParams } from "react-router-dom"

import { GetBudgetCategoriesDocument, useDeleteBudgetCategoryMutation } from "#api/budget"
import { BudgetCategory } from "#api/types"
import { Dialog } from "#components/Dialog"

interface ICategoryDeletionDialogProps {
  category: Pick<BudgetCategory, "id" | "name" | "type">
  closeDialog(): void
}

export const CategoryDeletionDialog: React.FC<ICategoryDeletionDialogProps> = ({ category, closeDialog }) => {
  const params = useParams<{ boardId: string }>()
  const [deleteCategory] = useDeleteBudgetCategoryMutation()

  const onDeleteButtonClick = async () => {
    await deleteCategory({
      refetchQueries: [{ query: GetBudgetCategoriesDocument, variables: { boardsIds: [Number(params.boardId)] } }],
      variables: { categoryId: category.id },
    })
  }

  return (
    <Dialog closeDialog={closeDialog}>
      <Dialog.Header>
        <Typography variant="h2">Delete category</Typography>
      </Dialog.Header>
      <Dialog.Body>
        <Typography>
          Are you sure you want to delete <b>{category.name}</b> category?
        </Typography>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="secondary" onClick={closeDialog} variant="contained">
          Cancel
        </Button>
        <Button color="error" onClick={onDeleteButtonClick} variant="contained">
          Yes, delete
        </Button>
      </Dialog.Footer>
    </Dialog>
  )
}
