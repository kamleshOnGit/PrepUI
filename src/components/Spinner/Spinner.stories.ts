import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta = { title: 'Components/Spinner', component: Spinner, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { size: 'md', variant: 'primary' } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const Muted: Story = { args: { variant: 'muted', size: 'md' } };
