# React Patterns Guide for Cursor

## 🎯 Pattern Recognition

This guide helps identify and implement React patterns for better code organization, performance, and maintainability in this admin dashboard project.

## 🏗️ Component Patterns

### 1. Compound Components
```typescript
// ✅ Good Pattern
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
} = ({ children, className }) => (
  <div className={`card ${className}`}>{children}</div>
);

Card.Header = ({ children, className }) => (
  <div className={`card-header ${className}`}>{children}</div>
);

Card.Body = ({ children, className }) => (
  <div className={`card-body ${className}`}>{children}</div>
);

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

### 2. Render Props Pattern
```typescript
// ✅ Good Pattern
interface DataFetcherProps<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  children: (data: T | undefined, isLoading: boolean, error: Error | null) => React.ReactNode;
}

const DataFetcher = <T,>({ queryKey, queryFn, children }: DataFetcherProps<T>) => {
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
  });
  
  return <>{children(data, isLoading, error)}</>;
};

// Usage
<DataFetcher
  queryKey={['users']}
  queryFn={userService.getUsers}
>
  {(users, isLoading, error) => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage error={error} />;
    return <UserList users={users} />;
  }}
</DataFetcher>
```

### 3. Higher-Order Components (HOC)
```typescript
// ✅ Good Pattern
interface WithLoadingProps {
  isLoading: boolean;
}

const withLoading = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P & WithLoadingProps) => {
    const { isLoading, ...componentProps } = props;
    
    if (isLoading) {
      return <LoadingSpinner />;
    }
    
    return <Component {...(componentProps as P)} />;
  };
};

// Usage
const UserListWithLoading = withLoading(UserList);
<UserListWithLoading users={users} isLoading={isLoading} />
```

## 🎣 Hook Patterns

### 1. Custom Hook Composition
```typescript
// ✅ Good Pattern
export const useUserManagement = (userId: number) => {
  const { data: user, isLoading, error } = useUserQuery(userId);
  const updateUserMutation = useUpdateUserMutation();
  const deleteUserMutation = useDeleteUserMutation();
  
  const updateUser = useCallback((data: UpdateUserData) => {
    return updateUserMutation.mutateAsync({ id: userId, data });
  }, [userId, updateUserMutation]);
  
  const deleteUser = useCallback(() => {
    return deleteUserMutation.mutateAsync(userId);
  }, [userId, deleteUserMutation]);
  
  return {
    user,
    isLoading,
    error,
    updateUser,
    deleteUser,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
  };
};
```

### 2. Async Hook Pattern
```typescript
// ✅ Good Pattern
export const useAsync = <T, E = Error>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
    } catch (err) {
      setError(err as E);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
};
```

### 3. Form Hook Pattern
```typescript
// ✅ Good Pattern
export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema: Yup.Schema<T>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isValidating, setIsValidating] = useState(false);

  const validate = useCallback(async (fieldValues: T = values) => {
    setIsValidating(true);
    try {
      await validationSchema.validate(fieldValues, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationError) {
      const newErrors: Partial<Record<keyof T, string>> = {};
      (validationError as Yup.ValidationError).inner.forEach((error) => {
        if (error.path) {
          newErrors[error.path as keyof T] = error.message;
        }
      });
      setErrors(newErrors);
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [values, validationSchema]);

  const handleChange = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (onSubmit: (values: T) => void) => {
    const isValid = await validate();
    if (isValid) {
      onSubmit(values);
    }
  }, [validate, values]);

  return {
    values,
    errors,
    isValidating,
    handleChange,
    handleSubmit,
    validate,
  };
};
```

## 🔄 State Management Patterns

### 1. Context Pattern with Reducer
```typescript
// ✅ Good Pattern
interface AppState {
  theme: 'light' | 'dark';
  user: User | null;
  notifications: Notification[];
}

type AppAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_USER'; payload: User | null' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    case 'REMOVE_NOTIFICATION':
      return { 
        ...state, 
        notifications: state.notifications.filter(n => n.id !== action.payload) 
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
```

### 2. Local State with Custom Hook
```typescript
// ✅ Good Pattern
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};
```

## 🎨 Styling Patterns

### 1. CSS-in-JS Pattern
```typescript
// ✅ Good Pattern
interface StyledComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const StyledButton = styled.button<StyledComponentProps>`
  padding: ${({ size }) => {
    switch (size) {
      case 'small': return '0.5rem 1rem';
      case 'large': return '1rem 2rem';
      default: return '0.75rem 1.5rem';
    }
  }};
  
  background-color: ${({ variant, disabled }) => {
    if (disabled) return '#e5e7eb';
    switch (variant) {
      case 'secondary': return '#6b7280';
      default: return '#3b82f6';
    }
  }};
  
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};
  
  &:hover {
    opacity: ${({ disabled }) => disabled ? 0.6 : 0.9};
  }
`;
```

### 2. CSS Modules with Variants
```scss
// ✅ Good Pattern
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  
  // Size variants
  &[data-size="small"] {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  &[data-size="medium"] {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  &[data-size="large"] {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
  
  // Color variants
  &[data-variant="primary"] {
    background-color: var(--primary-color);
    color: white;
    
    &:hover {
      background-color: var(--primary-dark);
    }
  }
  
  &[data-variant="secondary"] {
    background-color: var(--secondary-color);
    color: white;
    
    &:hover {
      background-color: var(--secondary-dark);
    }
  }
  
  // State variants
  &[data-disabled="true"] {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      opacity: 0.6;
    }
  }
}
```

## 🔧 Utility Patterns

### 1. Event Handler Factory
```typescript
// ✅ Good Pattern
export const createEventHandler = <T extends HTMLElement>(
  handler: (event: React.MouseEvent<T>) => void,
  options?: { preventDefault?: boolean; stopPropagation?: boolean }
) => {
  return (event: React.MouseEvent<T>) => {
    if (options?.preventDefault) {
      event.preventDefault();
    }
    if (options?.stopPropagation) {
      event.stopPropagation();
    }
    handler(event);
  };
};

// Usage
const handleClick = createEventHandler(
  () => console.log('Clicked!'),
  { preventDefault: true }
);
```

### 2. Debounced Hook
```typescript
// ✅ Good Pattern
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  if (debouncedSearchTerm) {
    searchUsers(debouncedSearchTerm);
  }
}, [debouncedSearchTerm]);
```

### 3. Intersection Observer Hook
```typescript
// ✅ Good Pattern
export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);

  return isIntersecting;
};

// Usage
const elementRef = useRef<HTMLDivElement>(null);
const isVisible = useIntersectionObserver(elementRef, { threshold: 0.5 });
```

## 📊 Performance Patterns

### 1. Virtual Scrolling Pattern
```typescript
// ✅ Good Pattern
interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const VirtualList = <T,>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
}: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleItemCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItemCount, items.length);
  
  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => 
            renderItem(item, startIndex + index)
          )}
        </div>
      </div>
    </div>
  );
};
```

### 2. Memoization Pattern
```typescript
// ✅ Good Pattern
export const useMemoizedValue = <T>(
  value: T,
  dependencies: React.DependencyList
): T => {
  return useMemo(() => value, dependencies);
};

// Usage with expensive calculations
const expensiveValue = useMemoizedValue(
  computeExpensiveValue(data),
  [data]
);

// Usage with object creation
const memoizedConfig = useMemoizedValue(
  { id, name, settings },
  [id, name, settings]
);
```

## 🔧 Pattern Implementation Prompts

### Component Pattern Implementation
```
Implement the [pattern_name] pattern for the component at [file_path]:
1. Analyze current component structure
2. Identify pattern application opportunities
3. Refactor component to follow the pattern
4. Update related components and tests
5. Document the pattern usage
```

### Hook Pattern Implementation
```
Implement the [pattern_name] hook pattern:
1. Create the custom hook following the pattern
2. Add proper TypeScript types
3. Include error handling and edge cases
4. Add JSDoc documentation
5. Create usage examples
```

### State Management Pattern
```
Implement the [pattern_name] state management pattern:
1. Analyze current state management approach
2. Design the pattern structure
3. Implement the pattern with proper typing
4. Add performance optimizations
5. Update existing components to use the pattern
```

This comprehensive patterns guide ensures consistent, maintainable, and performant React code throughout the project. 