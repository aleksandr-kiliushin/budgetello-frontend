import { FC, PropsWithChildren } from "react"

import { DataLayoutControls } from "./subcomponents/DataLayoutControls"
import { DataLayoutHeading } from "./subcomponents/DataLayoutHeading"
import { DataLayoutTable } from "./subcomponents/DataLayoutTable"

export interface IDataLayoutProps {}
type IDataLayoutComponent = FC<PropsWithChildren<IDataLayoutProps>>

export interface IDataLayoutWithoutSubcomponents extends IDataLayoutComponent {
  Controls?: typeof DataLayoutControls
  Heading?: typeof DataLayoutHeading
  Table?: typeof DataLayoutTable
}

export interface IDataLayoutWithSubcomponents extends IDataLayoutComponent {
  Controls: typeof DataLayoutControls
  Heading: typeof DataLayoutHeading
  Table: typeof DataLayoutTable
}
