import BarChartIcon from "@mui/icons-material/BarChart"
import HomeIcon from "@mui/icons-material/Home"
import ListIcon from "@mui/icons-material/List"
import PersonIcon from "@mui/icons-material/Person"
import SettingsIcon from "@mui/icons-material/Settings"

interface ISection {
  icon: React.ReactElement
  id: string
  path: string
}

export const navigationItem: ISection[] = [
  { icon: <HomeIcon />, id: "home", path: "/" },
  { icon: <ListIcon />, id: "records", path: "/records?isTrash=false" },
  { icon: <BarChartIcon />, id: "stats", path: "/stats" },
  { icon: <SettingsIcon />, id: "settings", path: "/settings" },
  { icon: <PersonIcon />, id: "auth", path: "/auth" },
]

export const getActiveNavigationIndex = (pathname: string): string | undefined => {
  if (/^\/$/.test(pathname)) return "home"
  if (/^\/records/.test(pathname)) return "records"
  if (/^\/stats/.test(pathname)) return "stats"
  if (/^\/settings/.test(pathname)) return "settings"
  if (/^\/auth/.test(pathname)) return "auth"
  return undefined
}
