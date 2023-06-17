import { FC, PropsWithChildren } from "react"

import { DataLayoutControls } from "./subcomponents/DataLayoutControls"
import { DataLayoutHeading } from "./subcomponents/DataLayoutHeading"
import { DataLayoutTableContainer } from "./subcomponents/DataLayoutTableContainer"

type TDataLayoutComponent = FC<PropsWithChildren>

export type TDataLayoutWithoutSubcomponents = TDataLayoutComponent & {
  Controls?: typeof DataLayoutControls
  Heading?: typeof DataLayoutHeading
  TableContainer?: typeof DataLayoutTableContainer
}

export type TDataLayoutWithSubcomponents = TDataLayoutComponent & {
  Controls: typeof DataLayoutControls
  Heading: typeof DataLayoutHeading
  TableContainer: typeof DataLayoutTableContainer
}
