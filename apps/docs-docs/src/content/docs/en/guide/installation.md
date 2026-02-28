---
title: Installation
description: How to install scaffold-v2
---

# Installation Guide

This guide will walk you through the installation process for scaffold-v2.

## Prerequisites

Before installing scaffold-v2, make sure you have the following prerequisites:

- Node.js v18 or higher
- Bun 1.0 or higher
- Git

## Installation Options

### Option 1: Using NPM

```bash
npm install -g @scaffold-v2/cli
```

### Option 2: Using Bun

```bash
bun install -g @scaffold-v2/cli
```

### Option 3: Manual Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/scaffold-v2.git
   ```

2. Navigate to the project directory:

   ```bash
   cd scaffold-v2
   ```

3. Install dependencies:

   ```bash
   bun install
   ```

4. Build the project:

   ```bash
   bun run build
   ```

5. Link the CLI globally:
   ```bash
   bun link
   ```

## Verifying Installation

To verify that scaffold-v2 is installed correctly, run:

```bash
scaffold-v2 --version
```

You should see the version number displayed in your terminal.

## Next Steps

Now that you have scaffold-v2 installed, you can:

- [Learn the basics](/en/guide/quick-start)
- [Create your first project](/en/guide/create-project)
- [Explore the API reference](/en/api/index)

If you encounter any issues during installation, please check the [Troubleshooting Guide](/en/reference/troubleshooting) or reach out to our support team.
