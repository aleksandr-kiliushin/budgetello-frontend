import React, { PropsWithChildren } from "react"

interface IDialogProps {}

const OpenDialog: React.FC<PropsWithChildren<IDialogProps>> = ({ children }) => {
  return <>{children}</>
}
const ClosedDialog: React.FC<PropsWithChildren<IDialogProps>> = () => {
  return null
}

type IUseDialog = (params: { isOpenInitially: boolean }) => [typeof OpenDialog, () => void, () => void]

export const useDialog: IUseDialog = ({ isOpenInitially }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(() => isOpenInitially)

  const Dialog = isDialogOpen ? OpenDialog : ClosedDialog
  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  return [Dialog, openDialog, closeDialog]
}
