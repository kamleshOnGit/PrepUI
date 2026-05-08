import type { Meta, StoryObj } from '@storybook/react';
import Alert from './Alert';

const meta = { title: 'Components/Alert', component: Alert, parameters: { layout: 'padded' }, tags: ['autodocs'] } satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { variant: 'info', title: 'Information', children: 'This is an informational message.' } };
export const Success: Story = { args: { variant: 'success', title: 'Success!', children: 'Your changes have been saved.' } };
export const Warning: Story = { args: { variant: 'warning', title: 'Warning', children: 'Please review before continuing.' } };
export const Danger: Story = { args: { variant: 'danger', title: 'Error', children: 'Something went wrong.' } };
export const Dismissible: Story = { args: { variant: 'info', title: 'Dismiss me', children: 'Click × to close.', onClose: () => {} } };
