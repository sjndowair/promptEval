import type { Meta, StoryObj } from "@storybook/react"
import { HeroSection } from "@/components/hero-section"
import { ThemeProvider } from "@/components/theme-provider"

const meta: Meta<typeof HeroSection> = {
  title: "Components/HeroSection",
  component: HeroSection,
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
type Story = StoryObj<typeof HeroSection>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "메인 페이지의 히어로 섹션입니다. 서비스 소개와 시작하기 버튼이 포함되어 있습니다.",
      },
    },
  },
}

export const Dark: Story = {
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "다크 모드에서의 히어로 섹션입니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <div className="dark">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}
