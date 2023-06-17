import BreakpointOverrides from ""

declare module "@mui/system" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface BreakpointOverrides {
    sm: false
    md: false
    lg: false

    xs: true
    s: true
    m: true
    l: true
    xl: true
  }
}
