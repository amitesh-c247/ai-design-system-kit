# Cursor Prompt Writing Guide

## ✨ General Principles
- **Be specific**: Clearly state what you want (e.g., 'Add a loading spinner to the Button component').
- **Reference files/folders**: Use exact paths (e.g., `src/components/common/Button/Button.tsx`).
- **Describe context**: Mention related components, hooks, or services if relevant.
- **State intent**: Is this a bug fix, feature, refactor, or documentation update?
- **Request examples**: For new components or APIs, ask for usage examples or Storybook stories.

## 🛠️ Code Generation Prompts
- "Create a new `UserCard` component in `src/components/common/Card/` with props for avatar, name, and email."
- "Add a `danger` variant to the `Button` component."
- "Implement a custom hook `useDebounce` in `src/hooks/` for debouncing input values."

## 🔄 Refactoring Prompts
- "Refactor `src/services/user.ts` to use async/await syntax throughout."
- "Move all SCSS variables to `src/assets/scss/_variables.scss` and import them in all module styles."
- "Split the `Form` component into smaller subcomponents for input, validation, and error display."

## 📝 Documentation Prompts
- "Document the props and usage of `CardWrapper` in a JSDoc comment."
- "Add a README section for setting up internationalization."
- "Write a Storybook story for the `Alert` component with all variants."

## 🐞 Debugging Prompts
- "Why does the `useAuth` hook return `undefined` for `user` after login?"
- "Investigate why the sidebar does not collapse on mobile."
- "Find and fix any accessibility issues in `Modal` component."

## 🧩 Best Practices
- **Use Markdown** for formatting in prompts and documentation.
- **List acceptance criteria** for complex changes.
- **Link related files** or code snippets.
- **Request tests** for new or changed logic.

## 🚦 Example Prompt Template

```markdown
## Intent
Refactor the `Button` component to support a `loading` state with a spinner.

## Files
- `src/components/common/Button/Button.tsx`
- `src/components/common/Button/styles.module.scss`

## Acceptance Criteria
- Button shows spinner when `loading` prop is true
- Button is disabled when loading
- Spinner is accessible (aria attributes)

## Notes
- Follow existing style and variant conventions
```

---

Use this guide to write clear, actionable prompts for Cursor to maximize productivity and code quality. 