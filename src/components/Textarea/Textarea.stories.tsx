import type { Meta, StoryObj } from '@storybook/react-vite';
import Textarea from './Textarea';

const meta = { title: 'Components/Textarea', component: Textarea, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Message', placeholder: 'Write your message…', fullWidth: true } };
export const WithHelperText: Story = { args: { label: 'Bio', helperText: 'Tell us a bit about yourself', placeholder: 'I am…', fullWidth: true } };
export const WithError: Story = { args: { label: 'Feedback', error: 'Feedback is required', fullWidth: true } };
export const WithCount: Story = { args: { label: 'Tweet', showCount: true, maxLength: 200, placeholder: "What's happening?", fullWidth: true } };
export const AutoResize: Story = { args: { label: 'Notes', autoResize: true, placeholder: 'This textarea grows as you type…', fullWidth: true } };
export const Small: Story = { args: { size: 'sm', placeholder: 'Small textarea' } };
export const Large: Story = { args: { size: 'lg', placeholder: 'Large textarea' } };
export const Disabled: Story = { args: { label: 'Locked', disabled: true, defaultValue: 'You cannot edit this', fullWidth: true } };
