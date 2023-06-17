import { Breadcrumbs } from "@mui/material"
import { FC, ReactNode, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"

import { useGetBoardQuery } from "#api/boards"

type TBreadcrumb = {
  element: ReactNode
  hrefTemplate: string
}

const useBoardId = () => {
  const location = useLocation()

  const boardId = useMemo(() => {
    const parsingResults = location.pathname.match(/\d+/g)
    if (parsingResults === null) return 0
    return parseInt(parsingResults[0])
  }, [location.pathname])

  return boardId
}

const BoardName: FC = () => {
  const boardId = useBoardId()
  const getBoardResult = useGetBoardQuery({ variables: { id: boardId } })

  return <>{getBoardResult.data?.board.name}</>
}

const breadcrumbsByPathnamePatterns: { pathnamePatterns: RegExp[]; breadcrumbs: TBreadcrumb[] }[] = [
  {
    pathnamePatterns: [/^\/boards$/, /^\/boards\/create$/],
    breadcrumbs: [{ element: "Boards", hrefTemplate: "/boards" }],
  },
  {
    pathnamePatterns: [
      /^\/boards\/\d+\/records$/,
      /^\/boards\/\d+\/records\/add$/,
      /^\/boards\/\d+\/records\/edit\/\d+$/,
    ],
    breadcrumbs: [
      { element: "Boards", hrefTemplate: "/boards" },
      { element: <BoardName />, hrefTemplate: "/boards/$boardId/records" },
    ],
  },
  {
    pathnamePatterns: [
      /^\/boards\/\d+\/settings$/,
      /^\/boards\/\d+\/settings\/add-budget-category$/,
      /^\/boards\/\d+\/settings\/delete-budget-category\/\d+$/,
      /^\/boards\/\d+\/settings\/edit-budget-category\/\d+$/,
    ],
    breadcrumbs: [
      { element: "Boards", hrefTemplate: "/boards" },
      { element: <BoardName />, hrefTemplate: "/boards/$boardId/records" },
      { element: "Settings", hrefTemplate: "/boards/$boardId/settings" },
    ],
  },
  {
    pathnamePatterns: [/^\/boards\/\d+\/statistics$/],
    breadcrumbs: [
      { element: "Boards", hrefTemplate: "/boards" },
      { element: <BoardName />, hrefTemplate: "/boards/$boardId/records" },
      { element: "Statistics", hrefTemplate: "/boards/$boardId/statistics" },
    ],
  },
]

export const BreadcrumbsPanel: FC = () => {
  const location = useLocation()
  const boardId = useBoardId()

  const breadcrumbs = useMemo<TBreadcrumb[] | undefined>(() => {
    for (const group of breadcrumbsByPathnamePatterns) {
      const doesPathnameMatchGroupPathnamePatterns = group.pathnamePatterns.some((pathnamePattern) => {
        return pathnamePattern.test(location.pathname)
      })
      if (doesPathnameMatchGroupPathnamePatterns) return group.breadcrumbs
    }
    return undefined
  }, [location.pathname])

  if (breadcrumbs === undefined) return null
  const lastBreadcrumbIndex = breadcrumbs.length - 1

  return (
    <Breadcrumbs sx={{ marginBottom: "8px" }}>
      {breadcrumbs.map((breadcrumb, breadcrumbIndex) => (
        <Link
          css={{ fontWeight: breadcrumbIndex === lastBreadcrumbIndex ? "bold" : "normal" }}
          key={breadcrumb.hrefTemplate}
          to={breadcrumb.hrefTemplate.replace("$boardId", String(boardId))}
        >
          {breadcrumb.element}
        </Link>
      ))}
    </Breadcrumbs>
  )
}
