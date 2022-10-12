import React from "react"

import { ClosedDialog } from "./ClosedDialog"
import { Dialog } from "./Dialog"

export const useDialog = ({ isOpenInitially }: { isOpenInitially: boolean }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(() => isOpenInitially)

  const _Dialog = isDialogOpen ? Dialog : ClosedDialog
  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  return [_Dialog, openDialog, closeDialog] as const
}
