import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { IFinanceCategory } from '#interfaces/finance'
import { deleteCategoryTc } from '#models/finance'
import { useAppDispatch } from '#utils/hooks'

const CategoryDeletionModal = ({ category, closeModal }: Props) => {
  const dispatch = useAppDispatch()

  const { id, name } = category

  const submitCategoryDeletion = () => {
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

interface Props {
  category: IFinanceCategory
  closeModal: () => void
}

export default CategoryDeletionModal
