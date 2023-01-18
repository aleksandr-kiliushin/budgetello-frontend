import { Button, Typography } from "@mui/material"
import React from "react"
import { Link, useParams } from "react-router-dom"

import { GetBudgetCategoriesDocument, useDeleteBudgetCategoryMutation } from "#api/budget"
import { BudgetCategory } from "#api/types"
import { Dialog } from "#components/Dialog"

interface ICategoryDeletionDialogProps {
  category: Pick<BudgetCategory, "id" | "name" | "type">
}

export const CategoryDeletionDialog: React.FC<ICategoryDeletionDialogProps> = ({ category }) => {
  const params = useParams<{ boardId: string }>()
  const [deleteCategory] = useDeleteBudgetCategoryMutation()

  const onDeleteButtonClick = async () => {
    await deleteCategory({
      refetchQueries: [{ query: GetBudgetCategoriesDocument, variables: { boardsIds: [Number(params.boardId)] } }],
      variables: { categoryId: category.id },
    })
  }

  const closeDialogHref = `/boards/${params.boardId}/settings`

  return (
    <Dialog closeDialogHref={closeDialogHref}>
      <Dialog.Header>
        <Typography variant="h2">Delete category</Typography>
      </Dialog.Header>
      <Dialog.Body>
        <Typography>
          Are you sure you want to delete <b>{category.name}</b> category?
        </Typography>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="secondary" component={Link} to={closeDialogHref} variant="contained">
          Cancel
        </Button>
        <Button color="error" onClick={onDeleteButtonClick} variant="contained">
          Yes, delete
        </Button>
      </Dialog.Footer>
    </Dialog>
  )
}
