import type { Meta, StoryObj } from '@storybook/react-vite';
import Checkbox from './Checkbox';

const meta = { title: 'Components/Checkbox', component: Checkbox, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Accept terms and conditions' } };
export const WithDescription: Story = { args: { label: 'Marketing emails', description: 'Receive emails about new products and features.' } };
export const Checked: Story = { args: { label: 'Checked', defaultChecked: true } };
export const Disabled: Story = { args: { label: 'Disabled', disabled: true } };
