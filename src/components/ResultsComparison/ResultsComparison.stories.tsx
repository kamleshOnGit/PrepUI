import type { Meta, StoryObj } from '@storybook/react';
import ResultsComparison from './ResultsComparison';

const meta = {
  title: 'AI/ResultsComparison',
  component: ResultsComparison,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof ResultsComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

const gpt4Response = `Paris is the capital and most populous city of France. It is situated in northern France at the heart of the Île-de-France region.

Paris has a population of approximately 2.1 million people within the city limits, while the greater metropolitan area holds around 12 million, making it one of Europe's largest urban agglomerations.

The city is renowned for its art, fashion, gastronomy, and culture. It is home to the Eiffel Tower, the Louvre Museum, and Notre-Dame Cathedral.`;

const claudeResponse = `The capital of France is Paris, often called "the City of Light" (La Ville Lumière). 

Paris serves as the country's political, economic, and cultural center. With about 2.2 million residents in the commune itself and nearly 12 million in the Île-de-France metropolitan region, it ranks among the most visited cities in the world.

Key facts:
• Founded over 2,000 years ago as a Roman settlement
• Home to iconic landmarks like the Eiffel Tower and Louvre
• A global hub for art, fashion, and cuisine`;

export const Default: Story = {
  args: { results: [], prompt: '' },
  render: () => (
    <ResultsComparison
      prompt="What is the capital of France and what is its population?"
      results={[
        {
          id: 'gpt4',
          label: 'GPT-4o',
          badge: 'v4o',
          accentColor: '#10a37f',
          content: gpt4Response,
          meta: [{ key: 'latency', value: '1.2s' }, { key: 'tokens', value: '142' }],
        },
        {
          id: 'claude',
          label: 'Claude 3.5',
          badge: 'Sonnet',
          accentColor: '#d97706',
          content: claudeResponse,
          meta: [{ key: 'latency', value: '0.9s' }, { key: 'tokens', value: '128' }],
        },
      ]}
    />
  ),
};

export const ThreeModels: Story = {
  args: { results: [] },
  render: () => (
    <ResultsComparison
      prompt="Explain React in one sentence."
      results={[
        { id: 1, label: 'GPT-4o', badge: 'OpenAI', accentColor: '#10a37f', content: 'React is a declarative JavaScript library for building composable user interfaces using a component-based architecture and a virtual DOM.' },
        { id: 2, label: 'Claude 3', badge: 'Anthropic', accentColor: '#d97706', content: 'React is a JavaScript library that lets you build user interfaces by composing reusable components, using a virtual DOM to efficiently update only the parts of the page that change.' },
        { id: 3, label: 'Gemini', badge: 'Google', accentColor: '#4285f4', content: 'React is an open-source JavaScript library for building fast, interactive user interfaces through a component-based paradigm and virtual DOM rendering.' },
      ]}
    />
  ),
};

export const Stacked: Story = {
  args: { results: [], layout: 'stacked' },
  render: () => (
    <ResultsComparison
      prompt="What is the capital of France?"
      layout="stacked"
      results={[
        { id: 'a', label: 'Model A', badge: 'v1', content: gpt4Response },
        { id: 'b', label: 'Model B', badge: 'v2', accentColor: '#d97706', content: claudeResponse },
      ]}
    />
  ),
};

export const WithReactContent: Story = {
  args: { results: [] },
  render: () => (
    <ResultsComparison
      prompt="List 3 programming languages"
      results={[
        {
          id: 'a',
          label: 'Model A',
          badge: 'fast',
          accentColor: '#6366f1',
          content: (
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
              <li>Python — great for data science and ML</li>
              <li>TypeScript — typed superset of JavaScript</li>
              <li>Rust — systems programming with memory safety</li>
            </ul>
          ),
        },
        {
          id: 'b',
          label: 'Model B',
          badge: 'pro',
          accentColor: '#0ea5e9',
          content: (
            <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
              <li><strong>JavaScript</strong> — runs everywhere</li>
              <li><strong>Go</strong> — simple and performant</li>
              <li><strong>Kotlin</strong> — modern JVM language</li>
            </ol>
          ),
        },
      ]}
    />
  ),
};
