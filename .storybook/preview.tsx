import type { Preview } from "@storybook/react"
import "../app/globals.css"
import { ThemeProvider } from "../components/theme-provider"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#0f172a",
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" storageKey="theme-storybook">
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview
