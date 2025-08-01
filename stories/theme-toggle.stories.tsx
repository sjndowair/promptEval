import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from '@/components/theme-toggle';
import { ThemeProvider } from '@/components/theme-provider';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    Story => (
      <ThemeProvider>
        <div className="flex justify-center p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '테마 토글 버튼입니다. 클릭하면 드롭다운 메뉴가 표시됩니다.',
      },
    },
  },
};
