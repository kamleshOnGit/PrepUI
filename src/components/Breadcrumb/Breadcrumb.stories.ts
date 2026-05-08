import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './Breadcrumb';

const meta = { title: 'Components/Breadcrumb', component: Breadcrumb, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof Breadcrumb>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { items: [{ label: 'Home', href: '/' }, { label: 'Dashboard', href: '/dashboard' }, { label: 'Analytics' }] } };
export const CustomSeparator: Story = { args: { items: [{ label: 'Home', href: '/' }, { label: 'Users', href: '/users' }, { label: 'Profile' }], separator: '>' } };