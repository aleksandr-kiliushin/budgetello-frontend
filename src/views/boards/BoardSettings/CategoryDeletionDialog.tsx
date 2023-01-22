import { Button, Typography } from "@mui/material"
import React, { FC } from "react"
import { Link, useParams } from "react-router-dom"

import { GetBudgetCategoriesDocument, useDeleteBudgetCategoryMutation, useGetBudgetCategoryQuery } from "#api/budget"
import { Dialog } from "#components/Dialog"

export const CategoryDeletionDialog: FC = () => {
  const params = useParams<{ boardId: string; budgetCategoryId?: string }>()

  const getBudgetCategoryResult = useGetBudgetCategoryQuery({
    variables: { id: Number(params.budgetCategoryId) },
  })
  const budgetCategory = getBudgetCategoryResult.data?.budgetCategory

  const [deleteCategory] = useDeleteBudgetCategoryMutation()

  const onDeleteButtonClick = async () => {
    if (budgetCategory === undefined) return

    await deleteCategory({
      refetchQueries: [
        {
          query: GetBudgetCategoriesDocument,
          variables: {
            boardsIds: [Number(params.boardId)],
            orderingById: "DESC",
          },
        },
      ],
      variables: { categoryId: budgetCategory.id },
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
          Are you sure you want to delete the <b>{budgetCategory?.name}</b> category?
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
