import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import Pagination from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const Interactive = (args: React.ComponentProps<typeof Pagination>) => {
  const [page, setPage] = React.useState(args.page);
  return <Pagination {...args} page={page} onPageChange={setPage} />;
};

export const Default: Story = {
  args: { page: 1, pageCount: 10, onPageChange: () => {} },
  render: (args) => <Interactive {...args} />,
};
export const ManyPages: Story = {
  args: { page: 12, pageCount: 40, onPageChange: () => {} },
  render: (args) => <Interactive {...args} />,
};
export const WithFirstLast: Story = {
  args: { page: 5, pageCount: 20, showFirstLast: true, onPageChange: () => {} },
  render: (args) => <Interactive {...args} />,
};
export const WiderSiblings: Story = {
  args: { page: 10, pageCount: 30, siblingCount: 2, onPageChange: () => {} },
  render: (args) => <Interactive {...args} />,
};
export const Small: Story = {
  args: { page: 3, pageCount: 12, size: 'sm', onPageChange: () => {} },
  render: (args) => <Interactive {...args} />,
};
export const FewPages: Story = {
  args: { page: 2, pageCount: 4, onPageChange: () => {} },
  render: (args) => <Interactive {...args} />,
};
