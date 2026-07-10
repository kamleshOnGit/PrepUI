# PrepUI

A React 19 UI component library for building dashboards. 30+ accessible components, dark mode theming, and AI building blocks. Built with TypeScript and CSS Modules — zero runtime CSS-in-JS.

## Features

- **30+ components** — primitives, forms, navigation, overlays, dashboard widgets, and AI chat components
- **Dark mode** — built-in `ThemeProvider` with `data-theme` attribute and semantic design tokens
- **Accessible** — ARIA roles, keyboard navigation, focus management
- **Tree-shakeable** — ESM + CJS builds, `sideEffects` configured
- **TypeScript** — full type definitions shipped in the package
- **No CSS-in-JS** — CSS Modules with a single token-driven stylesheet import

## Components

| Category | Components |
|---|---|
| Primitives | Button, Badge, Avatar, Spinner, Skeleton |
| Layout | Card, EmptyState |
| Form | Input, Select, Checkbox, Switch, Textarea, RadioGroup |
| Feedback | Alert, Progress, Toast |
| Navigation | Tabs, Breadcrumb, Pagination |
| Overlay | Modal, Tooltip, Dropdown |
| Dashboard | Sidebar, Navbar, StatCard, DataTable |
| Theming | ThemeProvider, useTheme |
| AI | ChatPanel, PromptInput, StreamingResponse, CitationCard, ResultsComparison, FeedbackWidget |

## Installation

```bash
npm install @kamleshdev/prepui
```

Peer dependencies: `react >= 19` and `react-dom >= 19`.

## Usage

```tsx
import { Button, Card, StatCard, ThemeProvider } from '@kamleshdev/prepui';
import '@kamleshdev/prepui/style.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Card>
        <Card.Header>Sales Overview</Card.Header>
        <Card.Body>
          <StatCard title="Revenue" value="$48,295" trend="up" trendValue="12.5%" />
          <Button variant="primary">View report</Button>
        </Card.Body>
      </Card>
    </ThemeProvider>
  );
}
```

### Dark mode

Wrap your app in `ThemeProvider` and use the `useTheme` hook:

```tsx
import { ThemeProvider, useTheme } from '@kamleshdev/prepui';

const { theme, toggleTheme } = useTheme();
```

The theme is persisted to `localStorage` and applied via `data-theme` on `<html>`.

### Toast notifications

```tsx
import { ToastProvider, useToast } from '@kamleshdev/prepui';

// Wrap your app:
<ToastProvider><App /></ToastProvider>

// Inside any component:
const { toast } = useToast();
toast({ title: 'Saved!', variant: 'success' });
```

### DataTable with pagination & selection

```tsx
<DataTable
  columns={columns}
  data={rows}
  pageSize={10}
  selectable
  striped
  stickyHeader
/>
```

## Development

```bash
npm install          # install dependencies
npm run storybook    # start Storybook at localhost:6006
npm run dev          # start demo app
npm run build        # build library to dist/
npm run lint         # lint
npm test             # run Storybook interaction tests
```

## Deploy Storybook to GitHub Pages

1. Push to `main` / `master` — GitHub Actions builds and deploys Storybook automatically.
2. In your repo: **Settings → Pages → Source** → select **GitHub Actions**.

## License

MIT
