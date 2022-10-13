import { Modal as MuiModal, styled } from "@mui/material"
import React from "react"

import { getChildByDisplayName } from "#utils/getChildByDisplayName"

const DialogWindow = styled("div")({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  backgroundColor: "white",
})

interface IInnerDialogProps {
  closeModal(): void
  isOpen: boolean
}
export const InnerDialog: React.FC<React.PropsWithChildren<IInnerDialogProps>> = ({ children, closeModal, isOpen }) => {
  const header = getChildByDisplayName({ children, displayName: "DialogHeader" })
  const body = getChildByDisplayName({ children, displayName: "DialogBody" })
  const footer = getChildByDisplayName({ children, displayName: "DialogFooter" })

  return (
    <MuiModal onClose={closeModal} open={isOpen}>
      <DialogWindow role="dialog">
        {header}
        {body}
        {footer}
      </DialogWindow>
    </MuiModal>
  )
}
