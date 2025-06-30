# Code Review Guide for Cursor

## 🎯 Review Objectives

When reviewing React code in this project, systematically evaluate:

1. **Functionality**: Does the code work as intended?
2. **Code Quality**: Is the code clean, readable, and maintainable?
3. **Performance**: Are there optimization opportunities?
4. **Security**: Are there potential security vulnerabilities?
5. **Accessibility**: Is the code accessible to all users?
6. **Testing**: Is the code testable and tested?

## 📋 Review Checklist

### 1. Component Structure
- [ ] **Props Interface**: Well-defined TypeScript interfaces
- [ ] **Default Props**: Sensible defaults for optional props
- [ ] **Prop Validation**: Proper validation and error handling
- [ ] **Component Composition**: Appropriate use of children and composition
- [ ] **Single Responsibility**: Component has a clear, focused purpose

### 2. State Management
- [ ] **Local State**: Appropriate use of `useState` for component state
- [ ] **Server State**: Proper use of React Query for API data
- [ ] **State Updates**: Immutable state updates, proper dependencies
- [ ] **State Sharing**: Appropriate use of context vs prop drilling
- [ ] **State Cleanup**: Proper cleanup in useEffect hooks

### 3. Performance
- [ ] **Memoization**: Appropriate use of `useMemo`, `useCallback`, `React.memo`
- [ ] **Rendering**: Efficient rendering, avoiding unnecessary re-renders
- [ ] **Bundle Size**: Minimal imports, tree shaking opportunities
- [ ] **Lazy Loading**: Code splitting where appropriate
- [ ] **Memory Leaks**: Proper cleanup of subscriptions and timers

### 4. Error Handling
- [ ] **Try-Catch**: Proper error boundaries and error handling
- [ ] **User Feedback**: Clear error messages and loading states
- [ ] **Fallback UI**: Graceful degradation when things fail
- [ ] **Validation**: Client and server-side validation
- [ ] **Error Logging**: Appropriate error logging and monitoring

### 5. Accessibility
- [ ] **Semantic HTML**: Proper use of HTML elements
- [ ] **ARIA Attributes**: Appropriate ARIA labels and roles
- [ ] **Keyboard Navigation**: Full keyboard accessibility
- [ ] **Screen Readers**: Screen reader friendly content
- [ ] **Color Contrast**: Sufficient color contrast ratios

### 6. Security
- [ ] **Input Validation**: Proper validation of user inputs
- [ ] **XSS Prevention**: No direct HTML injection
- [ ] **Authentication**: Proper authentication checks
- [ ] **Authorization**: Appropriate access controls
- [ ] **Sensitive Data**: No secrets in client code

## 🔍 Detailed Review Areas

### Component Review Template

```markdown
## Component: [Component Name]
**File**: `src/components/[path]/[Component].tsx`

### ✅ Strengths
- [List specific strengths]

### ⚠️ Issues Found
1. **Issue Type**: [Description]
   - **Severity**: High/Medium/Low
   - **Impact**: [What this affects]
   - **Suggestion**: [How to fix]

2. **Issue Type**: [Description]
   - **Severity**: High/Medium/Low
   - **Impact**: [What this affects]
   - **Suggestion**: [How to fix]

### 🔧 Recommendations
1. [Specific improvement]
2. [Performance optimization]
3. [Accessibility enhancement]
4. [Code refactoring]

### 📊 Code Quality Score: [X/10]
```

### Hook Review Template

```markdown
## Hook: [Hook Name]
**File**: `src/hooks/[Hook].ts`

### ✅ Strengths
- [List specific strengths]

### ⚠️ Issues Found
1. **Dependency Array**: Missing or incorrect dependencies
2. **Cleanup**: Missing cleanup in useEffect
3. **Error Handling**: Inadequate error handling
4. **Performance**: Unnecessary re-renders or calculations

### 🔧 Recommendations
1. [Fix dependency arrays]
2. [Add proper cleanup]
3. [Improve error handling]
4. [Optimize performance]
```

### Service Review Template

