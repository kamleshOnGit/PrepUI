import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta = { title: 'Components/Card', component: Card, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Simple card content', padding: 'md', bordered: true } };
export const WithSections: Story = {
  args: { children: null, padding: 'md' },
  render: () => (
    <Card style={{ width: 320 }}>
      <Card.Header>Card Title</Card.Header>
      <Card.Body>This is the card body with some descriptive text.</Card.Body>
      <Card.Footer>Footer content</Card.Footer>
    </Card>
  ),
};
export const Hoverable: Story = { args: { children: 'Hover over me!', hoverable: true, padding: 'md', bordered: true } };
