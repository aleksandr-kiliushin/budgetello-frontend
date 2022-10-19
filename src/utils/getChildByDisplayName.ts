import React from "react"

export const getChildByDisplayName = ({
  children,
  displayName,
}: {
  children: React.ReactNode
  displayName: string
}) => {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((child.type as any).displayName !== displayName) return null
    return child
  })
}
