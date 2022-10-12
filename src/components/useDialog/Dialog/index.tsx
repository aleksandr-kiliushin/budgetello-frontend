import { getChildByDisplayName } from "#utils/getChildByDisplayName"

import { IDialogWithSubcomponents, IDialogWithoutSubcomponents } from "../types"
import { DialogBody } from "./DialogBody"
import { DialogFooter } from "./DialogFooter"
import { DialogHeader } from "./DialogHeader"

const _Dialog: IDialogWithSubcomponents | IDialogWithoutSubcomponents = ({ children }) => {
  const header = getChildByDisplayName({ children, displayName: "DialogHeader" })
  const body = getChildByDisplayName({ children, displayName: "DialogBody" })
  const footer = getChildByDisplayName({ children, displayName: "DialogFooter" })
  return (
    <div>
      {header}
      {body}
      {footer}
    </div>
  )
}

_Dialog.Header = DialogHeader
_Dialog.Body = DialogBody
_Dialog.Footer = DialogFooter

const Dialog = _Dialog as IDialogWithSubcomponents

export { Dialog }
