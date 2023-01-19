import { Dashboard as DashboardIcon, Home as HomeIcon, Person as PersonIcon } from "@mui/icons-material"

interface ISection {
  icon: React.ReactElement
  id: string
  path: string
}

export const section: ISection[] = [
  { icon: <HomeIcon />, id: "home", path: "/" },
  { icon: <DashboardIcon />, id: "boards", path: "/boards" },
  { icon: <PersonIcon />, id: "auth", path: "/auth" },
]

export const getActiveNavigationIndex = (pathname: string): string | undefined => {
  if (/^\/$/.test(pathname)) return "home"
  if (/^\/boards/.test(pathname)) return "boards"
  if (/^\/auth/.test(pathname)) return "auth"
  return undefined
}
