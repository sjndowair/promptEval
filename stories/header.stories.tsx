import type { Meta, StoryObj } from "@storybook/react"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {}

export const Scrolled: Story = {
  parameters: {
    docs: {
      description: {
        story: "스크롤 시 헤더의 모습입니다. 배경이 반투명해지고 그림자가 생깁니다.",
      },
    },
  },
  decorators: [
    (Story) => {
      // 스크롤 이벤트 시뮬레이션
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("scroll"))
      }
      return <Story />
    },
  ],
}
