---
title: Quick Start
description: Get started with scaffold-v2 in minutes
---

# Quick Start Guide

This guide will help you get started with scaffold-v2 quickly. We'll cover the basics to help you create your first project in just a few minutes.

## Creating Your First Project

After [installing scaffold-v2](/en/guide/installation), you can create a new project with a simple command:

```bash
scaffold project my-awesome-project
```

This will create a new project with the default structure.

## Adding an Application

You can add different types of applications to your project:

```bash
# Add a frontend Next.js application
scaffold app my-next-app --type frontend-nextjs

# Add a backend application
scaffold app my-backend --type backend

# Add a CLI application
scaffold app my-cli --type cli

# Add a Vite frontend application
scaffold app my-vite-app --type frontend-vite
```

## Creating UI Components

You can easily create UI components for your project:

```bash
# Create a component in the ui-lib package
scaffold component MyButton --package ui-lib
```

## Creating Service Packages

Add service packages to implement backend functionality:

```bash
# Create a service package
scaffold service my-service
```

## Creating Modules

Modules combine UI and service packages:

```bash
# Create a module (generates both UI and service packages)
scaffold module user-management
```

## Next Steps

Now that you've created your first project, you can:

- [Learn about project structure](/en/reference/project-structure)
- [Explore advanced configuration options](/en/reference/configuration)
- [Check out the API reference](/en/api/index)

## Example Project

Here's a complete example of creating a project with multiple components:

```bash
# Create a new project
scaffold project my-ecommerce

# Add applications
scaffold app storefront --type frontend-nextjs
scaffold app admin --type frontend-vite
scaffold app api --type backend

# Add modules
scaffold module products
scaffold module orders
scaffold module customers

# Add components
scaffold component ProductCard --package ui-products
scaffold component OrderList --package ui-orders
```

That's it! You now have a basic understanding of how to use scaffold-v2 to scaffold your projects.
