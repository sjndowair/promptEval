import type { Meta, StoryObj } from "@storybook/react"
import { EvaluationSkeleton } from "@/components/evaluation-skeleton"
import { ThemeProvider } from "@/components/theme-provider"

const meta: Meta<typeof EvaluationSkeleton> = {
  title: "Components/EvaluationSkeleton",
  component: EvaluationSkeleton,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="max-w-3xl mx-auto">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof EvaluationSkeleton>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "프롬프트 평가 결과를 로딩하는 동안 표시되는 스켈레톤 UI입니다. 실제 결과 카드와 동일한 구조로 애니메이션이 적용됩니다.",
      },
    },
  },
}

export const Dark: Story = {
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "다크 모드에서의 스켈레톤 로딩 UI입니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <div className="dark max-w-3xl mx-auto">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}
