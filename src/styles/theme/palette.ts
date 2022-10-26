import createPalette from "@mui/material/styles/createPalette"

export const palette = createPalette({
  mode: localStorage.colorMode ?? "light",
})
