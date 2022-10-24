import type { StorybookConfig } from "@storybook/react/types"

const config: StorybookConfig = {
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react",
  staticDirs: ["../public"],
  stories: ["../src/components/**/*.stories.tsx"],
  typescript: {
    check: true,
  },
}

module.exports = config
