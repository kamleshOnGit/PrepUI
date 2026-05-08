import type { Meta, StoryObj } from '@storybook/react';
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