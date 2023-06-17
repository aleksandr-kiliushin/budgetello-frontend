import { FC, PropsWithChildren } from "react"

import { DialogBody } from "./subcomponents/DialogBody"
import { DialogFooter } from "./subcomponents/DialogFooter"
import { DialogHeader } from "./subcomponents/DialogHeader"

export type TDialogProps = {
  closeDialog?: () => void
  closeDialogHref?: string
}
type TDialogComponent = FC<PropsWithChildren<TDialogProps>>

export type TDialogWithoutSubcomponents = TDialogComponent & {
  Header?: typeof DialogHeader
  Body?: typeof DialogBody
  Footer?: typeof DialogFooter
}

export type TDialogWithSubcomponents = TDialogComponent & {
  Header: typeof DialogHeader
  Body: typeof DialogBody
  Footer: typeof DialogFooter
}
