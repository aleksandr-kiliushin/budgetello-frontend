import { makeVar, useReactiveVar } from "@apollo/client"
import React from "react"
import { string } from "yup"

import { InnerDialog } from "./InnerDialog"
import { DialogBody } from "./subcomponents/DialogBody"
import { DialogFooter } from "./subcomponents/DialogFooter"
import { DialogHeader } from "./subcomponents/DialogHeader"
import { IOuterDialogWithSubcomponents, IOuterDialogWithoutSubcomponents } from "./types"

const dialogsStateVar = makeVar<Record<string, boolean>>({})

export const useDialog = ({ id, isOpenInitially = false }: { id: string; isOpenInitially?: boolean }) => {
  const dialogsState = useReactiveVar(dialogsStateVar)
  let isDialogOpen = dialogsState[id]
  if (isDialogOpen === undefined) {
    dialogsStateVar({ ...dialogsState, [id]: isOpenInitially })
    isDialogOpen = isOpenInitially
  }

  const openDialog = () => dialogsStateVar({ ...dialogsState, [id]: true })
  const closeDialog = () => dialogsStateVar({ ...dialogsState, [id]: false })

  const OuterDialog: IOuterDialogWithoutSubcomponents = ({ children }) => {
    return (
      <InnerDialog closeModal={closeDialog} isOpen={isDialogOpen}>
        {children}
      </InnerDialog>
    )
  }

  OuterDialog.Body = DialogBody
  OuterDialog.Footer = DialogFooter
  OuterDialog.Header = DialogHeader

  return [OuterDialog as IOuterDialogWithSubcomponents, openDialog, closeDialog] as const
}
