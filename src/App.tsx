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
import Select from './components/Select';
import Checkbox from './components/Checkbox';
import Switch from './components/Switch';
import Modal from './components/Modal';
import Tooltip from './components/Tooltip';
import Dropdown from './components/Dropdown';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';
import DataTable from './components/DataTable';
import type { DropdownItem } from './components/Dropdown';
import type { Column } from './components/DataTable';
import ChatPanel from './components/ChatPanel';
import PromptInput from './components/PromptInput';
import StreamingResponse from './components/StreamingResponse';
import CitationCard from './components/CitationCard';
import ResultsComparison from './components/ResultsComparison';
import FeedbackWidget from './components/FeedbackWidget';
import type { ChatMessage } from './components/ChatPanel';
import type { FeedbackValue } from './components/FeedbackWidget';

const SAMPLE_MESSAGES: ChatMessage[] = [
  { id: 1, role: 'user', content: 'What is React?', timestamp: new Date('2024-01-15T10:00:00') },
  { id: 2, role: 'assistant', content: 'React is a JavaScript library for building user interfaces. It lets you compose UIs from isolated pieces of code called "components".', timestamp: new Date('2024-01-15T10:00:05') },
  { id: 3, role: 'user', content: 'What are hooks?', timestamp: new Date('2024-01-15T10:01:00') },
  { id: 4, role: 'assistant', content: 'Hooks are functions that let you use state and other React features inside function components — no classes needed. useState, useEffect, and useRef are the most common ones.', timestamp: new Date('2024-01-15T10:01:08') },
];

const STREAMING_TEXT = `React hooks are a powerful feature introduced in React 16.8 that let you use state and other React features without writing class components.\n\nThe most commonly used hooks are:\n• useState — for local component state\n• useEffect — for side effects and lifecycle\n• useRef — for mutable refs and DOM access`;

