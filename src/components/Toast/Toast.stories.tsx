import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import ToastProvider, { useToast, type ToastVariant } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'select', options: ['top-right', 'top-center', 'bottom-right'] },
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const btnStyle: CSSProperties = { padding: '0.5rem 1rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' };

function Demo() {
  const { toast } = useToast();
  const variants: ToastVariant[] = ['info', 'success', 'warning', 'danger'];
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {variants.map((variant) => (
        <button key={variant} style={btnStyle} onClick={() => toast({ title: `${variant[0].toUpperCase()}${variant.slice(1)} toast`, description: `This is a ${variant} notification.`, variant })}>
          {variant}
        </button>
      ))}
    </div>
  );
}

export const Default: Story = {
  args: { children: null },
  render: (args) => (
    <ToastProvider {...args}>
      <Demo />
    </ToastProvider>
  ),
};
export const TopCenter: Story = {
  args: { children: null, position: 'top-center' },
  render: (args) => (
    <ToastProvider {...args}>
      <Demo />
    </ToastProvider>
  ),
};
export const LongDuration: Story = {
  args: { children: null, duration: 10000 },
  render: (args) => (
    <ToastProvider {...args}>
      <Demo />
    </ToastProvider>
  ),
};
