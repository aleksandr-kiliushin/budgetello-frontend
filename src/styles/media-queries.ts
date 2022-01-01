export const breakpoints = {
  values: {
    lg: 1024,
    md: 768,
    sm: 480,
    xl: 1440,
    xs: 360,
  },
}

export const mediaQuery = {
  below: {
    lg: `@media screen and (max-width: ${breakpoints.values.lg}px)`,
    md: `@media screen and (max-width: ${breakpoints.values.md}px)`,
    sm: `@media screen and (max-width: ${breakpoints.values.sm}px)`,
    xl: `@media screen and (max-width: ${breakpoints.values.xl}px)`,
    xs: `@media screen and (max-width: ${breakpoints.values.xs}px)`,
  },
}
