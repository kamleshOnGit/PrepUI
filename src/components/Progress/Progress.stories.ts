import type { Meta, StoryObj } from '@storybook/react-vite';
import Progress from './Progress';

const meta = { title: 'Components/Progress', component: Progress, parameters: { layout: 'padded' }, tags: ['autodocs'] } satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: 60, label: 'Upload progress', showValue: true } };
export const Success: Story = { args: { value: 100, variant: 'success', label: 'Complete', showValue: true } };
export const Warning: Story = { args: { value: 75, variant: 'warning', label: 'Disk usage', showValue: true } };
export const Danger: Story = { args: { value: 90, variant: 'danger', label: 'Memory', showValue: true } };
export const Striped: Story = { args: { value: 55, striped: true, animated: true, label: 'Processing', showValue: true } };
