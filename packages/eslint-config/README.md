# `@scaffold-v2/eslint-config`

Shared ESLint configuration for the workspace.

## Available Configurations

- `@scaffold-v2/eslint-config/base` - Base configuration for all TypeScript projects
- `@scaffold-v2/eslint-config/next-js` - Configuration for Next.js applications
- `@scaffold-v2/eslint-config/react-internal` - Configuration for internal React libraries

### Enhanced Configurations

Enhanced configurations with additional plugins for code quality and best practices:

- `@scaffold-v2/eslint-config/react-enhanced` - Enhanced React configuration with additional plugins
- `@scaffold-v2/eslint-config/next-enhanced` - Enhanced Next.js configuration with additional plugins

The enhanced configurations include:

- **React Hooks rules** - Enforces Rules of Hooks and dependencies
- **React Performance rules** - Prevents common performance issues in React components
- **SonarJS code quality rules** - Detects code smells and potential bugs
- **Accessibility (jsx-a11y) rules** - Ensures component accessibility

## Usage

### In a Next.js Application

```js
// eslint.config.js
import config from '@scaffold-v2/eslint-config/next-enhanced';

export default config;
```

### In a React Application or Component Library

```js
// eslint.config.js
import config from '@scaffold-v2/eslint-config/react-enhanced';

export default config;
```
