---
applyTo: '**'
---

# Project Guidelines for AI Development

## 1. Project Structure Guidelines

### File Organization
- Follow Next.js standard directory structure
- Keep components in `/components` directory (create if needed)
- Place utilities in `/lib` or `/utils` directory
- Store types in `/types` directory or alongside components
- Keep API routes in `/pages/api/` or `/app/api/` (for App Router)
- Place static assets in `/public` directory
- Store styles in `/styles` directory

### Naming Conventions
- Use PascalCase for React components and component files
- Use camelCase for functions, variables, and non-component files
- Use kebab-case for directories when appropriate
- Use descriptive, meaningful names that clearly indicate purpose

### File Structure Best Practices
- Keep related files together in feature-based folders
- Separate concerns: UI components, business logic, and data fetching
- Use index files for clean imports when appropriate
- Group by feature rather than by file type for complex features

## 2. Framework/Language Guidelines (Next.js & TypeScript)

### Next.js Best Practices
- Use App Router when possible (prefer over Pages Router for new features)
- Implement proper SEO with metadata API
- Utilize Next.js Image component for optimized images
- Use dynamic imports for code splitting when appropriate
- Implement proper error boundaries and loading states
- Follow Next.js routing conventions

### TypeScript Standards
- Always use TypeScript for type safety
- Define interfaces for all data structures
- Use strict TypeScript configuration
- Avoid `any` type unless absolutely necessary
- Create reusable type definitions
- Use generic types where appropriate
- Implement proper error handling with typed errors

### Code Quality
- Write self-documenting code with clear variable names
- Add JSDoc comments for complex functions
- Use ESLint and Prettier for consistent formatting
- Follow React best practices (hooks rules, component composition)
- Implement proper prop validation with TypeScript interfaces

## 3. Design Guidelines

### UI/UX Principles
- Follow responsive design principles (mobile-first approach)
- Ensure accessibility compliance (WCAG guidelines)
- Use consistent spacing and typography
- Implement proper color contrast ratios
- Design for multiple screen sizes and devices

### Styling Standards
- Use CSS Modules or styled-components for component-scoped styles
- Follow BEM methodology if using global CSS
- Implement a consistent design system
- Use CSS custom properties for theming
- Ensure styles are maintainable and scalable

### Component Design
- Create reusable, composable components
- Follow single responsibility principle
- Design components to be testable
- Implement proper loading and error states
- Use compound component patterns when appropriate

## 4. Additional Project Guidelines

### Performance
- Optimize bundle size and loading performance
- Implement proper caching strategies
- Use lazy loading for non-critical resources
- Monitor and optimize Core Web Vitals
- Implement proper image optimization

### Security
- Validate all user inputs
- Implement proper authentication and authorization
- Use environment variables for sensitive data
- Follow OWASP security guidelines
- Sanitize data before rendering

### Testing
- Write unit tests for utility functions
- Implement integration tests for critical user flows
- Use TypeScript for test files
- Mock external dependencies appropriately
- Aim for meaningful test coverage

### Documentation
- Maintain up-to-date README files
- Document API endpoints and data structures
- Write clear commit messages
- Document complex business logic
- Keep changelog updated

### Logging Guidelines
Format all logs as structured JSON with consistent field names and ordering for unified parsing and analysis:

**Required Log Structure**:
```json
{
  "timestamp": "2025-08-11T10:30:45.123Z",
  "level": "INFO",
  "service": "my-nextjs-app",
  "correlationId": "req-12345-abcde",
  "message": "User authentication successful",
  "context": {
    "userId": "user123",
    "endpoint": "/api/auth/login"
  }
}
```

**Log Levels** (in order of severity):
- `ERROR`: System errors, exceptions, critical failures
- `WARN`: Warning conditions, deprecated usage, recoverable errors
- `INFO`: General information, successful operations, business events
- `DEBUG`: Detailed diagnostic information for development/troubleshooting

**Field Standards**:
- `timestamp`: ISO 8601 format with milliseconds and UTC timezone
- `level`: Uppercase log level (ERROR/WARN/INFO/DEBUG)
- `service`: Application/service name for identification
- `correlationId`: Unique identifier to trace requests across services
- `message`: Human-readable description of the event
- `context`: Additional structured data relevant to the log entry

**Implementation Guidelines**:
- Use consistent field ordering across all logs
- Include correlation IDs for all request-related logs
- Sanitize sensitive data before logging
- Use structured context objects for additional metadata
- Implement log rotation and retention policies
- Consider log aggregation tools (ELK stack, CloudWatch, etc.)

### Development Workflow
- Use semantic versioning for releases
- Follow Git flow or GitHub flow
- Write descriptive pull request descriptions
- Perform code reviews before merging
- Use conventional commit messages

### Implementation Plan Completion Protocol
When completing an implementation plan using `execute-implementation-plan.prompt.md`:

1. **Status Confirmation Process**:
   - After completing an implementation plan, always confirm the final status in the project README.md
   - Update story status indicators (🟩 COMPLETED, 🟨 IN PROGRESS, ⬜ NOT STARTED, 🟥 BLOCKED)
   - Verify all acceptance criteria have been met

2. **Issue Identification and Resolution**:
   - Ask the user to confirm if there are any issues or problems with the completed implementation
   - If issues are identified, create a dedicated implementation plan for fixing each issue
   - Follow the same implementation planning structure for issue resolution
   - Link issue resolution plans to the original user story for traceability

3. **Documentation Updates**:
   - Update implementation priority lists in README.md
   - Mark completed tasks with appropriate status indicators
   - Document any dependencies or blockers that were resolved
   - Update story dependency diagrams if necessary

4. **Quality Assurance Checklist**:
   - Verify all components are properly implemented according to specifications
   - Confirm responsive design works across all target devices
   - Validate accessibility compliance (WCAG guidelines)
   - Ensure proper error handling and loading states
   - Test integration with existing system components

### Commit Message Guidelines
Follow [Conventional Commits](https://www.conventionalcommits.org/) format with [Gitmojis](https://gitmoji.dev/):

**Format**: `emoji type(scope): description in present tense`

**Examples**:
- `✨ feat(auth): add user authentication system`
- `🐛 fix(api): resolve null pointer exception in user endpoint`
- `📝 docs(readme): update installation instructions`
- `♻️ refactor(components): simplify button component logic`
- `✅ test(utils): add unit tests for date formatter`
- `🎨 style(header): improve responsive layout`
- `⚡ perf(images): optimize image loading performance`
- `🔧 chore(deps): update Next.js to latest version`

**Common Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates
- `perf`: Performance improvements
- `ci`: CI/CD related changes

**Guidelines**:
- Use present tense ("add feature" not "added feature")
- Keep description under 50 characters for the first line
- Add body and footer if needed for complex changes
- Reference issue numbers when applicable
- Use appropriate emoji that matches the change type

### API Design
- Follow RESTful principles for API routes
- Implement proper error handling and status codes
- Use consistent response formats
- Validate request data with schemas
- Implement rate limiting where appropriate

### Environment Management
- Use different configurations for development, staging, and production
- Keep environment variables organized and documented
- Never commit sensitive information to version control
- Use proper deployment strategies
