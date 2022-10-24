import { Button } from "@mui/material"
import { ComponentMeta, ComponentStory } from "@storybook/react"

// eslint-disable-next-line no-restricted-syntax
export default {
  component: Button,
  title: "Button",
} as ComponentMeta<typeof Button>

const ButtonTemplate: ComponentStory<typeof Button> = (args) => {
  return <Button {...args}>Click me</Button>
}

export const Primary = ButtonTemplate.bind({})
Primary.args = {
  color: "primary",
}

export const Secondary = ButtonTemplate.bind({})
Secondary.args = {
  color: "secondary",
}

export const Error = ButtonTemplate.bind({})
Error.args = {
  color: "error",
}
