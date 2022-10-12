import React from "react"

import { DialogBody } from "./Dialog/DialogBody"
import { DialogFooter } from "./Dialog/DialogFooter"
import { DialogHeader } from "./Dialog/DialogHeader"

interface IDialogProps {}
type IDialogComponent = React.FC<React.PropsWithChildren<IDialogProps>>

export interface IDialogWithoutSubcomponents extends IDialogComponent {
  Header?: typeof DialogHeader
  Body?: typeof DialogBody
  Footer?: typeof DialogFooter
}

export interface IDialogWithSubcomponents extends IDialogComponent {
  Header: typeof DialogHeader
  Body: typeof DialogBody
  Footer: typeof DialogFooter
}
