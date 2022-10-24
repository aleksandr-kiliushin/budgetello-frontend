import { AddReactionOutlined as AddReactionOutlinedIcon } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
import { ComponentMeta, ComponentStory } from "@storybook/react"

// eslint-disable-next-line no-restricted-syntax
export default {
  component: Button,
  title: "Button",
} as ComponentMeta<typeof Button>

const ButtonTemplate: ComponentStory<typeof Button> = (args) => {
  return <Button {...args}>Click me</Button>
}

export const ButtonPrimary = ButtonTemplate.bind({})
ButtonPrimary.args = {
  color: "primary",
}

export const ButtonSecondary = ButtonTemplate.bind({})
ButtonSecondary.args = {
  color: "secondary",
}

export const ButtonError = ButtonTemplate.bind({})
ButtonError.args = {
  color: "error",
}

const IconButtonTemplate: ComponentStory<typeof Button> = (args) => {
  return (
    <IconButton {...args}>
      <AddReactionOutlinedIcon />
    </IconButton>
  )
}

export const IconButtonPrimary = IconButtonTemplate.bind({})
IconButtonPrimary.args = {
  color: "primary",
}

export const IconButtonSecondary = IconButtonTemplate.bind({})
IconButtonSecondary.args = {
  color: "secondary",
}

export const IconButtonError = IconButtonTemplate.bind({})
IconButtonError.args = {
  color: "error",
}
