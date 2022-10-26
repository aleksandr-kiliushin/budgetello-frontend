import { CloseOutlined } from "@mui/icons-material"
import { Button, Modal as MuiModal, styled } from "@mui/material"

import { getChildByDisplayName } from "#utils/getChildByDisplayName"

import { DialogBody } from "./subcomponents/DialogBody"
import { DialogFooter } from "./subcomponents/DialogFooter"
import { DialogHeader } from "./subcomponents/DialogHeader"
import { IDialogWithSubcomponents, IDialogWithoutSubcomponents } from "./types"

const DialogWindow = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "580px",
  ":focus-visible": {
    outline: "none",
  },
  [theme.breakpoints.down("s")]: {
    height: "100%",
    width: "100%",
  },
}))

const HeaderWithCloseButton = styled("div")({
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "auto min-content",
})

const _Dialog: IDialogWithoutSubcomponents = ({ children, closeDialog }) => {
  const header = getChildByDisplayName({ children, displayName: "DialogHeader" })
  const body = getChildByDisplayName({ children, displayName: "DialogBody" })
  const footer = getChildByDisplayName({ children, displayName: "DialogFooter" })

  return (
    <MuiModal onClose={closeDialog} open>
      <DialogWindow role="dialog">
        <HeaderWithCloseButton>
          {header}
          <Button
            color="secondary"
            id="close-dialog"
            onClick={closeDialog}
            startIcon={<CloseOutlined />}
            variant="contained"
          />
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
