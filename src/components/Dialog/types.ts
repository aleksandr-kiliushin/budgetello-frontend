import { FC, PropsWithChildren } from "react"

import { DialogBody } from "./subcomponents/DialogBody"
import { DialogFooter } from "./subcomponents/DialogFooter"
import { DialogHeader } from "./subcomponents/DialogHeader"

export interface IDialogProps {
  closeDialog?: () => void
  closeDialogHref?: string
}
type IDialogComponent = FC<PropsWithChildren<IDialogProps>>

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
