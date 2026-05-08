import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta = { title: 'Components/Select', component: Select, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions = [
  { value: '', label: 'Select a country' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'in', label: 'India' },
];

export const Default: Story = { args: { label: 'Country', options: countryOptions, fullWidth: true } };
export const WithError: Story = { args: { label: 'Country', options: countryOptions, error: 'Please select a country', fullWidth: true } };
