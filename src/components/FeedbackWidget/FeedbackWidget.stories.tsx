import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import FeedbackWidget from './FeedbackWidget';

const meta = {
  title: 'AI/FeedbackWidget',
  component: FeedbackWidget,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedbackWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    const [val, setVal] = React.useState<'positive' | 'negative' | null>(null);
    return (
      <FeedbackWidget
        value={val}
        onChange={setVal}
        onSubmit={(v, c) => console.log('Feedback:', v, c)}
      />
    );
  },
};

export const Compact: Story = {
  args: { compact: true },
  render: () => {
    const [val, setVal] = React.useState<'positive' | 'negative' | null>(null);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
        <span style={{ fontSize: 13, color: '#64748b' }}>Was this response helpful?</span>
        <FeedbackWidget compact value={val} onChange={setVal} onSubmit={(v) => console.log(v)} />
      </div>
    );
  },
};

export const NoComment: Story = {
  args: { showComment: false },
  render: () => {
    const [val, setVal] = React.useState<'positive' | 'negative' | null>(null);
    return (
      <FeedbackWidget
        showComment={false}
        value={val}
        onChange={setVal}
        onSubmit={(v) => console.log('Quick vote:', v)}
      />
    );
  },
};

export const CustomLabels: Story = {
  args: { positiveLabel: 'Accurate', negativeLabel: 'Inaccurate' },
  render: () => {
    const [val, setVal] = React.useState<'positive' | 'negative' | null>(null);
    return (
      <FeedbackWidget
        positiveLabel="Accurate"
        negativeLabel="Inaccurate"
        commentPlaceholder="What was inaccurate about this response?"
        value={val}
        onChange={setVal}
        onSubmit={(v, c) => console.log(v, c)}
      />
    );
  },
};

export const InlineWithResponse: Story = {
  args: {},
  render: () => {
    const [val, setVal] = React.useState<'positive' | 'negative' | null>(null);
    return (
      <div style={{ maxWidth: 600, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #f1f5f9' }}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: '#1e293b' }}>
            The capital of France is Paris, often referred to as "the City of Light." It has been the country's capital since the late 10th century and is one of the most visited cities in the world.
          </p>
        </div>
        <div style={{ padding: '0.625rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa' }}>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>GPT-4o · 42 tokens</span>
          <FeedbackWidget
            compact
            value={val}
            onChange={setVal}
            onSubmit={(v) => console.log('Feedback:', v)}
            showThankYou={false}
          />
        </div>
      </div>
    );
  },
};
