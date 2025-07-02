# Cursor Rules & Conventions

## 1. Code Style
- **Language**: TypeScript (strict mode)
- **Formatting**: Prettier and ESLint enforced
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JS/TS, double quotes for JSON
- **Semicolons**: Always required
- **Imports**: Absolute imports from `@/` for `src/` root
- **Component Naming**: PascalCase for components, camelCase for functions/variables
- **File Naming**: kebab-case for files, PascalCase for React components
- **SCSS Modules**: Use `.module.scss` for component styles

## 2. Folder Structure
- **Feature-based**: Group files by feature when possible
- **Common Components**: Place in `src/components/common/`
- **Auth Components**: Place in `src/components/auth/`
- **Hooks**: Place in `src/hooks/`
- **Services**: Place in `src/services/`
- **Utils**: Place in `src/utils/`
- **Constants**: Place in `src/constants/`
- **Locales**: Place in `src/locales/`

## 3. Component Conventions
- **Props**: Always use TypeScript interfaces for props
- **Default Props**: Provide sensible defaults
- **Children**: Use `children` prop for nested content
- **Styling**: Use SCSS modules, avoid global styles
- **Accessibility**: Add `aria-*` attributes and roles where appropriate
- **Testing**: Add tests in `__tests__` or alongside components

## 4. API & State
- **API Calls**: Use the centralized `api` utility
- **React Query**: Use for all server state
- **Mutations**: Use optimistic updates where possible
- **Error Handling**: Use global error handler for API errors

## 5. Internationalization
- **Use `next-intl`** for all user-facing strings
- **Organize translations** by feature in `src/locales/en/`

## 6. Commit & Review
- **Commits**: Use Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)
- **Pull Requests**: Reference related issues, describe changes clearly
- **Reviews**: Require at least one approval before merging
- **No direct pushes to `master`**

## 7. Miscellaneous
- **No secrets in code**
- **Environment variables** in `.env.local` only
- **No unused dependencies**
- **Remove dead code** before merging

---

These rules ensure code quality, maintainability, and consistency across the project. 