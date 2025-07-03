// =============================================================================
// TYPE USAGE EXAMPLES
// =============================================================================
// This file contains examples of how to use the types in your components

import React from 'react';
import { 
  // Core types
  ApiResponse,
  Page,
  Pageable,
  BaseEntity,
  
  // Auth types
  User,
  LoginCredentials,
  AuthState,
  
  // CMS types
  PageCreateRequest,
  PageStatus,
  
  // UI types
  ButtonProps,
  TableColumn,
  FormField,
  SelectOption,
  
  // Utility types
  OmitStrict,
  PartialBy,
  RequiredBy
} from './all';
// import { useStandardPagination, useTablePagination } from '../hooks/usePagination';
// import { useUsersQuery } from '../hooks/user';

// =============================================================================
// EXAMPLE 1: API Service with proper typing
// =============================================================================

interface UserService {
  getUsers(params: Pageable<'name' | 'email' | 'createdAt'>): Promise<ApiResponse<Page<User>>>;
  createUser(data: OmitStrict<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<User>>;
  updateUser(id: number, data: PartialBy<User, 'id'>): Promise<ApiResponse<User>>;
}

// =============================================================================
// EXAMPLE 2: Component Props with proper typing
// =============================================================================

interface UserTableProps {
  users: User[];
  loading?: boolean;
  onEdit?: (user: User) => void;
  onDelete?: (userId: number) => void;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

// Define table columns with proper typing
const userTableColumns: TableColumn<User>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    sortable: true,
    width: 80,
  },
  {
    key: 'displayName',
    title: 'Name',
    dataIndex: 'displayName',
    sortable: true,
    render: (value, record) => {
      // In actual JSX: return <div><strong>{record.displayName}</strong><br/><span>{record.email}</span></div>
      return `${record.displayName} (${record.email})`;
    },
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    render: (role) => role.name,
  },
  {
    key: 'isActive',
    title: 'Status',
    dataIndex: 'isActive',
    render: (isActive: boolean) => {
      // In actual JSX: return <span style={{color: isActive ? 'green' : 'red'}}>{isActive ? 'Active' : 'Inactive'}</span>
      return isActive ? 'Active' : 'Inactive';
    },
  },
];

// =============================================================================
// EXAMPLE 3: Form with proper typing
// =============================================================================

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
}

interface UserFormProps {
  initialValues?: Partial<UserFormData>;
  onSubmit: (values: UserFormData) => Promise<void>;
  loading?: boolean;
}

// Form fields with proper typing
const userFormFields: FormField<any>[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
];

// =============================================================================
// EXAMPLE 4: Custom Hook with proper typing
// =============================================================================

