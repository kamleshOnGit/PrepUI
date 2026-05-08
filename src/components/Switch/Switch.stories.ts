import type { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';

const meta = { title: 'Components/Switch', component: Switch, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Enable notifications' } };
export const WithDescription: Story = { args: { label: 'Dark mode', description: 'Use dark theme across the app' } };
export const Checked: Story = { args: { label: 'Active', defaultChecked: true } };
export const Small: Story = { args: { label: 'Small', size: 'sm' } };
export const Large: Story = { args: { label: 'Large', size: 'lg' } };
