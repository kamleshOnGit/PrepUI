import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta = { title: 'Components/Avatar', component: Avatar, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = { args: { src: 'https://i.pravatar.cc/150?img=3', alt: 'User', size: 'md' } };
export const WithName: Story = { args: { name: 'John Doe', size: 'md' } };
export const Online: Story = { args: { name: 'Alice Smith', size: 'md', status: 'online' } };
export const Large: Story = { args: { name: 'Bob Jones', size: 'xl', status: 'away' } };
export const Small: Story = { args: { name: 'Carol K', size: 'sm' } };
