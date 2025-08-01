import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@/components/ui/skeleton';
import { ThemeProvider } from '@/components/theme-provider';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <div className="space-y-4 p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: 'h-4 w-[250px]',
  },
};

export const Circle: Story = {
  args: {
    className: 'h-12 w-12 rounded-full',
  },
};

export const Card: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
};
