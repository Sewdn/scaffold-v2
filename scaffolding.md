## Overview Scaffolding command

### Create a New Project

```bash
scaffold project <name> --apps <app-types>
```

Creates a new monorepo project with the specified name and initial apps. (this project is a consequence of this inital command)

**Parameters:**

- `name`: Name of the project
- `apps`: Comma-separated list of app types to include:
  - `frontend-nextjs`: Next.js web application
  - `frontend-vite`: Vite-based web application
  - `cli`: Command-line interface application
  - `backend`: Backend API service

**Example:**

```bash
scaffold project my-project --apps frontend-nextjs,backend
```

### Add a New App

```bash
scaffold app <name> --type <type>
```

Adds a new application to your existing project.

**Parameters:**

- `name`: Name of the new app
- `type`: Type of application:
  - `frontend-nextjs`: Next.js web application
  - `frontend-vite`: Vite-based web application
  - `cli`: Command-line interface application
  - `backend`: Backend API service

**Example:**

```bash
scaffold app admin-dashboard --type frontend-nextjs
```

### Add a New Package

```bash
scaffold package <name> --type <type>
```

Creates a new package in your monorepo.

**Parameters:**

- `name`: Name of the package
- `type`: Package type:
  - `ui`: UI component library (will be prefixed with `ui-`)
  - `service`: Service package (will be prefixed with `svc-`)

**Example:**

```bash
scaffold package shared-components --type ui
```

### Add a New Service

```bash
scaffold service <name>
```

Creates a new service package with basic setup.

**Parameters:**

- `name`: Name of the service (will be prefixed with `svc-`)

**Example:**

```bash
scaffold service authentication
```

### Add a New Component

```bash
scaffold component <name> --package <package>
```

Adds a new component to a UI package. you can omit the --package flag and first change the cwd to the correct ui package.
Beware! You never add new custom components to the `@workspace/ui` package. This package is reserved for all of the Shadcn/ui building blocks.
After a component was scaffolded, a new directory was created in the `components` directory of the ui package that was selected. This compont directory contains example files to build a well structured presentational components and document its use using storybook stories. Rewrite this example implementation after scaffolding, implementing the component you have in min, but RESPECT THE COMPONENT STRUCTURE AND THE EXAMPLE BEST PRACTICES!

**Parameters:**

- `name`: Name of the component
- `package`: Name of the UI package to add the component to

**Example:**

```bash
scaffold component DataTable --package ui-lib
```

### Add a New Module

```bash
scaffold module <name>
```

Creates a new module that includes both a service and a UI package.

**Parameters:**

- `name`: Name of the module

**Example:**

```bash
scaffold module user-management
```

## Best Practices

1. **Naming Conventions**
   - Use kebab-case for package and app names
   - Use PascalCase for component names
   - Use descriptive, purpose-indicating names

2. **Project Structure**
   - Keep related components in the same UI package
   - Group related services together
   - Use modules for features that require both UI and service components

3. **Component Organization**
   - Place shared components in `ui-lib`
   - Keep app-specific components in their respective apps
   - Use proper file structure within component directories
   - When adding new Shadcn/ui components, always add them in `ui`.

## Examples

### Creating a Full Feature

```bash
# Create a new authentication feature
scaffold module auth
scaffold component LoginForm --package ui-auth
scaffold component RegisterForm --package ui-auth
```

### Setting Up a Dashboard

```bash
# Create dashboard app and components
scaffold app dashboard --type frontend-nextjs
scaffold package dashboard-components --type ui
scaffold component DashboardLayout --package ui-dashboard-components
scaffold component AnalyticsWidget --package ui-dashboard-components
```

## Additional Resources

- Check the project documentation for more detailed information
- Refer to the project roadmap for planned features
- Use `scaffold --help` for command-line help
