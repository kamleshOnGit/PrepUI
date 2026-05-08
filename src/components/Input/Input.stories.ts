import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = { title: 'Components/Input', component: Input, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Email', placeholder: 'you@example.com', fullWidth: true } };
export const WithHint: Story = { args: { label: 'Username', hint: 'Must be at least 3 characters', placeholder: 'johndoe', fullWidth: true } };
export const WithError: Story = { args: { label: 'Password', error: 'Password is too short', type: 'password', fullWidth: true } };
export const Small: Story = { args: { size: 'sm', placeholder: 'Small input' } };
export const Large: Story = { args: { size: 'lg', placeholder: 'Large input' } };
