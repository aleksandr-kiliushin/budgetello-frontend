import createPalette from "@mui/material/styles/createPalette"

interface IPaletteOptions {
  primary: { main: string }
  secondary: { main: string }
  error: { main: string }
  text: { primary: string }
}

const paletteOptions: IPaletteOptions = {
  primary: {
    main: "#0f62fe",
  },
  secondary: {
    main: "#6f6f6f",
  },
  error: {
    main: "#da1e28",
  },
  text: {
    primary: "#f4f4f4",
  },
}

export const palette = createPalette(paletteOptions)
