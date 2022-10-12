import { DialogBody } from "./Dialog/DialogBody"
import { DialogFooter } from "./Dialog/DialogFooter"
import { DialogHeader } from "./Dialog/DialogHeader"
import { IDialogWithSubcomponents } from "./types"

const ClosedDialog: IDialogWithSubcomponents = () => null

const ClosedDialogHeader: typeof DialogBody = () => null
const ClosedDialogBody: typeof DialogHeader = () => null
const ClosedDialogFooter: typeof DialogFooter = () => null

ClosedDialog.Header = ClosedDialogHeader
ClosedDialog.Body = ClosedDialogBody
ClosedDialog.Footer = ClosedDialogFooter

export { ClosedDialog }
