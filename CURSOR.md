# Cursor Project Analysis & Rules

## 🏗️ Project Architecture Overview

This is a **Next.js 15** admin dashboard with the following architecture:

- **Framework**: Next.js 15 with App Router
- **UI Library**: React Bootstrap + Custom SCSS
- **State Management**: TanStack Query (React Query)
- **Styling**: SCSS Modules + CSS Custom Properties
- **Authentication**: JWT with cookie storage
- **Internationalization**: next-intl
- **TypeScript**: Strict mode enabled

## 📁 Current Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (view)/            # Protected dashboard routes
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # Global providers
├── components/            # React components
│   ├── common/           # Shared UI components
│   ├── auth/             # Auth components
│   └── header-sidebar/   # Layout components
├── hooks/                # Custom React hooks
├── services/             # API services
├── utils/                # Utility functions
├── constants/            # App constants
├── locales/              # i18n files
└── i18n/                 # i18n configuration
```

## 🔧 ESLint Configuration

### Current ESLint Rules
```json
{
  "extends": "next/core-web-vitals",
  "overrides": [
    {
      "files": ["next.config.js"],
      "rules": {
        "@typescript-eslint/no-var-requires": "off"
      }
    }
  ]
}
```

### Recommended ESLint Rules
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/prefer-const": "error",
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",
    "prefer-const": "error",
    "no-var": "error",
    "no-console": "warn"
  },
  "overrides": [
    {
      "files": ["next.config.js"],
      "rules": {
        "@typescript-eslint/no-var-requires": "off"
      }
    }
  ]
}
```

## 🎨 Prettier Configuration

### Recommended Prettier Config
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

## 📁 Folder Structure Rules

### 1. Component Organization
```
src/components/
├── common/              # Shared UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── styles.module.scss
│   │   ├── Button.stories.tsx
│   │   └── index.tsx
│   └── ...
├── auth/                # Authentication components
├── layout/              # Layout components (rename from header-sidebar)
└── features/            # Feature-specific components
```

### 2. File Naming Conventions
- **Components**: PascalCase (`UserCard.tsx`)
- **Files**: kebab-case (`user-card.tsx`)
- **SCSS Modules**: `styles.module.scss`
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`)
- **Services**: camelCase (`authService.ts`)
- **Constants**: camelCase (`validationRules.ts`)

### 3. Import Organization
```typescript
// 1. React and Next.js imports
import React from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { useQuery } from '@tanstack/react-query';
import { Button } from 'react-bootstrap';

// 3. Internal components
import { Card } from '@/components/common/Card';
import { useAuth } from '@/hooks/useAuth';

// 4. Utilities and constants
import { api } from '@/utils/api';
import { EMAIL_REGEX } from '@/constants/regex';

