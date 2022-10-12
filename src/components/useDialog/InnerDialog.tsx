import { Modal as MuiModal } from "@mui/material"
import React from "react"

import { getChildByDisplayName } from "#utils/getChildByDisplayName"

interface IInnerDialogProps {
  closeModal(): void
  isOpen: boolean
}
type IInnerDialog = React.FC<React.PropsWithChildren<IInnerDialogProps>>

export const InnerDialog: IInnerDialog = ({ children, closeModal, isOpen }) => {
  const header = getChildByDisplayName({ children, displayName: "DialogHeader" })
  const body = getChildByDisplayName({ children, displayName: "DialogBody" })
  const footer = getChildByDisplayName({ children, displayName: "DialogFooter" })

  return (
    <MuiModal onClose={closeModal} open={isOpen}>
      <React.Fragment>
        {header}
        {body}
        {footer}
      </React.Fragment>
    </MuiModal>
  )
}
