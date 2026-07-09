import type { Meta, StoryObj } from '@storybook/react-vite';
import EmptyState from './EmptyState';
import Button from '../Button';

const meta = { title: 'Components/EmptyState', component: EmptyState, parameters: { layout: 'centered' }, tags: ['autodocs'] } satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { icon: '📭', title: 'No messages', description: 'When you receive messages, they will show up here.' } };
export const WithAction: Story = { args: { icon: '📁', title: 'No projects yet', description: 'Get started by creating your first project.', action: <Button>Create project</Button> } };
export const WithoutIcon: Story = { args: { title: 'Nothing to see here', description: 'This list is currently empty.' } };
export const Small: Story = { args: { size: 'sm', icon: '🔍', title: 'No results', description: 'Try adjusting your search.' } };
export const Large: Story = { args: { size: 'lg', icon: '🗂️', title: 'No documents found', description: 'Upload a document to get started with your workspace.', action: <Button size="lg">Upload document</Button> } };
