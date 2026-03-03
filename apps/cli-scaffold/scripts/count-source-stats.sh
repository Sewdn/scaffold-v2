#!/bin/sh
# Count source files and lines. Output: wc -l format (lines + path per file, then "total").
# Usage: count-source-stats.sh [dir]
# Default dir: .
set -e
DIR="${1:-.}"
cd "$DIR" || exit 1

find . -type f \( \
  -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \
  -o -name "*.mjs" -o -name "*.cjs" -o -name "*.json" \
  -o -name "*.md" -o -name "*.mdc" -o -name "*.css" -o -name "*.scss" \
\) \
  ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/dist/*" \
  ! -path "*/build/*" ! -path "*/.next/*" ! -path "*/.turbo/*" \
  ! -path "*/.cache/*" ! -path "*/coverage/*" \
  ! -path "*/.e2e-workspace/*" ! -path "*/.scaffold/*" \
  -print0 2>/dev/null | xargs -0 wc -l 2>/dev/null || true
