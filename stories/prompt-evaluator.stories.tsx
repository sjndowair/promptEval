import type { Meta, StoryObj } from '@storybook/react';
import PromptEvaluator from '@/components/prompt-evaluator';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// TanStack Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const meta: Meta<typeof PromptEvaluator> = {
  title: 'Components/PromptEvaluator',
  component: PromptEvaluator,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <div className="mx-auto max-w-3xl">
            <Story />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PromptEvaluator>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '프롬프트 평가 폼입니다. 사용자가 프롬프트를 입력하고 평가 버튼을 클릭하면 평가 결과가 표시됩니다.',
      },
    },
  },
};
