#!/usr/bin/env bash
# Symlink scaffold CLI to ~/bin for global access.
# Run from scaffold-v2/apps/cli-scaffold or scaffold-v2.
# Usage: ./bin/link-global.sh  or  bun run link-global

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PKG_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
RUN_JS="$PKG_DIR/bin/run.js"
BIN_DIR="${HOME}/bin"

if [[ ! -f "$RUN_JS" ]]; then
  echo "Error: bin/run.js not found at $RUN_JS"
  exit 1
fi

mkdir -p "$BIN_DIR"
ln -sf "$RUN_JS" "$BIN_DIR/scaffold"

echo "Linked: $BIN_DIR/scaffold -> $RUN_JS"
echo ""
echo "Ensure $BIN_DIR is in your PATH. Add to ~/.zshrc or ~/.bashrc:"
echo '  export PATH="$HOME/bin:$PATH"'
echo ""
echo "Then run 'scaffold --help' from anywhere (uses Bun, no pre-compilation)."
