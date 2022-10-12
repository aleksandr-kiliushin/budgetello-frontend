import { IDialogWithSubcomponents, IDialogWithoutSubcomponents } from "../types"
import { DialogBody } from "./DialogBody"
import { DialogFooter } from "./DialogFooter"
import { DialogHeader } from "./DialogHeader"

const _Dialog: IDialogWithSubcomponents | IDialogWithoutSubcomponents = ({ children }) => {
  return <div>{children}</div>
}

_Dialog.Header = DialogHeader
_Dialog.Body = DialogBody
_Dialog.Footer = DialogFooter

const Dialog = _Dialog as IDialogWithSubcomponents

export { Dialog }
