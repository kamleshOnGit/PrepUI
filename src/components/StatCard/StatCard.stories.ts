import type { Meta, StoryObj } from '@storybook/react-vite';
import StatCard from './StatCard';

const meta = { title: 'Dashboard/StatCard', component: StatCard, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof StatCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Revenue: Story = { args: { title: 'Total Revenue', value: '$48,295', trend: 'up', trendValue: '12.5%', subtitle: 'vs last month', icon: '💰' } };
export const Users: Story = { args: { title: 'Active Users', value: '3,842', trend: 'up', trendValue: '8.1%', subtitle: 'vs last week', icon: '👤' } };
export const Orders: Story = { args: { title: 'Orders', value: '1,204', trend: 'down', trendValue: '3.2%', subtitle: 'vs yesterday', icon: '📦' } };
export const Neutral: Story = { args: { title: 'Bounce Rate', value: '42.3%', trend: 'neutral', trendValue: '0%', subtitle: 'No change', icon: '📊' } };