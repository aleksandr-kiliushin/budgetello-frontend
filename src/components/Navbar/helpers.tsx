import { Dashboard as DashboardIcon, Person as PersonIcon } from "@mui/icons-material"

type TSection = {
  icon: React.ReactElement
  id: string
  path: string
}

export const section: TSection[] = [
  { icon: <DashboardIcon />, id: "boards", path: "/boards" },
  { icon: <PersonIcon />, id: "auth", path: "/auth" },
]

export const getActiveNavigationIndex = (pathname: string): string | undefined => {
  if (pathname.startsWith("/boards")) return "boards"
  if (pathname.startsWith("/auth")) return "auth"
  return undefined
}