interface UseUsersOptions extends Pageable<'name' | 'email' | 'createdAt'> {
  search?: string;
  roleId?: number;
  isActive?: boolean;
}

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  refetch: () => void;
  updateUser: (id: number, data: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

// Custom hook would be implemented like this:
// export function useUsers(options: UseUsersOptions = {}): UseUsersReturn { ... }

// =============================================================================
// EXAMPLE: Using Pagination Hooks (TypeScript patterns)
// =============================================================================

// Example pagination hook usage pattern
interface UsersPageImplementation {
  // 1. Initialize pagination (using any since we can't import the hook in .ts file)
  pagination: any; // ReturnType<typeof useStandardPagination>
  
  // 2. Use in query (using any since we can't import the hook in .ts file)
  query: any; // ReturnType<typeof useUsersQuery>
  
  // 3. Table props configuration
  tableProps: {
    pagination: {
      currentPage: number;
      pageSize: number;
      total: number;
      onChange: (page: number) => void;
      onPageSizeChange: (size: number) => void;
    };
  };
}

// Example implementation pattern:
/*
const UsersPage: React.FC = () => {
  const { params: pagination, setPage, setPageSize, setSearch } = useStandardPagination({
    defaultPageSize: 10,
  });

  const { data, isLoading } = useUsersQuery(
    pagination.page,
    pagination.pageSize,
    pagination.search
  );

  return (
    <Table
      pagination={{
        currentPage: pagination.page,
        pageSize: pagination.pageSize,
        total: data?.total || 0,
        onChange: setPage,
        onPageSizeChange: setPageSize,
      }}
      loading={isLoading}
    />
  );
};
*/

// Advanced table pagination pattern
interface AdvancedTablePaginationPattern {
  // Pagination with sorting and filtering
  params: {
    page: number;
    pageSize: number;
    search: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filters?: Record<string, any>;
  };
  
  // Handler functions
  handlers: {
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setSearch: (search: string) => void;
    updateParams: (params: any) => void;
    resetParams: () => void;
  };
}

// =============================================================================
// EXAMPLE 5: State Management with proper typing
// =============================================================================

interface AppState {
  auth: AuthState;
  users: {
    list: User[];
    loading: boolean;
    error: string | null;
    filters: UseUsersOptions;
  };
  cms: {
    pages: any[]; // Page[] from cms types
    currentPage: any | null; // Page | null from cms types  
    loading: boolean;
    error: string | null;
  };
}

// Actions with proper typing
type AuthAction = 
  | { type: 'AUTH_LOGIN_START' }
  | { type: 'AUTH_LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_LOGIN_ERROR'; payload: { error: string } }
  | { type: 'AUTH_LOGOUT' };

type UserAction =
  | { type: 'USERS_FETCH_START' }
  | { type: 'USERS_FETCH_SUCCESS'; payload: { users: User[]; total: number } }
  | { type: 'USERS_FETCH_ERROR'; payload: { error: string } }
  | { type: 'USERS_UPDATE_FILTERS'; payload: { filters: Partial<UseUsersOptions> } };

// =============================================================================
// EXAMPLE 6: Utility type usage
// =============================================================================

// Create a user without certain fields
type UserCreateData = OmitStrict<User, 'id' | 'createdAt' | 'updatedAt' | 'lastLoginAt'>;

// Make some fields optional
type UserUpdateData = PartialBy<User, 'firstName' | 'lastName' | 'displayName'>;

// Make some fields required
type UserWithRequiredEmail = RequiredBy<Partial<User>, 'email'>;

// Extract specific fields
type UserBasicInfo = Pick<User, 'id' | 'displayName' | 'email'>;

// =============================================================================
// EXAMPLE 7: Generic API Response Handling
// =============================================================================

async function handleApiResponse<T>(
  apiCall: () => Promise<ApiResponse<T>>
): Promise<T> {
  try {
    const response = await apiCall();
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.message || 'API Error');
    }
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Usage:
// const users = await handleApiResponse(() => userService.getUsers({ page: 1, size: 10 }));

// =============================================================================
// EXAMPLE 8: Select Options Creation
// =============================================================================

// Convert users to select options
function usersToSelectOptions(users: User[]): SelectOption[] {
  return users.map(user => ({
    label: user.displayName,
    value: user.id.toString(),
    description: user.email,
  }));
}

// Convert enum to select options
function enumToSelectOptions<T extends Record<string, string>>(
  enumObject: T
): SelectOption[] {
  return Object.entries(enumObject).map(([key, value]) => ({
    label: value,
    value: key,
  }));
}

// Example usage with page statuses
const pageStatusOptions: SelectOption[] = [
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
  { label: 'Archived', value: 'archived' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Pending', value: 'pending' },
];

export {
  // Export interfaces for documentation
  type UserTableProps,
  type UserFormData,
  type UserFormProps,
  type UseUsersOptions,
  type UseUsersReturn,
  type AppState,
  type AuthAction,
  type UserAction,
  type UserCreateData,
  type UserUpdateData,
  type UserWithRequiredEmail,
  type UserBasicInfo,
  
  // Export examples
  userTableColumns,
  userFormFields,
  handleApiResponse,
  usersToSelectOptions,
  enumToSelectOptions,
  pageStatusOptions,
}; 