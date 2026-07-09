import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from './Badge';

const meta = { title: 'Components/Badge', component: Badge, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Default' } };
export const Success: Story = { args: { children: 'Active', variant: 'success' } };
export const Warning: Story = { args: { children: 'Pending', variant: 'warning' } };
export const Danger: Story = { args: { children: 'Offline', variant: 'danger' } };
export const Info: Story = { args: { children: 'New', variant: 'info' } };
export const WithDot: Story = { args: { children: 'Online', variant: 'success', dot: true } };
