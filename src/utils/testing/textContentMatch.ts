// ToDo: Refactor and add types.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const textContentMatcher = (text: string) => (_content, node) => {
  const hasText = (node: Element) => node.textContent === text
  const nodeHasText = hasText(node)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const childrenDontHaveText = Array.from(node?.children || []).every((child) => !hasText(child))
  return nodeHasText && childrenDontHaveText
}

export default textContentMatcher
