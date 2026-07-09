import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger', 'ghost', 'outline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { children: 'Primary Button', variant: 'primary' } };
export const Secondary: Story = { args: { children: 'Secondary Button', variant: 'secondary' } };
export const Danger: Story = { args: { children: 'Danger', variant: 'danger' } };
export const Ghost: Story = { args: { children: 'Ghost', variant: 'ghost' } };
export const Outline: Story = { args: { children: 'Outline', variant: 'outline' } };
export const Loading: Story = { args: { children: 'Loading', loading: true } };
export const Large: Story = { args: { children: 'Large', size: 'lg' } };
export const Small: Story = { args: { children: 'Small', size: 'sm' } };

export const ClickInteraction: Story = {
  args: { children: 'Click me', onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Click me' }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const LoadingBlocksClicks: Story = {
  args: { children: 'Saving', loading: true, onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
