import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { FC } from "react"

import { deleteCategoryTc } from "#models/finances"
import { FinanceCategory } from "#types/finance"
import { useAppDispatch } from "#utils/hooks"

interface Props {
  category: FinanceCategory
  closeModal(): void
}

const CategoryDeletionModal: FC<Props> = ({ category, closeModal }) => {
  const dispatch = useAppDispatch()

  const { id, name } = category

  const submitCategoryDeletion = (): void => {
    dispatch(deleteCategoryTc({ categoryId: id }))
  }

  return (
    <Dialog onClose={closeModal} open>
      <DialogTitle>Delete category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <b>{name}</b> category?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={submitCategoryDeletion}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CategoryDeletionModal
