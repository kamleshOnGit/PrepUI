import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';

const meta = { title: 'Components/Tooltip', component: Tooltip, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;

const btn = (label: string) => (
  <button style={{ padding: '0.5rem 1rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>{label}</button>
);

export const Top: Story = {
  args: { content: 'Tooltip on top', placement: 'top', children: btn('Hover me') },
  render: (args) => <div style={{ padding: '3rem' }}><Tooltip {...args}>{btn('Hover me')}</Tooltip></div>,
};
export const Bottom: Story = {
  args: { content: 'Tooltip on bottom', placement: 'bottom', children: btn('Hover me') },
  render: (args) => <div style={{ padding: '3rem' }}><Tooltip {...args}>{btn('Hover me')}</Tooltip></div>,
};
export const Left: Story = {
  args: { content: 'Tooltip on left', placement: 'left', children: btn('Hover me') },
  render: (args) => <div style={{ padding: '3rem' }}><Tooltip {...args}>{btn('Hover me')}</Tooltip></div>,
};
export const Right: Story = {
  args: { content: 'Tooltip on right', placement: 'right', children: btn('Hover me') },
  render: (args) => <div style={{ padding: '3rem' }}><Tooltip {...args}>{btn('Hover me')}</Tooltip></div>,
};
