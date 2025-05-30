import type { Meta, StoryObj } from "@storybook/react"
import { ProgressBar } from "@/components/progress-bar"
import { ThemeProvider } from "@/components/theme-provider"

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "진행률 값 (0-100)",
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-4 max-w-md">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: {
    value: 50,
  },
}

export const Low: Story = {
  args: {
    value: 20,
  },
}

export const High: Story = {
  args: {
    value: 80,
  },
}

export const Complete: Story = {
  args: {
    value: 100,
  },
}