// 5. Styles
import styles from './styles.module.scss';
```

## 🎯 Code Quality Rules

### 1. TypeScript Rules
- **Strict Mode**: Always enabled
- **No `any`**: Use proper types or `unknown`
- **Interface over Type**: Prefer interfaces for object shapes
- **Generic Types**: Use generics for reusable components
- **Union Types**: Use union types for variants

### 2. React Rules
- **Functional Components**: Use functional components with hooks
- **Props Interface**: Always define TypeScript interfaces for props
- **Default Props**: Provide sensible defaults
- **Children Prop**: Use `React.ReactNode` for children
- **Event Handlers**: Proper typing for event handlers

### 3. Component Structure
```typescript
// ✅ Good Pattern
interface ComponentProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Component: React.FC<ComponentProps> = ({
  variant = 'primary',
  children,
  className = '',
  onClick,
}) => {
  // Component logic here
  return (
    <div className={`${styles.component} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Component;
```

## 🎨 Styling Rules

### 1. SCSS Module Structure
```scss
// ✅ Good Pattern
.componentName {
  // Base styles
  display: flex;
  align-items: center;
  
  // Variants
  &[data-variant="primary"] {
    background-color: var(--primary-color);
  }
  
  // States
  &:hover {
    background-color: var(--primary-hover);
  }
  
  // Responsive
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  // Dark theme
  [data-theme="dark"] & {
    background-color: var(--dark-bg);
  }
}
```

### 2. CSS Custom Properties
```scss
:root {
  // Colors
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  
  // Spacing
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  
  // Typography
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
}
```

## 🔧 Architecture Improvements

### 1. Current Issues & Solutions

#### Issue: Inconsistent Component Structure
**Problem**: Some components lack proper TypeScript interfaces
**Solution**: Standardize all components with proper interfaces

#### Issue: Missing Error Boundaries
**Problem**: No global error handling
**Solution**: Implement error boundaries for route groups

#### Issue: Inconsistent API Error Handling
**Problem**: Different error handling patterns across services
**Solution**: Standardize error handling with custom error classes

#### Issue: Missing Loading States
**Problem**: Inconsistent loading state management
**Solution**: Implement standardized loading patterns

### 2. Recommended Improvements

#### A. Add Error Boundary
```typescript
// src/components/common/ErrorBoundary/ErrorBoundary.tsx
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

#### B. Standardize API Error Handling
```typescript
// src/utils/apiError.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new ApiError(error.message, 500);
  }
  
  return new ApiError('An unknown error occurred', 500);
};
```

#### C. Add Loading State Management
```typescript
// src/hooks/useLoadingState.ts
export const useLoadingState = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: loading }));
  }, []);

  const isLoading = useCallback((key: string) => loadingStates[key] || false, [loadingStates]);

  return { setLoading, isLoading };
};
```

### 3. File-by-File Improvements

#### A. `src/app/layout.tsx`
```typescript
// Add error boundary and improve providers
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <ErrorBoundary>
          <NextIntlClientProvider locale={locale} messages={messages[locale]}>
            <Providers>{children}</Providers>
          </NextIntlClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

#### B. `src/hooks/useAuth.ts`
```typescript
// Add better error handling and loading states
export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.replace('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      // Add toast notification here
    },
  });

  // ... rest of the hook
};
```

#### C. `src/components/common/Button/Button.tsx`
```typescript
// Add better accessibility and loading state
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'link';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  children,
  className = '',
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}) => {
  const isDisabled = disabled || loading;
  
  return (
    <BootstrapButton
      variant={variant}
      size={size}
      disabled={isDisabled}
      onClick={onClick}
      className={className}
      type={type}
      aria-label={ariaLabel}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" className="me-2" />}
      {children}
    </BootstrapButton>
  );
};
```

## 🚀 Performance Optimizations

### 1. Code Splitting
```typescript
// Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Use Suspense
<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

### 2. Memoization
```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => 
  computeExpensiveValue(data), 
  [data]
);

// Memoize callbacks
const handleClick = useCallback(() => {
  // Handle click
}, [dependencies]);
```

### 3. React Query Optimization
```typescript
// Optimize query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

## 📊 Testing Strategy

### 1. Unit Tests
```typescript
// src/components/common/Button/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. Integration Tests
```typescript
// src/components/auth/login/__tests__/Login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from '../Login';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

describe('Login', () => {
  it('submits form with correct data', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      // Assert form submission
    });
  });
});
```

## 🔒 Security Considerations

### 1. Input Validation
```typescript
// Use Zod for runtime validation
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginData = z.infer<typeof loginSchema>;
```

### 2. XSS Prevention
```typescript
// Sanitize user input
import DOMPurify from 'dompurify';

const sanitizeHtml = (html: string) => DOMPurify.sanitize(html);
```

### 3. CSRF Protection
```typescript
// Include CSRF token in requests
const headers = {
  'Content-Type': 'application/json',
  'X-CSRF-Token': getCsrfToken(),
};
```

## 📝 Documentation Standards

### 1. JSDoc Comments
```typescript
/**
 * Custom hook for managing user authentication state
 * @param options - Configuration options for the hook
 * @returns Authentication state and methods
 */
export const useAuth = (options?: AuthOptions) => {
  // Implementation
};
```

### 2. README Structure
```markdown
# Component Name

Brief description of the component.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' | 'primary' | Button variant |

## Usage

```tsx
<Button variant="primary" onClick={handleClick}>
  Click me
</Button>
```

## Examples

- Basic usage
- With loading state
- With custom styling
```

This comprehensive guide ensures consistent, maintainable, and high-quality code throughout the project. 