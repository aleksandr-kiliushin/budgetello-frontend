import React from "react"

import { InnerDialog } from "./InnerDialog"
import { DialogBody } from "./subcomponents/DialogBody"
import { DialogFooter } from "./subcomponents/DialogFooter"
import { DialogHeader } from "./subcomponents/DialogHeader"
import { IOuterDialogWithSubcomponents, IOuterDialogWithoutSubcomponents } from "./types"

export const useDialog = ({ isOpenInitially }: { isOpenInitially: boolean }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(() => isOpenInitially)

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  const OuterDialog: IOuterDialogWithoutSubcomponents = ({ children }) => {
    return (
      <InnerDialog closeModal={closeDialog} isOpen={isDialogOpen}>
        {children}
      </InnerDialog>
    )
  }

  OuterDialog.Body = DialogBody
  OuterDialog.Footer = DialogFooter
  OuterDialog.Header = DialogHeader

  return [OuterDialog as IOuterDialogWithSubcomponents, openDialog, closeDialog] as const
}
