import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import React from "react"
import { Link, useLocation } from "react-router-dom"

import { getActiveNavigationIndex, section } from "./helpers"
import { bottomNavigationActionSx, bottomNavigationSx } from "./styles"

export const Navbar: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <BottomNavigation sx={bottomNavigationSx} value={getActiveNavigationIndex(pathname)}>
      {section.map((section) => (
        <BottomNavigationAction
          component={Link}
          icon={section.icon}
          key={section.id}
          sx={bottomNavigationActionSx}
          to={section.path}
          value={section.id}
        />
      ))}
    </BottomNavigation>
  )
}
