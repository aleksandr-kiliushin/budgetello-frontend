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

export const ButtonPrimarySmallContained = ButtonTemplate.bind({})
ButtonPrimarySmallContained.args = {
  color: "primary",
  size: "small",
  variant: "contained",
}

export const ButtonSecondaryMediumContained = ButtonTemplate.bind({})
ButtonSecondaryMediumContained.args = {
  color: "secondary",
  size: "medium",
  variant: "outlined",
}

export const ButtonErrorMediumText = ButtonTemplate.bind({})
ButtonErrorMediumText.args = {
  color: "error",
  size: "medium",
  variant: "text",
}

const IconButtonTemplate: ComponentStory<typeof Button> = (args) => {
  return (
    <IconButton {...args}>
      <AddReactionOutlinedIcon />
    </IconButton>
  )
}

export const IconButtonPrimarySmallContained = IconButtonTemplate.bind({})
IconButtonPrimarySmallContained.args = {
  color: "primary",
  size: "small",
  variant: "contained",
}

export const IconButtonSecondaryMediumOutlined = IconButtonTemplate.bind({})
IconButtonSecondaryMediumOutlined.args = {
  color: "secondary",
  size: "medium",
  variant: "outlined",
}

export const IconButtonErrorMediumText = IconButtonTemplate.bind({})
IconButtonErrorMediumText.args = {
  color: "error",
  size: "medium",
  variant: "text",
}
