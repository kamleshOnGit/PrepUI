import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import Tabs from './Tabs';

const meta = { title: 'Components/Tabs', component: Tabs, parameters: { layout: 'padded' }, tags: ['autodocs'] } satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { key: 'overview', label: 'Overview', content: <p>Overview content here.</p> },
  { key: 'analytics', label: 'Analytics', badge: 3, content: <p>Analytics content here.</p> },
  { key: 'settings', label: 'Settings', content: <p>Settings content here.</p> },
  { key: 'disabled', label: 'Disabled', disabled: true, content: null },
];

export const Underline: Story = { args: { items, variant: 'underline', defaultActiveKey: 'overview' } };
export const Pills: Story = { args: { items, variant: 'pills', defaultActiveKey: 'analytics' } };
export const Boxed: Story = { args: { items, variant: 'boxed', defaultActiveKey: 'settings' } };

export const SwitchingTabs: Story = {
  args: { items, variant: 'underline', defaultActiveKey: 'overview' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Overview content here.')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('tab', { name: /Analytics/ }));
    await expect(canvas.getByText('Analytics content here.')).toBeInTheDocument();
    await expect(canvas.queryByText('Overview content here.')).not.toBeInTheDocument();
    await expect(canvas.getByRole('tab', { name: /Disabled/ })).toBeDisabled();
  },
};