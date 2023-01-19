import { Box, styled } from "@mui/material"

import { getChildByDisplayName } from "#utils/getChildByDisplayName"

import { DataLayoutControls } from "./subcomponents/DataLayoutControls"
import { DataLayoutHeading } from "./subcomponents/DataLayoutHeading"
import { DataLayoutTableContainer } from "./subcomponents/DataLayoutTableContainer"
import { IDataLayoutWithSubcomponents, IDataLayoutWithoutSubcomponents } from "./types"

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  columnGap: "12px",
  rowGap: "8px",
})

const _DataLayout: IDataLayoutWithoutSubcomponents = ({ children }) => {
  const table = getChildByDisplayName({ children, displayName: "DataLayoutTableContainer" })
  const controls = getChildByDisplayName({ children, displayName: "DataLayoutControls" })
  const heading = getChildByDisplayName({ children, displayName: "DataLayoutHeading" })

  return (
    <Box sx={{ display: "grid", rowGap: "4px" }}>
      <Header>
        {heading}
        {controls}
      </Header>
      {table}
    </Box>
  )
}

_DataLayout.Controls = DataLayoutControls
_DataLayout.Heading = DataLayoutHeading
_DataLayout.TableContainer = DataLayoutTableContainer

const DataLayout = _DataLayout as IDataLayoutWithSubcomponents

export { DataLayout }
