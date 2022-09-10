import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import { FC } from "react"
import { Link, useLocation } from "react-router-dom"

import { getActiveNavigationIndex, navigationItem } from "./helpers"
import { bottomNavigationActionSx, bottomNavigationSx } from "./styles"

const Navbar: FC = () => {
  const { pathname } = useLocation()

  return (
    <BottomNavigation sx={bottomNavigationSx} value={getActiveNavigationIndex(pathname)}>
      {navigationItem.map(({ icon, id, path }) => (
        <BottomNavigationAction
          component={Link}
          icon={icon}
          key={path}
          sx={bottomNavigationActionSx}
          to={path}
          value={id}
        />
      ))}
    </BottomNavigation>
  )
}

export default Navbar
