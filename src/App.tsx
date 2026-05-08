import React from 'react';
import Button from './components/Button';
import Badge from './components/Badge';
import Card from './components/Card';
import Avatar from './components/Avatar';
import StatCard from './components/StatCard';
import Alert from './components/Alert';
import Progress from './components/Progress';
import Spinner from './components/Spinner';
import Tabs from './components/Tabs';
import Input from './components/Input';

export default function App() {
  const [tab, setTab] = React.useState('components');

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem', fontFamily: 'var(--font-family)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>
            <span style={{ color: '#6366f1' }}>Prep</span>UI
          </h1>
          <p style={{ margin: '0.5rem 0 0', color: '#64748b' }}>
            React 19 Dashboard Component Library — run <code>npm run storybook</code> for full docs.
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <StatCard title="Total Revenue" value="$48,295" trend="up" trendValue="12.5%" subtitle="vs last month" icon="💰" />
          <StatCard title="Active Users" value="3,842" trend="up" trendValue="8.1%" subtitle="vs last week" icon="👤" />
          <StatCard title="Orders" value="1,204" trend="down" trendValue="3.2%" subtitle="vs yesterday" icon="📦" />
          <StatCard title="Bounce Rate" value="42.3%" trend="neutral" trendValue="0%" subtitle="No change" icon="📊" />
        </div>

        {/* Buttons */}
        <Card style={{ marginBottom: '1.5rem' }}>
          <Card.Header>Buttons</Card.Header>
          <Card.Body>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button loading>Loading</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </Card.Body>
        </Card>

        {/* Badges + Avatars */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <Card>
            <Card.Header>Badges</Card.Header>
            <Card.Body>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Badge>Default</Badge>
                <Badge variant="success" dot>Active</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="danger">Offline</Badge>
                <Badge variant="info">New</Badge>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Avatars</Card.Header>
            <Card.Body>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Avatar name="Alice Johnson" size="xl" status="online" />
                <Avatar name="Bob Smith" size="lg" status="away" />
                <Avatar name="Carol White" size="md" status="busy" />
                <Avatar name="David Lee" size="sm" status="offline" />
                <Avatar name="Eve" size="xs" />
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Alerts */}
        <Card style={{ marginBottom: '1.5rem' }}>
          <Card.Header>Alerts</Card.Header>
          <Card.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Alert variant="info" title="Information">Your session will expire in 30 minutes.</Alert>
              <Alert variant="success" title="Success!">Your changes have been saved.</Alert>
              <Alert variant="warning" title="Warning">Please review before continuing.</Alert>
              <Alert variant="danger" title="Error">Something went wrong. Please try again.</Alert>
            </div>
          </Card.Body>
        </Card>

        {/* Progress + Spinners */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '1.5rem' }}>
          <Card>
            <Card.Header>Progress</Card.Header>
            <Card.Body>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Progress value={75} label="Upload" showValue variant="primary" />
                <Progress value={90} label="Storage" showValue variant="danger" />
                <Progress value={45} label="Processing" showValue striped animated />
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Spinners</Card.Header>
            <Card.Body>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="xl" variant="muted" />
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Tabs */}
        <Card style={{ marginBottom: '1.5rem' }}>
          <Card.Header>Tabs</Card.Header>
          <Card.Body>
            <Tabs
              activeKey={tab}
              onChange={setTab}
              variant="underline"
              items={[
                { key: 'components', label: 'Components', content: <p style={{ margin: 0, color: '#64748b' }}>Browse all 20+ components in Storybook.</p> },
                { key: 'usage', label: 'Usage', badge: 'new', content: <p style={{ margin: 0, color: '#64748b' }}>Import from <code>@prepui/components</code>.</p> },
                { key: 'theme', label: 'Theming', content: <p style={{ margin: 0, color: '#64748b' }}>Override CSS custom properties in <code>tokens.css</code>.</p> },
              ]}
            />
          </Card.Body>
        </Card>

        {/* Inputs */}
        <Card>
          <Card.Header>Form Inputs</Card.Header>
          <Card.Body>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="Email" placeholder="you@example.com" fullWidth />
              <Input label="Password" type="password" placeholder="••••••••" fullWidth error="Password too short" />
            </div>
          </Card.Body>
        </Card>

      </div>
    </div>
  );
}
