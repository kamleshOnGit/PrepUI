import type { Meta, StoryObj } from '@storybook/react-vite';
import Dropdown from './Dropdown';

const menuItems = [
  { key: 'profile', label: 'Profile', icon: '👤' },
  { key: 'settings', label: 'Settings', icon: '⚙' },
  { key: 'billing', label: 'Billing', icon: '💳' },
  { key: 'div', label: '', divider: true },
  { key: 'logout', label: 'Log out', icon: '🚪', danger: true },
];

const triggerBtn = <button style={{ padding: '0.5rem 1rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>Open Menu ▾</button>;

const meta = { title: 'Components/Dropdown', component: Dropdown, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof Dropdown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { trigger: triggerBtn, items: menuItems },
  render: (args) => <div style={{ padding: '3rem' }}><Dropdown {...args} /></div>,
};
