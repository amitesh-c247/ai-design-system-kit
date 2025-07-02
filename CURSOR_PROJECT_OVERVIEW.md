# Frontend Admin Theme 2025 - Project Overview

## 🏗️ Architecture Overview

This is a **Next.js 15** admin dashboard template built with modern React patterns and a comprehensive component library. The project follows a modular architecture with clear separation of concerns.

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **UI Library**: React Bootstrap + Custom SCSS components
- **State Management**: TanStack Query (React Query) for server state
- **Authentication**: Custom auth service with cookie-based tokens
- **Internationalization**: next-intl for multi-language support
- **Styling**: SCSS modules + Bootstrap 5 + next-themes for dark/light mode
- **Form Handling**: React Hook Form with Yup/Zod validation
- **Icons**: Lucide React
- **TypeScript**: Full type safety throughout the application

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication route group
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── (view)/            # Protected dashboard routes
│   │   ├── dashboard/
│   │   ├── users/
│   │   └── profile/
│   ├── layout.tsx         # Root layout with providers
│   └── providers.tsx      # Global providers (Query, Theme)
├── components/            # Reusable UI components
│   ├── common/           # Shared components (Button, Card, Form, etc.)
│   ├── auth/             # Authentication components
│   ├── header-sidebar/   # Layout components
│   └── Profile/          # Feature-specific components
├── hooks/                # Custom React hooks
├── services/             # API service layer
├── utils/                # Utility functions
├── constants/            # App constants and validation schemas
├── locales/              # Internationalization files
└── i18n/                 # i18n configuration
```

## 🔧 Key Features

### Authentication System
- **JWT-based authentication** with cookie storage
- **Protected routes** with automatic redirects
- **User session management** with React Query
- **Logout functionality** with cache clearing

### Component Library
- **Bootstrap-based components** with custom styling
- **Storybook integration** for component documentation
- **TypeScript interfaces** for all component props
- **Responsive design** with mobile-first approach

### State Management
- **TanStack Query** for server state management
- **React Query DevTools** for debugging
- **Optimistic updates** and error handling
- **Cache invalidation** strategies

### Internationalization
- **next-intl** for multi-language support
- **Locale-based routing** with Next.js App Router
- **Structured translation files** by feature

### Theme System
- **Dark/Light mode** with next-themes
- **CSS custom properties** for theming
- **Bootstrap theme integration**
- **System preference detection**

## 🎨 Design System

### Component Categories
1. **Layout Components**: Header, Sidebar, CardWrapper
2. **Form Components**: Input, Select, Checkbox, Form validation
3. **Navigation**: Breadcrumb, Menu, Tabs
4. **Feedback**: Alert, Toast, Modal, LoadingSpinner
5. **Data Display**: Table, Typography, Tags
6. **Interactive**: Button, Dropdown, Drawer, Collapse

### Styling Approach
- **SCSS modules** for component-specific styles
- **Bootstrap utilities** for layout and spacing
- **CSS custom properties** for theme variables
- **Responsive breakpoints** following Bootstrap grid

## 🚀 Development Workflow

### Code Organization
- **Feature-based structure** for pages and components
- **Shared utilities** in dedicated folders
- **Type definitions** co-located with components
- **Service layer** for API communication

### Best Practices
- **TypeScript strict mode** enabled
- **ESLint configuration** for code quality
- **Component composition** over inheritance
- **Custom hooks** for reusable logic
- **Error boundaries** for graceful error handling

## 📦 Dependencies

### Core Dependencies
- `next@15.3.3` - React framework
- `react@18` - UI library
- `@tanstack/react-query@5.80.7` - Server state management
- `react-bootstrap@2.10.10` - UI component library
- `next-intl@4.1.0` - Internationalization
- `next-themes@0.4.6` - Theme management

### Development Dependencies
- `typescript@5` - Type safety
- `sass@1.89.2` - CSS preprocessing
- `eslint@8` - Code linting
- `@storybook/*` - Component documentation

## 🔐 Security Features

- **CSRF protection** with secure cookies
- **XSS prevention** with proper content sanitization
- **Authentication token** management
- **Route protection** with middleware
- **Input validation** with Yup/Zod schemas

## 📱 Responsive Design

- **Mobile-first approach** with Bootstrap grid
- **Collapsible sidebar** for mobile devices
- **Touch-friendly interactions**
- **Progressive enhancement** strategy

## 🌐 Internationalization

- **Locale-based routing** (`/en/dashboard`, `/es/dashboard`)
- **Translation files** organized by feature
- **RTL support** ready
- **Date and number formatting** per locale

This project serves as a comprehensive foundation for building modern admin dashboards with enterprise-grade features and maintainable code architecture. 