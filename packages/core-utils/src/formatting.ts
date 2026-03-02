/**
 * Formatting utilities for converting strings between different case formats.
 */

export const toPascalCase = (input: string): string => {
  if (!input) return '';
  return input
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
};

export const toCamelCase = (input: string): string => {
  if (!input) return '';
  const pascal = toPascalCase(input);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

export const toKebabCase = (input: string): string => {
  if (!input) return '';
  const result = input
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
  return result.replace(/-+/g, '-').replace(/^-+|-+$/g, '');
};

export const isKebabCase = (input: string): boolean =>
  /^[a-z0-9]+(-[a-z0-9]+)*$/.test(input);

export const isPascalCase = (input: string): boolean =>
  /^[A-Z][a-zA-Z0-9]*$/.test(input);
