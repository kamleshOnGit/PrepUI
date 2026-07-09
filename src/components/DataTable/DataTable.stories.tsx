import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import DataTable from './DataTable';
import type { Column } from './DataTable';

interface User { id: number; name: string; email: string; role: string; status: string; }

const users: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'Active' },
];

const manyUsers: User[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `User ${String(i + 1).padStart(2, '0')}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'Editor', 'Viewer'][i % 3],
  status: i % 4 === 0 ? 'Inactive' : 'Active',
}));

const columns: Column<User>[] = [
  { key: 'name', header: 'Name', accessor: r => r.name, sortable: true },
  { key: 'email', header: 'Email', accessor: r => r.email, sortable: true },
  { key: 'role', header: 'Role', accessor: r => r.role },
  { key: 'status', header: 'Status', accessor: r => (
    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: r.status === 'Active' ? 'var(--color-success-subtle)' : 'var(--color-surface-sunken)', color: r.status === 'Active' ? '#16a34a' : 'var(--color-text-muted)' }}>
      {r.status}
    </span>
  )},
];

const meta: Meta = { title: 'Dashboard/DataTable', component: DataTable, parameters: { layout: 'padded' }, tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => <DataTable columns={columns} data={users} /> };
export const Striped: Story = { render: () => <DataTable columns={columns} data={users} striped /> };
export const Loading: Story = { render: () => <DataTable columns={columns} data={[]} loading /> };
export const Empty: Story = { render: () => <DataTable columns={columns} data={[]} emptyText="No users found" /> };

export const Paginated: Story = {
  render: () => <DataTable columns={columns} data={manyUsers} pageSize={5} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('1–5 of 23')).toBeInTheDocument();
    await expect(canvas.getByText('User 01')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Next page' }));
    await expect(canvas.getByText('6–10 of 23')).toBeInTheDocument();
    await expect(canvas.getByText('User 06')).toBeInTheDocument();
    await expect(canvas.queryByText('User 01')).not.toBeInTheDocument();
  },
};

export const Selectable: Story = {
  render: () => <DataTable columns={columns} data={users} selectable pageSize={10} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('checkbox', { name: 'Select row 1' }));
    await userEvent.click(canvas.getByRole('checkbox', { name: 'Select row 2' }));
    await expect(canvas.getByText(/2 selected/)).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('checkbox', { name: 'Select all rows' }));
    await expect(canvas.getByText(/4 selected/)).toBeInTheDocument();
  },
};

export const Sortable: Story = {
  render: () => <DataTable columns={columns} data={users} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Name'));
    let rows = canvas.getAllByRole('row').slice(1);
    await expect(within(rows[0]).getByText('Alice Johnson')).toBeInTheDocument();
    await userEvent.click(canvas.getByText('Name'));
    rows = canvas.getAllByRole('row').slice(1);
    await expect(within(rows[0]).getByText('David Lee')).toBeInTheDocument();
  },
};
