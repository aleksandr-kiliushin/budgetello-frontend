import { FC, PropsWithChildren } from "react"

import { DataLayoutControls } from "./subcomponents/DataLayoutControls"
import { DataLayoutHeading } from "./subcomponents/DataLayoutHeading"
import { DataLayoutTableContainer } from "./subcomponents/DataLayoutTableContainer"

export interface IDataLayoutProps {}
type IDataLayoutComponent = FC<PropsWithChildren<IDataLayoutProps>>

export interface IDataLayoutWithoutSubcomponents extends IDataLayoutComponent {
  Controls?: typeof DataLayoutControls
  Heading?: typeof DataLayoutHeading
  TableContainer?: typeof DataLayoutTableContainer
}

export interface IDataLayoutWithSubcomponents extends IDataLayoutComponent {
  Controls: typeof DataLayoutControls
  Heading: typeof DataLayoutHeading
  TableContainer: typeof DataLayoutTableContainer
}
