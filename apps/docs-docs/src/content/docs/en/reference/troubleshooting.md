---
title: Troubleshooting
description: Solutions to common issues with scaffold-v2
---

# Troubleshooting Guide

This guide addresses common issues you might encounter when using scaffold-v2 and provides solutions to help you resolve them.

## Installation Issues

### Command Not Found

If you receive a "command not found" error after installation:

1. Make sure you have installed scaffold-v2 correctly
2. Check that your PATH environment variable includes the global binary directory
3. Try reinstalling with: `bun install -g @scaffold-v2/cli`

### Version Conflicts

If you encounter version conflicts with dependencies:

1. Update to the latest version of scaffold-v2: `bun upgrade -g @scaffold-v2/cli`
2. Clear your bun cache: `bun cache clear`
3. Reinstall the package: `bun install -g @scaffold-v2/cli`

## Project Creation Issues

### Project Creation Fails

If project creation fails:

1. Check that you have sufficient permissions in the directory
2. Ensure there are no files already existing with the same name
3. Verify you have stable internet connection to download dependencies
4. Try using an absolute path: `scaffold project /path/to/my-project`

### Missing Templates

If you encounter missing templates:

1. Update to the latest version of scaffold-v2
2. Ensure your template directories haven't been modified
3. Reinstall scaffold-v2

## Component Generation Issues

### Component Creation Fails

If component creation fails:

1. Verify the UI package exists: `ls packages/`
2. Ensure your component name is in PascalCase
3. Check the project structure to ensure it follows the expected pattern

### Component Import Issues

If you have issues importing generated components:

1. Check the export statements in the component files
2. Verify the package.json has the correct main/module fields
3. Ensure your tsconfig.json has correct path mappings

## Performance Issues

### Slow Scaffolding

If scaffolding is unusually slow:

1. Check your internet connection (for dependencies)
2. Verify system resources (memory and CPU usage)
3. Try using smaller template sets for initial scaffolding

## Still Having Issues?

If you're still experiencing issues after trying these solutions:

1. Check our [GitHub issues](https://github.com/yourusername/scaffold-v2/issues) for similar problems
2. Join our community Discord server for real-time help
3. Submit a new issue with detailed reproduction steps

Remember to include the following information when seeking help:

- scaffold-v2 version (`scaffold --version`)
- Node.js version (`node --version`)
- Bun version (`bun --version`)
- Operating system and version
- Exact command you ran
- Complete error output