export default function App() {
  const [tab, setTab] = React.useState('components');
  const [section, setSection] = React.useState<'dashboard' | 'ai'>('dashboard');

  // New dashboard component state
  const [selectVal, setSelectVal] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [switched, setSwitched] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [sidebarKey, setSidebarKey] = React.useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  // ChatPanel state
  const [messages, setMessages] = React.useState<ChatMessage[]>(SAMPLE_MESSAGES);
  const [chatLoading, setChatLoading] = React.useState(false);

  // PromptInput state
  const [promptValue, setPromptValue] = React.useState('');

  // StreamingResponse state
  const [streamText, setStreamText] = React.useState('');
  const [streamStatus, setStreamStatus] = React.useState<'idle' | 'streaming' | 'done' | 'error'>('idle');
  const streamRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  // FeedbackWidget state
  const [feedbackVal, setFeedbackVal] = React.useState<FeedbackValue>(null);

  const handlePromptSubmit = (value: string) => {
    const userMsg: ChatMessage = { id: Date.now(), role: 'user', content: value, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setPromptValue('');
    setChatLoading(true);
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `You asked: "${value}". This is a demo response — connect your LLM API to get real answers!`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setChatLoading(false);
    }, 1500);
  };

  const startStream = () => {
    if (streamRef.current) clearInterval(streamRef.current);
    setStreamText('');
    setStreamStatus('streaming');
    let i = 0;
    streamRef.current = setInterval(() => {
      i += 5;
      setStreamText(STREAMING_TEXT.slice(0, i));
      if (i >= STREAMING_TEXT.length) {
        clearInterval(streamRef.current!);
        streamRef.current = null;
        setStreamStatus('done');
      }
    }, 25);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'var(--font-family)' }}>

      {/* ── Top nav ──────────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>
            <span style={{ color: '#6366f1' }}>Prep</span>UI
          </h1>
          <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', borderRadius: 8, padding: 4 }}>
            {(['dashboard', 'ai'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
                style={{
                  padding: '5px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  fontWeight: 500, fontSize: 13, transition: 'all 0.15s',
                  background: section === s ? '#fff' : 'transparent',
                  color: section === s ? '#1e293b' : '#64748b',
                  boxShadow: section === s ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {s === 'dashboard' ? '📊 Dashboard' : '✦ AI Components'}
              </button>
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>
            run <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>npm run storybook</code> for full docs
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>

        {/* ════════════════════ DASHBOARD SECTION ════════════════════ */}
        {section === 'dashboard' && (
          <>
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
                    { key: 'components', label: 'Components', content: <p style={{ margin: 0, color: '#64748b' }}>Browse all 26 components in Storybook.</p> },
                    { key: 'usage', label: 'Usage', badge: 'new', content: <p style={{ margin: 0, color: '#64748b' }}>Import from <code>@prepui/components</code>.</p> },
                    { key: 'theme', label: 'Theming', content: <p style={{ margin: 0, color: '#64748b' }}>Override CSS custom properties in <code>tokens.css</code>.</p> },
                  ]}
                />
              </Card.Body>
            </Card>

            {/* Form — Input, Select, Checkbox, Switch */}
            <Card style={{ marginBottom: '1.5rem' }}>
              <Card.Header>Form Controls</Card.Header>
              <Card.Body>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Input label="Email" placeholder="you@example.com" fullWidth />
                  <Input label="Password" type="password" placeholder="••••••••" fullWidth error="Password too short" />
                  <Select
                    label="Role"
                    fullWidth
                    value={selectVal}
                    onChange={(e) => setSelectVal(e.target.value)}
                    options={[
                      { value: '', label: 'Select a role…', disabled: true },
                      { value: 'admin', label: 'Admin' },
                      { value: 'editor', label: 'Editor' },
                      { value: 'viewer', label: 'Viewer' },
                    ]}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.25rem' }}>
                    <Checkbox
                      label="Subscribe to newsletter"
                      description="Get weekly product updates"
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                    <Switch
                      label="Enable notifications"
                      checked={switched}
                      onChange={(e) => setSwitched(e.target.checked)}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Breadcrumb + Tooltip + Dropdown + Modal */}
            <Card style={{ marginBottom: '1.5rem' }}>
              <Card.Header>Navigation & Overlay</Card.Header>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                  {/* Breadcrumb */}
                  <div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Breadcrumb</p>
                    <Breadcrumb
                      items={[
                        { label: 'Home', href: '#' },
                        { label: 'Dashboard', href: '#' },
                        { label: 'Settings', href: '#' },
                        { label: 'Profile' },
                      ]}
                    />
                  </div>

                  {/* Tooltip + Dropdown */}
                  <div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tooltip & Dropdown</p>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <Tooltip content="This is a helpful tooltip!" placement="top">
                        <Button variant="outline" size="sm">Hover me (top)</Button>
                      </Tooltip>
                      <Tooltip content="Tooltip on the right" placement="right">
                        <Button variant="outline" size="sm">Hover me (right)</Button>
                      </Tooltip>
                      <Dropdown
                        trigger={<Button variant="secondary" size="sm">Actions ▾</Button>}
                        items={[
                          { key: 'edit', label: 'Edit', icon: '✏️' },
                          { key: 'duplicate', label: 'Duplicate', icon: '⎘' },
                          { key: 'divider', label: '─', disabled: true },
                          { key: 'delete', label: 'Delete', icon: '🗑', danger: true },
                        ] as DropdownItem[]}
                        onSelect={(key) => console.log('Dropdown:', key)}
                      />
                    </div>
                  </div>

                  {/* Modal */}
                  <div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Modal</p>
                    <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>Open Modal</Button>
                    <Modal
                      open={modalOpen}
                      onClose={() => setModalOpen(false)}
                      title="Confirm Action"
                      footer={
                        <>
                          <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
                          <Button variant="primary" size="sm" onClick={() => setModalOpen(false)}>Confirm</Button>
                        </>
                      }
                    >
                      <p style={{ margin: 0, color: '#64748b' }}>Are you sure you want to proceed? This action cannot be undone.</p>
                    </Modal>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Sidebar + Navbar */}
            <Card style={{ marginBottom: '1.5rem' }}>
              <Card.Header>Sidebar & Navbar</Card.Header>
              <Card.Body style={{ padding: 0, overflow: 'hidden' }}>
                {/* Navbar demo */}
                <Navbar
                  logo={<strong style={{ color: '#6366f1' }}>PrepUI</strong>}
                  leftContent={
                    <div style={{ display: 'flex', gap: 4 }}>
                      {['Docs', 'Components', 'Examples'].map((l) => (
                        <button key={l} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#64748b', padding: '4px 10px', borderRadius: 6 }}>{l}</button>
                      ))}
                    </div>
                  }
                  rightContent={
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <Badge variant="success" dot>Live</Badge>
                      <Avatar name="Kamlesh" size="sm" />
                    </div>
                  }
                />
                {/* Sidebar demo */}
                <div style={{ display: 'flex', height: 260 }}>
                  <Sidebar
                    collapsed={sidebarCollapsed}
                    activeKey={sidebarKey}
                    onSelect={setSidebarKey}
                    logo={
                      !sidebarCollapsed
                        ? <span style={{ fontWeight: 700, color: '#6366f1', fontSize: 14 }}>✦ PrepUI</span>
                        : <span style={{ color: '#6366f1' }}>✦</span>
                    }
                    items={[
                      { key: 'dashboard', label: 'Dashboard', icon: '📊' },
                      { key: 'users', label: 'Users', icon: '👥', badge: 4 },
                      { key: 'analytics', label: 'Analytics', icon: '📈',
                        items: [
                          { key: 'overview', label: 'Overview' },
                          { key: 'reports', label: 'Reports' },
                        ],
                      },
                      { key: 'settings', label: 'Settings', icon: '⚙️' },
                    ]}
                    footer={
                      <button
                        onClick={() => setSidebarCollapsed((c) => !c)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#94a3b8', width: '100%', textAlign: 'left', padding: '8px 12px' }}
                      >
                        {sidebarCollapsed ? '→' : '← Collapse'}
                      </button>
                    }
                  />
                  <div style={{ flex: 1, padding: '1rem', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: 13 }}>
                      Active: <strong style={{ color: '#1e293b' }}>{sidebarKey}</strong>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* DataTable */}
            <Card>
              <Card.Header>DataTable</Card.Header>
              <Card.Body style={{ padding: 0 }}>
                <DataTable
                  hoverable
                  striped
                  stickyHeader
                  columns={[
                    { key: 'name', header: 'Name', accessor: (r) => r.name, sortable: true },
                    { key: 'role', header: 'Role', accessor: (r) => <Badge variant={r.role === 'Admin' ? 'danger' : r.role === 'Editor' ? 'warning' : 'info'}>{r.role}</Badge>, width: '110px' },
                    { key: 'status', header: 'Status', accessor: (r) => <Badge variant={r.status === 'Active' ? 'success' : 'default'} dot>{r.status}</Badge>, width: '110px' },
                    { key: 'joined', header: 'Joined', accessor: (r) => r.joined, sortable: true, width: '120px' },
                  ] as Column<{ id: number; name: string; role: string; status: string; joined: string }>[]}
                  data={[
                    { id: 1, name: 'Alice Johnson', role: 'Admin', status: 'Active', joined: 'Jan 2023' },
                    { id: 2, name: 'Bob Smith', role: 'Editor', status: 'Active', joined: 'Mar 2023' },
                    { id: 3, name: 'Carol White', role: 'Viewer', status: 'Inactive', joined: 'Jun 2023' },
                    { id: 4, name: 'David Lee', role: 'Editor', status: 'Active', joined: 'Aug 2023' },
                    { id: 5, name: 'Eve Turner', role: 'Viewer', status: 'Active', joined: 'Oct 2023' },
                  ]}
                />
              </Card.Body>
            </Card>
          </>
        )}

        {/* ════════════════════ AI SECTION ════════════════════ */}
        {section === 'ai' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ margin: '0 0 0.25rem', fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                ✦ AI Components
              </h2>
              <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>
                Ready-made building blocks for LLM-powered interfaces.
              </p>
            </div>

            {/* ── 1. Chat Panel + Prompt Input ─────────────────────────── */}
            <Card style={{ marginBottom: '1.5rem' }}>
              <Card.Header>ChatPanel + PromptInput</Card.Header>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ height: 340, border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
                    <ChatPanel
                      messages={messages}
                      loading={chatLoading}
                      renderActions={(msg) =>
                        msg.role === 'assistant' ? (
                          <button
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#94a3b8', padding: '0 2px' }}
                            onClick={() => navigator.clipboard?.writeText(String(msg.content))}
                            title="Copy"
                          >⎘</button>
                        ) : null
                      }
                    />
                  </div>
                  <PromptInput
                    value={promptValue}
                    onChange={setPromptValue}
                    onSubmit={handlePromptSubmit}
                    placeholder="Ask anything… (demo — no real LLM)"
                    showCount
                    loading={chatLoading}
                    toolbar={
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>
                        Press <kbd style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 3, padding: '0 3px', fontSize: 10 }}>Enter</kbd> to send
                      </span>
                    }
                  />
                </div>
              </Card.Body>
            </Card>

            {/* ── 2. Streaming Response ────────────────────────────────── */}
            <Card style={{ marginBottom: '1.5rem' }}>
              <Card.Header>StreamingResponse</Card.Header>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    onClick={startStream}
                    disabled={streamStatus === 'streaming'}
                    style={{
                      alignSelf: 'flex-start', padding: '6px 16px', borderRadius: 6, border: 'none',
                      background: streamStatus === 'streaming' ? '#e2e8f0' : '#6366f1',
                      color: streamStatus === 'streaming' ? '#94a3b8' : '#fff',
                      cursor: streamStatus === 'streaming' ? 'not-allowed' : 'pointer',
                      fontSize: 13, fontWeight: 500,
                    }}
                  >
                    {streamStatus === 'streaming' ? 'Streaming…' : streamStatus === 'done' ? '▶ Stream again' : '▶ Start stream'}
                  </button>
                  <StreamingResponse
                    content={streamText}
                    status={streamStatus}
                    model="gpt-4o"
                    tokenCount={Math.floor(streamText.length / 4)}
                    tokensPerSecond={streamStatus === 'streaming' ? 40 : undefined}
                    showMeta
                    onRetry={startStream}
                  />
                </div>
              </Card.Body>
            </Card>

            {/* ── 3. Citation Cards ────────────────────────────────────── */}
            <Card style={{ marginBottom: '1.5rem' }}>
              <Card.Header>CitationCard</Card.Header>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {[
                    { index: 1, title: 'React – A JavaScript library for building user interfaces', url: 'https://react.dev', source: 'react.dev', excerpt: 'React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video.', date: 'Jan 2024' },
                    { index: 2, title: 'React Hooks Reference – useState, useEffect, useRef', url: 'https://react.dev/reference/react', source: 'react.dev', excerpt: 'Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class component.', date: 'Jan 2024', variant: 'compact' as const },
                  ].map((c) => (
                    <CitationCard key={c.index} {...c} />
                  ))}
                  <div style={{ padding: '0.5rem 0', borderTop: '1px solid #f1f5f9', marginTop: '0.25rem' }}>
                    <p style={{ margin: '0 0 0.375rem', fontSize: 13, color: '#64748b' }}>Inline variant in prose:</p>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: '#1e293b' }}>
                      React{' '}
                      <CitationCard index={1} title="React Docs" url="https://react.dev" variant="inline" />
                      {' '}is maintained by Meta{' '}
                      <CitationCard index={2} title="Meta Open Source" url="https://opensource.fb.com" variant="inline" />
                      {' '}and a large open-source community.
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* ── 4. Results Comparison ───────────────────────────────── */}
            <Card style={{ marginBottom: '1.5rem' }}>
              <Card.Header>ResultsComparison</Card.Header>
              <Card.Body>
                <ResultsComparison
                  prompt="Explain React hooks in one paragraph."
                  results={[
                    {
                      id: 'gpt4',
                      label: 'GPT-4o',
                      badge: 'OpenAI',
                      accentColor: '#10a37f',
                      content: 'React Hooks are functions introduced in React 16.8 that allow functional components to use state and lifecycle features previously only available in class components. Common hooks include useState for local state, useEffect for side effects, and useRef for persistent mutable values.',
                      meta: [{ key: 'latency', value: '1.2s' }, { key: 'tokens', value: '68' }],
                    },
                    {
                      id: 'claude',
                      label: 'Claude 3.5',
                      badge: 'Anthropic',
                      accentColor: '#d97706',
                      content: 'React Hooks (added in v16.8) let you "hook into" React features from function components. They replace class lifecycle methods with composable functions: useState manages local state, useEffect handles side effects, and custom hooks let you extract and share stateful logic between components.',
                      meta: [{ key: 'latency', value: '0.9s' }, { key: 'tokens', value: '72' }],
                    },
                  ]}
                />
              </Card.Body>
            </Card>

            {/* ── 5. Feedback Widget ───────────────────────────────────── */}
            <Card>
              <Card.Header>FeedbackWidget</Card.Header>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Full widget */}
                  <div>
                    <p style={{ margin: '0 0 0.75rem', fontSize: 13, color: '#64748b', fontWeight: 500 }}>Full (with comment):</p>
                    <FeedbackWidget
                      value={feedbackVal}
                      onChange={setFeedbackVal}
                      onSubmit={(v, c) => console.log('Feedback:', v, c)}
                    />
                  </div>

                  {/* Compact inline */}
                  <div>
                    <p style={{ margin: '0 0 0.75rem', fontSize: 13, color: '#64748b', fontWeight: 500 }}>Compact inline (typical use):</p>
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', maxWidth: 520 }}>
                      <div style={{ padding: '0.875rem 1rem', borderBottom: '1px solid #f1f5f9' }}>
                        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: '#1e293b' }}>
                          The Eiffel Tower was built between 1887 and 1889 as the entrance arch for the 1889 World's Fair in Paris.
                        </p>
                      </div>
                      <div style={{ padding: '0.5rem 1rem', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>gpt-4o · 28 tokens</span>
                        <FeedbackWidget compact showThankYou={false} onSubmit={(v) => console.log('Vote:', v)} />
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
