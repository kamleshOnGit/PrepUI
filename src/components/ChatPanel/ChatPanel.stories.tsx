import type { Meta, StoryObj } from '@storybook/react-vite';
import ChatPanel from './ChatPanel';
import type { ChatMessage } from './ChatPanel';

const meta = {
  title: 'AI/ChatPanel',
  component: ChatPanel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof ChatPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMessages: ChatMessage[] = [
  {
    id: 1,
    role: 'user',
    content: 'What is the capital of France?',
    timestamp: new Date('2024-01-15T10:00:00'),
  },
  {
    id: 2,
    role: 'assistant',
    content: 'The capital of France is **Paris**. It is the largest city in France and has been the country\'s capital since the late 10th century.',
    timestamp: new Date('2024-01-15T10:00:05'),
  },
  {
    id: 3,
    role: 'user',
    content: 'What is the population of Paris?',
    timestamp: new Date('2024-01-15T10:01:00'),
  },
  {
    id: 4,
    role: 'assistant',
    content: 'Paris has a population of approximately 2.1 million people in the city proper, while the greater Paris metropolitan area (Île-de-France) is home to around 12 million people, making it one of the most populous urban areas in Europe.',
    timestamp: new Date('2024-01-15T10:01:08'),
  },
];

export const Default: Story = {
  args: { messages: sampleMessages, loading: false },
  render: () => (
    <div style={{ height: 420, border: '1px solid #e2e8f0', borderRadius: 12 }}>
      <ChatPanel messages={sampleMessages} />
    </div>
  ),
};

export const Empty: Story = {
  args: { messages: [], loading: false },
  render: () => (
    <div style={{ height: 320, border: '1px solid #e2e8f0', borderRadius: 12 }}>
      <ChatPanel messages={[]} />
    </div>
  ),
};

export const Loading: Story = {
  args: { messages: sampleMessages, loading: true },
  render: () => (
    <div style={{ height: 420, border: '1px solid #e2e8f0', borderRadius: 12 }}>
      <ChatPanel messages={sampleMessages} loading />
    </div>
  ),
};

export const WithStreaming: Story = {
  args: { messages: [], loading: false },
  render: () => (
    <div style={{ height: 360, border: '1px solid #e2e8f0', borderRadius: 12 }}>
      <ChatPanel
        messages={[
          { id: 1, role: 'user', content: 'Tell me about React hooks', timestamp: new Date() },
          {
            id: 2,
            role: 'assistant',
            content: 'React hooks are functions that let you use state and other React features in function components. The most commonly used hooks are useState and useEffect...',
            timestamp: new Date(),
            isStreaming: true,
          },
        ]}
      />
    </div>
  ),
};

export const WithSystemMessage: Story = {
  args: { messages: [], loading: false },
  render: () => (
    <div style={{ height: 380, border: '1px solid #e2e8f0', borderRadius: 12 }}>
      <ChatPanel
        messages={[
          { id: 0, role: 'system', content: 'You are a helpful assistant.' },
          { id: 1, role: 'user', content: 'Hello!', timestamp: new Date() },
          { id: 2, role: 'assistant', content: 'Hello! How can I help you today?', timestamp: new Date() },
        ]}
      />
    </div>
  ),
};

export const WithActions: Story = {
  args: { messages: sampleMessages },
  render: () => (
    <div style={{ height: 420, border: '1px solid #e2e8f0', borderRadius: 12 }}>
      <ChatPanel
        messages={sampleMessages}
        renderActions={(msg) =>
          msg.role === 'assistant' ? (
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#94a3b8', padding: '0 4px' }}
              onClick={() => navigator.clipboard?.writeText(String(msg.content))}
              title="Copy"
            >
              ⎘
            </button>
          ) : null
        }
      />
    </div>
  ),
};