```markdown
## Service: [Service Name]
**File**: `src/services/[Service].ts`

### ✅ Strengths
- [List specific strengths]

### ⚠️ Issues Found
1. **Error Handling**: Inadequate error handling
2. **Type Safety**: Missing or incorrect types
3. **API Design**: Inconsistent API patterns
4. **Caching**: Missing or incorrect caching strategies

### 🔧 Recommendations
1. [Improve error handling]
2. [Add proper TypeScript types]
3. [Standardize API patterns]
4. [Implement proper caching]
```

## 🚨 Common Issues & Solutions

### 1. Missing Dependencies in useEffect
```typescript
// ❌ Bad
useEffect(() => {
  fetchData(id);
}, []); // Missing 'id' dependency

// ✅ Good
useEffect(() => {
  fetchData(id);
}, [id]); // Include all dependencies
```

### 2. Inefficient Re-renders
```typescript
// ❌ Bad
const Component = ({ data }) => {
  const processedData = data.map(item => expensiveOperation(item));
  return <div>{processedData}</div>;
};

// ✅ Good
const Component = ({ data }) => {
  const processedData = useMemo(() => 
    data.map(item => expensiveOperation(item)), 
    [data]
  );
  return <div>{processedData}</div>;
};
```

### 3. Missing Error Boundaries
```typescript
// ❌ Bad
const Component = () => {
  const { data, error } = useQuery(['data'], fetchData);
  if (error) throw error; // This will crash the app
  return <div>{data}</div>;
};

// ✅ Good
const Component = () => {
  const { data, error, isLoading } = useQuery(['data'], fetchData);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  return <div>{data}</div>;
};
```

### 4. Accessibility Issues
```typescript
// ❌ Bad
<button onClick={handleClick}>Click me</button>

// ✅ Good
<button 
  onClick={handleClick}
  aria-label="Submit form"
  aria-describedby="form-description"
>
  Submit
</button>
```

## 📊 Review Metrics

### Code Quality Metrics
- **TypeScript Coverage**: Percentage of typed code
- **Test Coverage**: Percentage of tested code
- **Complexity**: Cyclomatic complexity score
- **Duplication**: Code duplication percentage
- **Documentation**: Documentation coverage

### Performance Metrics
- **Bundle Size**: JavaScript bundle size impact
- **Render Time**: Component render performance
- **Memory Usage**: Memory consumption patterns
- **Network Requests**: API call efficiency

### Security Metrics
- **Vulnerability Scan**: Security vulnerability count
- **Input Validation**: Validation coverage
- **Authentication**: Authentication implementation quality
- **Authorization**: Authorization coverage

## 🔧 Review Prompts

### Component Review
```
Review the React component at [file_path] and provide:
1. Code quality assessment (1-10 scale)
2. List of issues found with severity levels
3. Performance optimization opportunities
4. Accessibility improvements needed
5. Security considerations
6. Specific recommendations for improvement
```

### Hook Review
```
Review the custom hook at [file_path] and provide:
1. Hook design and implementation quality
2. Dependency management analysis
3. Error handling assessment
4. Performance implications
5. Reusability and testing considerations
6. Suggested improvements
```

### Service Review
```
Review the service at [file_path] and provide:
1. API design and consistency
2. Error handling and type safety
3. Caching and performance strategies
4. Security and validation
5. Testing and documentation needs
6. Refactoring recommendations
```

### Folder Review
```
Review the folder structure at [folder_path] and provide:
1. File organization and naming conventions
2. Component relationships and dependencies
3. Code duplication analysis
4. Testing coverage assessment
5. Documentation gaps
6. Refactoring opportunities
```

## 📈 Review Output Format

### Summary Report
```markdown
## Code Review Summary

### Overall Assessment
- **Quality Score**: [X/10]
- **Critical Issues**: [Number]
- **High Priority**: [Number]
- **Medium Priority**: [Number]
- **Low Priority**: [Number]

### Key Findings
1. [Most important finding]
2. [Second most important finding]
3. [Third most important finding]

### Recommendations
1. [Top priority recommendation]
2. [Second priority recommendation]
3. [Third priority recommendation]

### Next Steps
1. [Immediate action needed]
2. [Short-term improvements]
3. [Long-term considerations]
```

This comprehensive review guide ensures thorough evaluation of React code for quality, performance, security, and maintainability. 