# Next.js 15 Admin Dashboard Theme

A comprehensive, production-ready admin dashboard template built with **Next.js 15**, **TypeScript**, **React Bootstrap**, and modern development practices. This project features a complete admin interface with authentication, user management, content management, bulk import functionality, and comprehensive error handling.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-7952B3)](https://getbootstrap.com/)

---

## 🚀 **Features**

### **🔐 Authentication System**
- Complete auth flows (login, signup, forgot/reset password)
- JWT token management with automatic refresh
- Route protection and middleware
- User session management with cookies

### **👥 User Management**
- Full CRUD operations for users
- Advanced user filtering and search
- Bulk user import with Excel/CSV support
- Role-based access control

### **📝 Content Management**
- Dynamic CMS for pages and content
- Rich text editor integration
- SEO-friendly content management
- Draft/publish workflow

### **📄 Document Management**
- File upload with drag-and-drop
- Document categorization and search
- File validation and size limits
- Secure file storage

### **📊 Bulk Import System**
- Generic bulk import template
- Excel/CSV file processing
- Real-time validation with error reporting
- Data transformation and mapping
- Progress tracking and rollback support

### **🎨 Modern UI/UX**
- Responsive design with mobile-first approach
- Dark/light theme support
- Accessible components (WCAG compliant)
- Consistent design system
- Loading states and error boundaries

### **🌐 Internationalization**
- Multi-language support with next-intl
- Dynamic locale switching
- Translation management system
- RTL language support ready

---

## 🛠️ **Technology Stack**

### **Core Technologies**
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Runtime**: Node.js 18+

### **Frontend**
- **UI Library**: [React Bootstrap 5.3+](https://react-bootstrap.netlify.app/)
- **Styling**: SCSS Modules with CSS Variables
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG icons
- **State Management**: [TanStack Query v5](https://tanstack.com/query) for server state

### **Forms & Validation**
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Yup](https://github.com/jquense/yup) / [Zod](https://zod.dev/)
- **File Upload**: Custom drag-and-drop components

### **Development & Testing**
- **Documentation**: [Storybook](https://storybook.js.org/)
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)
- **Code Quality**: ESLint, Prettier, TypeScript strict mode

### **Internationalization**
- **Library**: [next-intl](https://next-intl-docs.vercel.app/)
- **Format**: ICU Message Format
- **Supported Languages**: English (default), extensible

---

## 📁 **Project Structure**

```
src/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Authentication routes
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── (view)/             # Main application routes  
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── cms/
│   │   ├── documents/
│   │   ├── faq/
│   │   ├── profile/
│   │   └── bulk-import/
│   │       ├── users/
│   │       └── faq/
│   ├── (web)/              # Public pages
│   ├── api/                # API routes
│   └── globals.css
├── components/             # React components
│   ├── pure-components/    # Reusable UI components (40+)
│   │   ├── Button/
│   │   ├── Table/
│   │   ├── Form/
│   │   ├── FileUpload/
│   │   ├── LoadingSpinner/
│   │   └── ...
│   ├── auth/              # Authentication components
│   ├── header-sidebar/    # Layout components
│   ├── bulk-import/       # Data import system
│   ├── cms/               # Content management
│   ├── documents/         # Document management
│   ├── users/             # User management
│   └── faq/               # FAQ system
├── hooks/                 # Custom React hooks
│   ├── auth.ts           # Authentication hooks
│   ├── user.ts           # User management hooks
│   ├── cms.ts            # CMS hooks
│   ├── documents.ts      # Document hooks
│   └── usePagination.ts  # Pagination utilities
├── services/             # API service layer
│   ├── auth.ts          # Authentication API
│   ├── user.ts          # User management API
│   ├── cms.ts           # CMS API
│   └── documents.ts     # Document API
├── types/               # TypeScript definitions
│   ├── auth.ts         # Authentication types
│   ├── ui.ts           # UI component types
│   ├── cms.ts          # CMS types
│   └── all.ts          # Global types
├── utils/              # Utility functions
│   ├── api.ts         # API client with interceptors
│   ├── cookieService.ts # Cookie management
│   ├── deleteHandler.ts # Delete confirmation utilities
│   └── swal.ts        # Alert utilities
├── constants/          # Application constants
├── locales/           # Internationalization files
│   └── en/           # English translations
│       ├── common.json
│       ├── auth.json
│       ├── dashboard.json
│       └── ...
└── assets/           # Static assets
```

---

## 🏗️ **Getting Started**

### **Prerequisites**
- **Node.js** 18.17+ 
- **npm** 9+ or **yarn** 1.22+
- **Git**

### **1. Installation**

```bash
# Clone the repository
git clone https://github.com/your-org/frontend-admin-theme-2025.git
cd frontend-admin-theme-2025

# Install dependencies
npm install
# or
yarn install
```

### **2. Environment Setup**

Create a `.env.local` file in the root directory:

```bash
# API Configuration
NEXT_PUBLIC_REST_API_ENDPOINT=http://localhost:3001/api
NEXT_PUBLIC_MOCKAPI_BASE_URL=https://your-mockapi-url.mockapi.io/api/v1

# Security
NEXT_PUBLIC_TEXT_ENCRYPT_KEY=your-super-secret-encryption-key-here

# Optional: Analytics & Monitoring
NEXT_PUBLIC_GA_TRACKING_ID=your-google-analytics-id
```

### **3. Development**

```bash
# Start development server
npm run dev
# or
yarn dev

# Open http://localhost:3000
```

### **4. Additional Scripts**

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run tests
npm test

# Run Storybook
npm run storybook

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 🎯 **Architecture & Patterns**

### **Data Flow Pattern**
```
Page Component → Custom Hook → Service Layer → API Client → Backend
     ↓              ↓              ↓             ↓
  UI Logic    React Query    Data Transform   HTTP Layer
```

### **Component Architecture**
- **Pure Components**: Reusable UI components with no business logic
- **Feature Components**: Business logic and data fetching
- **Layout Components**: Headers, sidebars, and page structures
- **Error Boundaries**: Comprehensive error handling

### **State Management**
- **Server State**: TanStack Query for caching and synchronization
- **Client State**: React hooks for UI state
- **Global State**: React Context for theme and auth

### **API Integration**
- **Centralized API Client**: Axios with interceptors
- **Response Handling**: Consistent nested response patterns
- **Error Handling**: Global error handling with user feedback
- **Authentication**: Automatic token management

---

## 📊 **Key Features Deep Dive**

### **🔄 Bulk Import System**
- **Generic Template**: Reusable for any data type
- **Validation Engine**: Row-by-row validation with detailed error reporting
- **Data Transformation**: Type-safe mapping between import and API formats
- **Progress Tracking**: Real-time import progress with success/failure counts
- **Error Recovery**: Detailed error logs with row-level information

### **🔐 Authentication Flow**
- **JWT Management**: Automatic token refresh and storage
- **Route Protection**: Middleware-based route protection
- **Session Handling**: Secure cookie-based session management
- **Error Handling**: Graceful handling of auth failures

### **📝 Content Management**
- **WYSIWYG Editor**: Rich text editing with TipTap
- **SEO Optimization**: Meta tags and structured data
- **Draft System**: Save drafts before publishing
- **Media Management**: Image upload and management

### **🎨 Theming System**
- **CSS Variables**: Dynamic theme switching
- **SCSS Modules**: Component-scoped styling
- **Responsive Design**: Mobile-first with Bootstrap breakpoints
- **Accessibility**: WCAG 2.1 AA compliance

---

## 📚 **Documentation**

### **Comprehensive Development Rules**
This project includes detailed development guidelines in `.cursor/rules/`:

- **🔗 API Integration**: Service patterns, hooks, and error handling
- **📘 TypeScript Standards**: Type patterns, interfaces, and best practices  
- **🏗️ Component Architecture**: Component patterns and organization
- **📁 Project Structure**: File organization and naming conventions
- **💾 Data Management**: CRUD operations, pagination, and transformations
- **🚨 Error Handling**: Error boundaries, validation, and user feedback
- **⚡ Performance**: Optimization strategies and monitoring

### **Storybook Documentation**
```bash
npm run storybook
```
Access component documentation at `http://localhost:6006`

---

## 🧪 **Testing**

### **Test Structure**
```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.test.tsx      # Unit tests
│       └── Button.stories.tsx   # Storybook stories
├── hooks/
│   └── useAuth.test.ts         # Hook tests
└── __tests__/
    └── integration/            # Integration tests
```

### **Testing Commands**
```bash
# Unit tests
npm test

# Integration tests  
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

---

## 🚀 **Deployment**

### **Build & Deploy**
```bash
# Production build
npm run build

# Test production build locally
npm run start
```

### **Deployment Platforms**

#### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### **Other Platforms**
- **Netlify**: Connect your Git repository
- **AWS Amplify**: Use the build settings from `amplify.yml`
- **Docker**: Use the included `Dockerfile`

### **Environment Variables**
Ensure all required environment variables are set in your deployment platform:
- `NEXT_PUBLIC_REST_API_ENDPOINT`
- `NEXT_PUBLIC_MOCKAPI_BASE_URL`
- `NEXT_PUBLIC_TEXT_ENCRYPT_KEY`

---

## 🔧 **Customization**

### **Adding New Features**
1. **Create Types**: Add TypeScript interfaces in `src/types/`
2. **Build Service**: Create API service in `src/services/`
3. **Create Hooks**: Add React Query hooks in `src/hooks/`
4. **Build Components**: Create UI components
5. **Add Routes**: Create pages in `src/app/`

### **Theming**
Customize the theme by modifying CSS variables in `src/app/globals.css`:
```css
:root {
  --primary-color: #your-brand-color;
  --secondary-color: #your-secondary-color;
  /* ... other variables */
}
```

### **Internationalization**
Add new languages:
1. Create language folder: `src/locales/[locale]/`
2. Add translation files: `common.json`, `auth.json`, etc.
3. Update `middleware.ts` with new locale

---

## 📈 **Performance**

### **Built-in Optimizations**
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Regular bundle size monitoring
- **Caching**: TanStack Query caching strategies
- **Lazy Loading**: Dynamic imports for heavy components

### **Performance Monitoring**
- **Core Web Vitals**: Built-in monitoring
- **Error Tracking**: Error boundaries with logging
- **Analytics**: Ready for Google Analytics integration

---

## 🤝 **Contributing**

### **Development Workflow**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow the coding standards in `.cursor/rules/`
4. Write tests for new functionality
5. Ensure all tests pass: `npm test`
6. Create a Pull Request

### **Code Standards**
- Follow TypeScript strict mode
- Use the established component patterns
- Write comprehensive tests
- Update documentation for new features
- Follow the error handling patterns

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Next.js Team** for the amazing framework
- **React Bootstrap** for the UI components
- **TanStack** for the excellent query library
- **TypeScript Team** for type safety
- **Open Source Community** for the incredible ecosystem

---

## 📞 **Support**

- **Documentation**: Check `.cursor/rules/` for detailed development guides
- **Issues**: [GitHub Issues](https://github.com/your-org/frontend-admin-theme-2025/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/frontend-admin-theme-2025/discussions)

---

**Happy Coding! 🚀**
