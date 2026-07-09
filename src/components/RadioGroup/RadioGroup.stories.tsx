import type { Meta, StoryObj } from '@storybook/react-vite';
import RadioGroup from './RadioGroup';

const options = [
  { value: 'free', label: 'Free', description: 'Basic features for individuals' },
  { value: 'pro', label: 'Pro', description: 'Advanced features for professionals' },
  { value: 'team', label: 'Team', description: 'Collaboration tools for teams' },
];

const meta = { title: 'Components/RadioGroup', component: RadioGroup, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Choose a plan', options, defaultValue: 'free' } };
export const Horizontal: Story = { args: { label: 'Notification frequency', direction: 'horizontal', options: [{ value: 'daily', label: 'Daily' }, { value: 'weekly', label: 'Weekly' }, { value: 'never', label: 'Never' }], defaultValue: 'weekly' } };
export const WithError: Story = { args: { label: 'Choose a plan', options, error: 'Please select a plan' } };
export const WithDisabledOption: Story = { args: { label: 'Choose a plan', options: [...options.slice(0, 2), { value: 'enterprise', label: 'Enterprise', description: 'Contact sales for access', disabled: true }], defaultValue: 'pro' } };
export const AllDisabled: Story = { args: { label: 'Choose a plan', options, defaultValue: 'free', disabled: true } };
