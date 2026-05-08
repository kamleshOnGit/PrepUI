import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Modal from './Modal';

const meta = { title: 'Components/Modal', component: Modal, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { open: false, onClose: () => {}, title: 'Modal Title' },
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ padding: '0.5rem 1rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>Open Modal</button>
        <Modal open={open} onClose={() => setOpen(false)} title="Modal Title"
          footer={
            <>
              <button onClick={() => setOpen(false)} style={{ padding: '0.5rem 1rem', background: '#f1f5f9', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setOpen(false)} style={{ padding: '0.5rem 1rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>Confirm</button>
            </>
          }
        >
          <p style={{ margin: 0 }}>This is the modal body content. Press Escape or click outside to close.</p>
        </Modal>
      </>
    );
  },
};
