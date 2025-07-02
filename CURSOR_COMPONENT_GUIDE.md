# Component Development Guide

## 🧩 Component Architecture

This project uses a **modular component system** built on React Bootstrap with custom SCSS styling. All components follow consistent patterns for maintainability and reusability.

### Component Structure Pattern

```typescript
// ComponentName.tsx
import React from 'react';
import { ComponentName as BootstrapComponent } from 'react-bootstrap';
import styles from './styles.module.scss';

export interface ComponentNameProps {
  // TypeScript interface for props
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  className?: string;
  // ... other props
}

const ComponentName: React.FC<ComponentNameProps> = ({
  variant = 'default',
  size = 'medium',
  children,
  className = '',
  // ... other props
}) => {
  // Helper functions for variants/sizes
  const getVariant = () => {
    switch (variant) {
      case 'primary': return 'primary';
      case 'secondary': return 'secondary';
      default: return 'default';
    }
  };

  const getSize = () => {
    switch (size) {
      case 'small': return 'sm';
      case 'large': return 'lg';
      default: return undefined;
    }
  };

  // Combine classes
  const componentClasses = [
    styles.componentName,
    className
  ].filter(Boolean).join(' ');

  return (
    <BootstrapComponent
      variant={getVariant()}
      size={getSize()}
      className={componentClasses}
    >
      {children}
    </BootstrapComponent>
  );
};

export default ComponentName;
```

```scss
// styles.module.scss
.componentName {
  // Base styles
  position: relative;
  
  // Variant styles
  &[data-variant="primary"] {
    background-color: var(--primary-color);
  }
  
  &[data-variant="secondary"] {
    background-color: var(--secondary-color);
  }
  
  // Size styles
  &[data-size="small"] {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  &[data-size="large"] {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
  
  // Responsive styles
  @media (max-width: 768px) {
    // Mobile-specific styles
  }
}
```

## 📁 Component Categories

### 1. Layout Components

**Location**: `src/components/header-sidebar/`

#### Header Component
- **File**: `header/header.tsx`
- **Purpose**: Top navigation with user menu and theme toggle
- **Features**: 
  - User dropdown with profile/logout
  - Dark/light theme toggle
  - Responsive design
  - Click outside to close dropdown

#### Sidebar Component
- **File**: `sidebar/sidebar.tsx`
- **Purpose**: Main navigation sidebar
- **Features**:
  - Collapsible on desktop
  - Mobile overlay menu
  - Active route highlighting
  - Icon + label navigation

### 2. Common Components

**Location**: `src/components/common/`

#### Button Component
- **File**: `Button/Button.tsx`
- **Variants**: primary, secondary, tertiary, danger, icon, link
- **Sizes**: small, medium, large
- **Features**: loading state, disabled state, icon support

#### Card Component
- **File**: `Card/Card.tsx`
- **Variants**: default, strong, tight, tight-strong
- **Features**: bordered option, shadow styling

#### Form Components
- **Input**: `Form/Input/`
- **Select**: `Select/`
- **Checkbox**: `Checkbox/`
- **Validation**: Yup/Zod schemas

#### Data Display
- **Table**: `Table/` - TanStack Table integration
- **Typography**: `Typography/`
- **Tags**: `Tags/`
- **ImageWithFallback**: `ImageWithFallback/`

#### Feedback Components
- **Alert**: `Alert/`
- **Toast**: `Toast/`
- **Modal**: `Modal/`
- **LoadingSpinner**: `LoadingSpinner/`

#### Navigation
- **Breadcrumb**: `Breadcrumb/`
- **Menu**: `Menu/`
- **Tabs**: `Tabs/`
- **Dropdown**: `Dropdown/`

### 3. Authentication Components

**Location**: `src/components/auth/`

- **Login**: `login/login.tsx`
- **Signup**: `signup/signup.tsx`
- **ForgotPassword**: `forgot-password/forgot-password.tsx`
- **ResetPassword**: `reset-password/reset-password.tsx`

## 🎨 Styling Guidelines

### SCSS Module Structure

```scss
// Component-specific styles
.componentName {
  // Base styles
  display: flex;
  align-items: center;
  
  // State styles
  &:hover {
    // Hover effects
  }
  
  &:focus {
    // Focus styles
  }
  
  &:disabled {
    // Disabled state
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  // Variant styles
  &[data-variant="primary"] {
    background-color: var(--primary-color);
    color: white;
  }
  
  // Size styles
  &[data-size="small"] {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
  
  // Responsive styles
  @media (max-width: 768px) {
    // Mobile styles
  }
  
  // Dark theme support
  [data-theme="dark"] & {
    // Dark theme styles
  }
}
```

### CSS Custom Properties

```scss
:root {
  // Color palette
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  
  // Spacing
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 3rem;
  
  // Typography
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  // Border radius
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.375rem;
  --border-radius-lg: 0.5rem;
  
  // Shadows
  --shadow-sm: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  --shadow-md: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 1rem 3rem rgba(0, 0, 0, 0.175);
}

[data-theme="dark"] {
  // Dark theme overrides
  --primary-color: #0d6efd;
  --secondary-color: #adb5bd;
  // ... other dark theme colors
}
```

## 🔧 Component Development Best Practices

### 1. TypeScript Interfaces

```typescript
export interface ComponentProps {
  // Required props
  children: React.ReactNode;
  
  // Optional props with defaults
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  
  // Event handlers
  onClick?: (event: React.MouseEvent) => void;
  onChange?: (value: string) => void;
  
  // HTML attributes
  id?: string;
  'data-testid'?: string;
}
```

### 2. Component Composition

```typescript
// Prefer composition over inheritance
const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <div className={styles.card} {...props}>
      {children}
    </div>
  );
};

// Usage
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

### 3. Custom Hooks

```typescript
// hooks/useComponentState.ts
export const useComponentState = (initialState: any) => {
  const [state, setState] = useState(initialState);
  
  const updateState = useCallback((updates: Partial<typeof initialState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);
  
  return [state, updateState] as const;
};
```

### 4. Error Boundaries

```typescript
// components/common/ErrorBoundary/ErrorBoundary.tsx
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

## 📚 Storybook Integration

### Story Structure

```typescript
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ComponentName from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button Text',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};
```

## 🧪 Testing Guidelines

### Component Testing

```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders with default props', () => {
    render(<ComponentName>Test Content</ComponentName>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<ComponentName onClick={handleClick}>Click Me</ComponentName>);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<ComponentName className="custom-class">Content</ComponentName>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });
});
```

## 🚀 Performance Optimization

### 1. Memoization

```typescript
import React, { memo, useMemo, useCallback } from 'react';

const ComponentName = memo<ComponentProps>(({ children, variant }) => {
  const variantClass = useMemo(() => {
    return getVariantClass(variant);
  }, [variant]);

  const handleClick = useCallback((event: React.MouseEvent) => {
    // Handle click
  }, []);

  return (
    <div className={variantClass} onClick={handleClick}>
      {children}
    </div>
  );
});
```

### 2. Lazy Loading

```typescript
// For heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

This guide provides a comprehensive framework for developing consistent, maintainable, and performant components in the admin theme project. 