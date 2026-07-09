import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import StreamingResponse from './StreamingResponse';

const meta = {
  title: 'AI/StreamingResponse',
  component: StreamingResponse,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof StreamingResponse>;

export default meta;
type Story = StoryObj<typeof meta>;

const longText = `React is a JavaScript library for building user interfaces. It was developed by Meta (formerly Facebook) and is maintained by Meta and a community of individual developers and companies.

React allows developers to create large web applications that can change data without reloading the page. Its main goal is to be fast, scalable, and simple.`;

export const Idle: Story = {
  args: { content: '', status: 'idle', model: 'gpt-4o', showMeta: true },
};

export const Streaming: Story = {
  args: { content: '', status: 'streaming', model: 'gpt-4o', showMeta: true },
  render: () => {
    const [text, setText] = React.useState('');
    const [running, setRunning] = React.useState(false);

    const start = () => {
      setText('');
      setRunning(true);
      let i = 0;
      const interval = setInterval(() => {
        i += 4;
        setText(longText.slice(0, i));
        if (i >= longText.length) { clearInterval(interval); setRunning(false); }
      }, 30);
    };

    return (
      <div style={{ maxWidth: 680 }}>
        <button onClick={start} disabled={running} style={{ marginBottom: 12, padding: '6px 16px', borderRadius: 6, border: '1px solid #e2e8f0', cursor: 'pointer', background: '#6366f1', color: '#fff' }}>
          {running ? 'Streaming…' : 'Start stream'}
        </button>
        <StreamingResponse
          content={text}
          status={running ? 'streaming' : text.length ? 'done' : 'idle'}
          model="gpt-4o"
          tokenCount={Math.floor(text.length / 4)}
          tokensPerSecond={running ? 30 : undefined}
          showMeta
        />
      </div>
    );
  },
};

export const Done: Story = {
  args: { content: longText, status: 'done', model: 'gpt-4o', tokenCount: 128, showMeta: true },
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <StreamingResponse content={longText} status="done" model="gpt-4o" tokenCount={128} showMeta />
    </div>
  ),
};

export const Error: Story = {
  args: { content: '', status: 'error', showMeta: true },
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <StreamingResponse
        content=""
        status="error"
        model="gpt-4o"
        errorMessage="Rate limit exceeded. Please try again in a moment."
        onRetry={() => alert('Retrying…')}
        showMeta
      />
    </div>
  ),
};

export const NoMeta: Story = {
  args: { content: longText, status: 'done', showMeta: false },
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <StreamingResponse content={longText} status="done" showMeta={false} />
    </div>
  ),
};
