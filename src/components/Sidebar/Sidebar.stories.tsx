import type { Meta, StoryObj } from '@storybook/react-vite';
import Sidebar from './Sidebar';

const meta = { title: 'Dashboard/Sidebar', component: Sidebar, parameters: { layout: 'fullscreen' }, tags: ['autodocs'] } satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { key: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { key: 'analytics', label: 'Analytics', icon: '📈' },
  { key: 'users', label: 'Users', icon: '👥', badge: 3, items: [{ key: 'users-all', label: 'All Users' }, { key: 'users-roles', label: 'Roles' }] },
  { key: 'products', label: 'Products', icon: '📦' },
  { key: 'settings', label: 'Settings', icon: '⚙' },
];

export const Default: Story = {
  args: { items, activeKey: 'dashboard', logo: 'PrepUI' },
  render: (args) => <div style={{ height: '500px', display: 'flex' }}><Sidebar {...args} /></div>,
};
export const Collapsed: Story = {
  args: { items, activeKey: 'analytics', collapsed: true, logo: 'P' },
  render: (args) => <div style={{ height: '500px', display: 'flex' }}><Sidebar {...args} /></div>,
};