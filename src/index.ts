// PrepUI — React 19 Dashboard Component Library

// ── Theming ─────────────────────────────────────────────────────────────────
export { ThemeProvider, useTheme } from './theme';
export type { Theme, ThemeContextValue, ThemeProviderProps } from './theme';

// ── Primitives ─────────────────────────────────────────────────────────────
export { default as Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { default as Badge } from './components/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './components/Badge';

export { default as Avatar } from './components/Avatar';
export type { AvatarProps, AvatarSize, AvatarStatus } from './components/Avatar';

export { default as Spinner } from './components/Spinner';
export type { SpinnerProps, SpinnerSize, SpinnerVariant } from './components/Spinner';

export { default as Skeleton } from './components/Skeleton';
export type { SkeletonProps, SkeletonVariant } from './components/Skeleton';

// ── Layout ──────────────────────────────────────────────────────────────────
export { default as Card } from './components/Card';
export type { CardProps } from './components/Card';

// ── Form ────────────────────────────────────────────────────────────────────
export { default as Input } from './components/Input';
export type { InputProps, InputSize } from './components/Input';

export { default as Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';

export { default as Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';

export { default as Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export { default as Textarea } from './components/Textarea';
export type { TextareaProps, TextareaSize } from './components/Textarea';

export { default as RadioGroup } from './components/RadioGroup';
export type { RadioGroupProps, RadioOption } from './components/RadioGroup';

// ── Feedback ────────────────────────────────────────────────────────────────
export { default as Alert } from './components/Alert';
export type { AlertProps, AlertVariant } from './components/Alert';

export { default as Progress } from './components/Progress';
export type { ProgressProps, ProgressVariant, ProgressSize } from './components/Progress';

export { ToastProvider, useToast } from './components/Toast';
export type { ToastOptions, ToastVariant, ToastPosition, ToastProviderProps } from './components/Toast';

export { default as EmptyState } from './components/EmptyState';
export type { EmptyStateProps, EmptyStateSize } from './components/EmptyState';

// ── Navigation ──────────────────────────────────────────────────────────────
export { default as Tabs } from './components/Tabs';
export type { TabsProps, TabItem } from './components/Tabs';

export { default as Breadcrumb } from './components/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './components/Breadcrumb';

export { default as Pagination } from './components/Pagination';
export type { PaginationProps, PaginationSize } from './components/Pagination';

// ── Overlay ──────────────────────────────────────────────────────────────────
export { default as Modal } from './components/Modal';
export type { ModalProps, ModalSize } from './components/Modal';

export { default as Tooltip } from './components/Tooltip';
export type { TooltipProps, TooltipPlacement } from './components/Tooltip';

export { default as Dropdown } from './components/Dropdown';
export type { DropdownProps, DropdownItem } from './components/Dropdown';

// ── Dashboard ────────────────────────────────────────────────────────────────
export { default as Sidebar } from './components/Sidebar';
export type { SidebarProps, SidebarItem } from './components/Sidebar';

export { default as Navbar } from './components/Navbar';
export type { NavbarProps } from './components/Navbar';

export { default as StatCard } from './components/StatCard';
export type { StatCardProps, StatCardTrend } from './components/StatCard';

export { default as DataTable } from './components/DataTable';
export type { DataTableProps, Column, SortDirection } from './components/DataTable';

// ── AI Components ─────────────────────────────────────────────────────────────
export { default as ChatPanel } from './components/ChatPanel';
export type { ChatPanelProps, ChatMessage, ChatRole } from './components/ChatPanel';

export { default as PromptInput } from './components/PromptInput';
export type { PromptInputProps } from './components/PromptInput';

export { default as StreamingResponse } from './components/StreamingResponse';
export type { StreamingResponseProps, StreamingStatus } from './components/StreamingResponse';

export { default as CitationCard } from './components/CitationCard';
export type { CitationCardProps, CitationVariant } from './components/CitationCard';

export { default as ResultsComparison } from './components/ResultsComparison';
export type { ResultsComparisonProps, ComparisonResult, ComparisonLayout } from './components/ResultsComparison';

export { default as FeedbackWidget } from './components/FeedbackWidget';
export type { FeedbackWidgetProps, FeedbackValue } from './components/FeedbackWidget';
