import type { Meta, StoryObj } from '@storybook/react-vite';
import Navbar from './Navbar';

const meta = { title: 'Dashboard/Navbar', component: Navbar, parameters: { layout: 'fullscreen' }, tags: ['autodocs'] } satisfies Meta<typeof Navbar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { logo: 'PrepUI' },
  render: () => (
    <Navbar
      logo="PrepUI"
      rightContent={
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>🔔</button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.875rem' }}>JD</div>
        </div>
      }
    />
  ),
};