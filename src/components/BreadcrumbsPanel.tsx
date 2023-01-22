import { Breadcrumbs } from "@mui/material"
import React, { FC, ReactNode, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"

import { useGetBoardQuery } from "#api/boards"

interface IBreadcrumb {
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

const breadcrumbsByPathnamePattern: Map<RegExp[], IBreadcrumb[]> = new Map([
  [[/^\/boards$/, /^\/boards\/create$/], [{ element: "Boards", hrefTemplate: "/boards" }]],
  [
    [/^\/boards\/\d+\/records$/, /^\/boards\/\d+\/records\/add$/, /^\/boards\/\d+\/records\/edit\/\d+$/],
    [
      { element: "Boards", hrefTemplate: "/boards" },
      { element: <BoardName />, hrefTemplate: "/boards/$boardId/records" },
    ],
  ],
  [
    [
      /^\/boards\/\d+\/settings$/,
      /^\/boards\/\d+\/settings\/add-budget-category$/,
      /^\/boards\/\d+\/settings\/delete-budget-category\/\d+$/,
      /^\/boards\/\d+\/settings\/edit-budget-category\/\d+$/,
    ],
    [
      { element: "Boards", hrefTemplate: "/boards" },
      { element: <BoardName />, hrefTemplate: "/boards/$boardId/records" },
      { element: "Settings", hrefTemplate: "/boards/$boardId/settings" },
    ],
  ],
])

export const BreadcrumbsPanel: FC = () => {
  const location = useLocation()

  const boardId = useBoardId()

  let breadcrumbs: IBreadcrumb[] | undefined = undefined
  for (const [pathnamePatterns, _breadcrumbs] of breadcrumbsByPathnamePattern) {
    if (breadcrumbs !== undefined) continue
    if (pathnamePatterns.some((pathnamePattern) => pathnamePattern.test(location.pathname))) {
      breadcrumbs = _breadcrumbs
    }
  }

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
