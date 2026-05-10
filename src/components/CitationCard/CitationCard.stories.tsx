import type { Meta, StoryObj } from '@storybook/react';
import CitationCard from './CitationCard';

const meta = {
  title: 'AI/CitationCard',
  component: CitationCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof CitationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    index: 1,
    title: 'React – A JavaScript library for building user interfaces',
    url: 'https://react.dev',
    source: 'react.dev',
    excerpt: 'React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video.',
    date: 'Jan 2024',
  },
};

export const Compact: Story = {
  args: {
    index: 2,
    title: 'React Documentation – Getting Started',
    url: 'https://react.dev/learn',
    source: 'react.dev',
    variant: 'compact',
    date: '2 days ago',
  },
};

export const Inline: Story = {
  args: {
    index: 3,
    title: 'React Official Docs',
    url: 'https://react.dev',
    variant: 'inline',
  },
  render: () => (
    <p style={{ fontSize: 15, lineHeight: 1.8, color: '#1e293b' }}>
      React is a popular JavaScript library{' '}
      <CitationCard index={1} title="React Official Docs" url="https://react.dev" variant="inline" />
      {' '}for building user interfaces. It was created by Meta{' '}
      <CitationCard index={2} title="Meta Open Source" url="https://opensource.fb.com" variant="inline" />
      {' '}and is widely used in production.
    </p>
  ),
};

export const WithHighlight: Story = {
  args: {
    index: 1,
    title: 'Understanding React Hooks and State Management',
    url: 'https://react.dev/reference/react',
    source: 'react.dev',
    excerpt: 'React Hooks let you use state and other React features without writing a class component. useState, useEffect and useRef are the most commonly used hooks.',
    highlight: 'hooks',
    date: 'Dec 2023',
  },
};

export const NoUrl: Story = {
  args: {
    index: 4,
    title: 'Internal Knowledge Base Entry',
    source: 'Internal Docs',
    excerpt: 'This citation comes from an internal document with no external URL.',
  },
};

export const MultipleCards: Story = {
  args: { title: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 580 }}>
      {[
        { index: 1, title: 'What is React? – Official Documentation', url: 'https://react.dev', source: 'react.dev', excerpt: 'React makes it painless to create interactive UIs. Design simple views for each state in your application...', date: 'Jan 2024' },
        { index: 2, title: 'React Hooks Reference – useState, useEffect', url: 'https://react.dev/reference/react', source: 'react.dev', excerpt: 'Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.', date: 'Jan 2024' },
        { index: 3, title: 'Getting Started with React – MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started', source: 'MDN Web Docs', excerpt: 'In this article we will say hello to React. We\'ll discover a little detail about its background and use cases...', date: 'Nov 2023' },
      ].map((c) => (
        <CitationCard key={c.index} {...c} />
      ))}
    </div>
  ),
};
