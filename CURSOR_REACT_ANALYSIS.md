# React Analysis Guide for Cursor

## 🎯 Analysis Objectives

When analyzing React files and folders in this project, focus on:

1. **Component Architecture**: Structure, props, state management
2. **Code Quality**: TypeScript usage, error handling, performance
3. **Best Practices**: React patterns, accessibility, maintainability
4. **Integration**: API calls, routing, internationalization
5. **Styling**: SCSS modules, responsive design, theme support

## 📁 File Structure Analysis

### App Router Pages (`src/app/`)
- **Route Groups**: `(auth)`, `(view)` - analyze layout and protection
- **Page Components**: Check for client/server components, metadata
- **Layout Files**: Analyze providers, global styles, navigation

### Components (`src/components/`)
- **Common Components**: Reusable UI elements with consistent patterns
- **Auth Components**: Authentication forms and flows
- **Layout Components**: Header, sidebar, navigation
- **Feature Components**: Domain-specific components

### Hooks (`src/hooks/`)
- **Custom Hooks**: Business logic, API integration
- **React Query Hooks**: Server state management
- **Utility Hooks**: Reusable logic patterns

### Services (`src/services/`)
- **API Services**: HTTP client integration
- **Business Logic**: Data transformation, validation

## 🔍 Component Analysis Checklist

### 1. Component Structure
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
  // Implementation
};
```

### 2. State Management
- **Local State**: `useState` for component-specific state
- **Server State**: `useQuery`/`useMutation` for API data
- **Global State**: Context providers, React Query cache

### 3. Props Validation
- **TypeScript Interfaces**: Strict typing for all props
- **Default Values**: Sensible defaults for optional props
- **Prop Spreading**: Careful use of `...props`

### 4. Event Handling
- **Callbacks**: Proper typing and error handling
- **Form Handling**: React Hook Form integration
- **Async Operations**: Loading states and error handling

## 🎨 Styling Analysis

### SCSS Module Patterns
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

### CSS Custom Properties
- **Theme Variables**: Consistent color palette
- **Spacing System**: Standardized margins/padding
- **Breakpoints**: Mobile-first responsive design

## 🔗 Integration Analysis

### API Integration
```typescript
// ✅ Good Pattern
const { data, isLoading, error } = useQuery({
  queryKey: ['resource', id],
  queryFn: () => apiService.getResource(id),
  staleTime: 1000 * 60 * 5,
  retry: 3,
});
```

### Routing
- **Next.js App Router**: File-based routing
- **Route Protection**: Authentication guards
- **Dynamic Routes**: Parameter handling

### Internationalization
```typescript
// ✅ Good Pattern
const t = useTranslations('namespace');
return <h1>{t('title')}</h1>;
```

## 🚀 Performance Analysis

### 1. Component Optimization
- **Memoization**: `React.memo`, `useMemo`, `useCallback`
- **Lazy Loading**: `React.lazy`, dynamic imports
- **Code Splitting**: Route-based splitting

### 2. Bundle Analysis
- **Import Optimization**: Tree shaking, side effects
- **Dependency Management**: Minimal, focused imports
- **Asset Optimization**: Images, fonts, CSS

### 3. Runtime Performance
- **Render Optimization**: Virtual scrolling, pagination
- **Memory Management**: Cleanup effects, garbage collection
- **Network Optimization**: Caching, prefetching

## 🛡️ Security Analysis

### 1. Input Validation
- **Form Validation**: Client and server-side validation
- **XSS Prevention**: Proper content sanitization
- **CSRF Protection**: Token-based protection

### 2. Authentication
- **Token Management**: Secure storage and refresh
- **Route Protection**: Authentication guards
- **Session Management**: Proper logout and cleanup

### 3. Data Protection
- **Sensitive Data**: No secrets in client code
- **API Security**: Proper headers and CORS
- **Error Handling**: No sensitive information in errors

## 📊 Code Quality Metrics

### 1. TypeScript Usage
- **Strict Mode**: Full type safety
- **Interface Design**: Consistent prop interfaces
- **Generic Types**: Reusable type definitions

### 2. Error Handling
- **Try-Catch Blocks**: Proper error boundaries
- **User Feedback**: Toast notifications, error messages
- **Fallback UI**: Loading states, error states

### 3. Accessibility
- **ARIA Attributes**: Proper labeling and roles
- **Keyboard Navigation**: Focus management
- **Screen Reader Support**: Semantic HTML

## 🔧 Analysis Prompts

### Component Analysis
```
Analyze the component at [file_path] and provide:
1. Component structure and props interface
2. State management patterns
3. Performance considerations
4. Accessibility features
5. Suggested improvements
```

### Folder Analysis
```
Analyze the folder structure at [folder_path] and provide:
1. File organization and naming conventions
2. Component relationships and dependencies
3. Code duplication and refactoring opportunities
4. Testing coverage and gaps
5. Documentation needs
```

### Integration Analysis
```
Analyze the integration between [component/service] and provide:
1. API integration patterns
2. Error handling strategies
3. Loading state management
4. Data flow and caching
5. Performance optimizations
```

## 📈 Output Format

### Analysis Report Template
```markdown
## Component Analysis: [Component Name]

### Structure
- **Type**: Client/Server Component
- **Props**: [List of props with types]
- **State**: [Local/Server state management]

### Code Quality
- **TypeScript**: [Coverage and type safety]
- **Performance**: [Optimization opportunities]
- **Accessibility**: [ARIA attributes, keyboard support]

### Integration
- **API Calls**: [React Query usage, error handling]
- **Routing**: [Navigation patterns]
- **Styling**: [SCSS modules, responsive design]

### Recommendations
1. [Specific improvement suggestions]
2. [Performance optimizations]
3. [Accessibility enhancements]
4. [Code refactoring opportunities]
```

This guide ensures comprehensive analysis of React files and folders for better code quality and maintainability. 