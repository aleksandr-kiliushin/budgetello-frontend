import React from "react"

import { DialogBody } from "./subcomponents/DialogBody"
import { DialogFooter } from "./subcomponents/DialogFooter"
import { DialogHeader } from "./subcomponents/DialogHeader"

interface IDialogProps {
  closeModal(): void
}
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
