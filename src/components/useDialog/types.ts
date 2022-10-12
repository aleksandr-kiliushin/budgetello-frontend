import React from "react"

import { DialogBody } from "./subcomponents/DialogBody"
import { DialogFooter } from "./subcomponents/DialogFooter"
import { DialogHeader } from "./subcomponents/DialogHeader"

interface IOuterDialogProps {}
type IOuterDialogComponent = React.FC<React.PropsWithChildren<IOuterDialogProps>>

export interface IOuterDialogWithoutSubcomponents extends IOuterDialogComponent {
  Header?: typeof DialogHeader
  Body?: typeof DialogBody
  Footer?: typeof DialogFooter
}

export interface IOuterDialogWithSubcomponents extends IOuterDialogComponent {
  Header: typeof DialogHeader
  Body: typeof DialogBody
  Footer: typeof DialogFooter
}
