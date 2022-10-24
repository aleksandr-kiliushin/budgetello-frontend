import { Modal as MuiModal, styled } from "@mui/material"

import { getChildByDisplayName } from "#utils/getChildByDisplayName"

import { DialogBody } from "./subcomponents/DialogBody"
import { DialogFooter } from "./subcomponents/DialogFooter"
import { DialogHeader } from "./subcomponents/DialogHeader"
import { IDialogWithSubcomponents, IDialogWithoutSubcomponents } from "./types"

const DialogWindow = styled("div")({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  backgroundColor: "#262626",
  ":focus-visible": {
    outline: "none",
  },
})

const HeaderWithCloseButton = styled("div")({
  display: "grid",
  gridAutoFlow: "column",
})

const _Dialog: IDialogWithoutSubcomponents = ({ children, closeModal }) => {
  const header = getChildByDisplayName({ children, displayName: "DialogHeader" })
  const body = getChildByDisplayName({ children, displayName: "DialogBody" })
  const footer = getChildByDisplayName({ children, displayName: "DialogFooter" })

  return (
    <MuiModal onClose={closeModal} open>
      <DialogWindow role="dialog">
        <HeaderWithCloseButton>
          {header}
          <button onClick={closeModal}>Close</button>
        </HeaderWithCloseButton>
        {body}
        {footer}
      </DialogWindow>
    </MuiModal>
  )
}

_Dialog.Body = DialogBody
_Dialog.Footer = DialogFooter
_Dialog.Header = DialogHeader

const Dialog = _Dialog as IDialogWithSubcomponents

export { Dialog }
