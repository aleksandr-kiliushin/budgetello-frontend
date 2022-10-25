import { ArrowCircleDownOutlined as ArrowCircleDownOutlinedIcon } from "@mui/icons-material"
import { Button, styled } from "@mui/material"
import { ComponentMeta } from "@storybook/react"
import React from "react"

// eslint-disable-next-line no-restricted-syntax
export default {
  component: Button,
  title: "Button",
} as ComponentMeta<typeof Button>

const Grid = styled("div")({
  display: "grid",
  gridAutoFlow: "column",
  columnGap: "12px",
  border: "2px solid black",
})

const Group = styled("div")({
  display: "grid",
  rowGap: "12px",
})

export const Buttons: React.FC = () => {
  return (
    <Grid>
      <Group>
        <Button color="primary" size="small" variant="contained">
          Click me
        </Button>
        <Button color="primary" size="medium" variant="contained">
          Click me
        </Button>
        <Button color="primary" size="small" variant="outlined">
          Click me
        </Button>
        <Button color="primary" size="medium" variant="outlined">
          Click me
        </Button>
        <Button color="primary" size="small" variant="text">
          Click me
        </Button>
        <Button color="primary" size="medium" variant="text">
          Click me
        </Button>
      </Group>
      <Group>
        <Button color="secondary" size="small" startIcon={<ArrowCircleDownOutlinedIcon />} variant="contained">
          Click me
        </Button>
        <Button color="secondary" size="medium" startIcon={<ArrowCircleDownOutlinedIcon />} variant="contained">
          Click me
        </Button>
        <Button color="secondary" size="small" startIcon={<ArrowCircleDownOutlinedIcon />} variant="outlined">
          Click me
        </Button>
        <Button color="secondary" size="medium" startIcon={<ArrowCircleDownOutlinedIcon />} variant="outlined">
          Click me
        </Button>
        <Button color="secondary" size="small" startIcon={<ArrowCircleDownOutlinedIcon />} variant="text">
          Click me
        </Button>
        <Button color="secondary" size="medium" startIcon={<ArrowCircleDownOutlinedIcon />} variant="text">
          Click me
        </Button>
      </Group>
      <Group>
        <Button color="error" size="small" variant="contained">
          Click me
        </Button>
        <Button color="error" size="medium" variant="contained">
          Click me
        </Button>
        <Button color="error" size="small" variant="outlined">
          Click me
        </Button>
        <Button color="error" size="medium" variant="outlined">
          Click me
        </Button>
        <Button color="error" size="small" variant="text">
          Click me
        </Button>
        <Button color="error" size="medium" variant="text">
          Click me
        </Button>
      </Group>
      <Group>
        <Button color="primary" size="small" startIcon={<ArrowCircleDownOutlinedIcon />} variant="contained" />
        <Button color="primary" size="medium" startIcon={<ArrowCircleDownOutlinedIcon />} variant="contained" />
        <Button color="primary" size="small" startIcon={<ArrowCircleDownOutlinedIcon />} variant="outlined" />
        <Button color="primary" size="medium" startIcon={<ArrowCircleDownOutlinedIcon />} variant="outlined" />
        <Button color="primary" size="small" startIcon={<ArrowCircleDownOutlinedIcon />} variant="text" />
        <Button color="primary" size="medium" startIcon={<ArrowCircleDownOutlinedIcon />} variant="text" />
      </Group>
      <Group>
        <Button color="secondary" size="small" startIcon={<ArrowCircleDownOutlinedIcon />} variant="contained" />
        <Button color="secondary" size="medium" startIcon={<ArrowCircleDownOutlinedIcon />} variant="contained" />
        <Button color="secondary" size="small" startIcon={<ArrowCircleDownOutlinedIcon />} variant="outlined" />
        <Button color="secondary" size="medium" startIcon={<ArrowCircleDownOutlinedIcon />} variant="outlined" />
        <Button color="secondary" size="small" startIcon={<ArrowCircleDownOutlinedIcon />} variant="text" />
        <Button color="secondary" size="medium" startIcon={<ArrowCircleDownOutlinedIcon />} variant="text" />
      </Group>
      <Group>
        <Button color="error" size="small" startIcon={<ArrowCircleDownOutlinedIcon />} variant="contained" />
        <Button color="error" size="medium" startIcon={<ArrowCircleDownOutlinedIcon />} variant="contained" />
        <Button color="error" size="small" startIcon={<ArrowCircleDownOutlinedIcon />} variant="outlined" />
        <Button color="error" size="medium" startIcon={<ArrowCircleDownOutlinedIcon />} variant="outlined" />
        <Button color="error" size="small" startIcon={<ArrowCircleDownOutlinedIcon />} variant="text" />
        <Button color="error" size="medium" startIcon={<ArrowCircleDownOutlinedIcon />} variant="text" />
      </Group>
    </Grid>
  )
}
