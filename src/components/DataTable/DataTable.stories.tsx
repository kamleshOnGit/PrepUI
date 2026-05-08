import type { Meta, StoryObj } from '@storybook/react';
import DataTable from './DataTable';
import type { Column } from './DataTable';

interface User { id: number; name: string; email: string; role: string; status: string; }

const users: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'Active' },
];

const columns: Column<User>[] = [
  { key: 'name', header: 'Name', accessor: r => r.name, sortable: true },
  { key: 'email', header: 'Email', accessor: r => r.email, sortable: true },
  { key: 'role', header: 'Role', accessor: r => r.role },
  { key: 'status', header: 'Status', accessor: r => (
    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: r.status === 'Active' ? '#dcfce7' : '#f1f5f9', color: r.status === 'Active' ? '#16a34a' : '#64748b' }}>
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
