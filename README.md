# PrepUI

A React 19 UI component library for building dashboards. Built with TypeScript and CSS Modules.

## Live Storybook

Hosted on GitHub Pages — see the **About** section of the repository after deploying.

## Components

| Category | Components |
|---|---|
| Primitives | Button, Badge, Avatar, Spinner |
| Layout | Card |
| Form | Input, Select, Checkbox, Switch |
| Feedback | Alert, Progress |
| Navigation | Tabs, Breadcrumb |
| Overlay | Modal, Tooltip, Dropdown |
| Dashboard | Sidebar, Navbar, StatCard, DataTable |

## Installation

```bash
npm install @prepui/components
```

```tsx
import { Button, Card, StatCard } from '@prepui/components';
import '@prepui/components/style.css';
```

## Development

```bash
npm install          # install dependencies
npm run storybook    # start Storybook at localhost:6006
npm run dev          # start demo app
npm run build        # build library to dist/
```

## Deploy to GitHub Pages

1. Push to `main` / `master` — GitHub Actions builds and deploys Storybook automatically.
2. In your repo: **Settings → Pages → Source** → select **GitHub Actions**.

## License

MIT
