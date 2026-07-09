import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import PromptInput from './PromptInput';

const meta = {
  title: 'AI/PromptInput',
  component: PromptInput,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof PromptInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Ask anything…' },
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div style={{ maxWidth: 600 }}>
        <PromptInput
          value={value}
          onChange={setValue}
          onSubmit={(v) => { alert(`Submitted: ${v}`); setValue(''); }}
          placeholder="Ask anything…"
        />
      </div>
    );
  },
};

export const WithCharCount: Story = {
  args: { showCount: true, maxLength: 500 },
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div style={{ maxWidth: 600 }}>
        <PromptInput
          value={value}
          onChange={setValue}
          onSubmit={(v) => { setValue(''); console.log(v); }}
          showCount
          maxLength={500}
          placeholder="Type your prompt (max 500 chars)…"
        />
      </div>
    );
  },
};

export const Loading: Story = {
  args: { loading: true },
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <PromptInput value="What is the capital of France?" loading />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <PromptInput value="" disabled placeholder="Input is disabled" />
    </div>
  ),
};

export const WithToolbar: Story = {
  args: {},
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div style={{ maxWidth: 600 }}>
        <PromptInput
          value={value}
          onChange={setValue}
          onSubmit={(v) => { setValue(''); console.log(v); }}
          placeholder="Ask anything…"
          showCount
          toolbar={
            <div style={{ display: 'flex', gap: 4 }}>
              {['📎', '🖼️', '🎤'].map((icon) => (
                <button
                  key={icon}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, padding: '0 2px' }}
                  title={icon}
                >
                  {icon}
                </button>
              ))}
            </div>
          }
        />
      </div>
    );
  },
};

export const MultiLine: Story = {
  args: { minRows: 3, maxRows: 8 },
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div style={{ maxWidth: 600 }}>
        <PromptInput
          value={value}
          onChange={setValue}
          onSubmit={(v) => { setValue(''); console.log(v); }}
          minRows={3}
          maxRows={8}
          placeholder="Write a detailed prompt…"
          showCount
        />
      </div>
    );
  },
};
