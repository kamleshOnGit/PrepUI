import type { Meta, StoryObj } from '@storybook/react-vite';
import Skeleton from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['text', 'circular', 'rectangular'] },
    animation: { control: 'select', options: ['pulse', 'wave', 'none'] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = { args: { variant: 'text', width: 240 } };
export const MultipleLines: Story = { args: { variant: 'text', width: 300, lines: 3 } };
export const Circular: Story = { args: { variant: 'circular', width: 48, height: 48 } };
export const Rectangular: Story = { args: { variant: 'rectangular', width: 300, height: 120 } };
export const Wave: Story = { args: { variant: 'rectangular', width: 300, height: 120, animation: 'wave' } };
export const NoAnimation: Story = { args: { variant: 'rectangular', width: 300, height: 120, animation: 'none' } };
export const CardPlaceholder: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', width: 320, alignItems: 'flex-start' }}>
      <Skeleton variant="circular" width={48} height={48} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" lines={3} />
      </div>
    </div>
  ),
};
