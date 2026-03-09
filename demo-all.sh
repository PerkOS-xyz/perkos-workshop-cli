#!/bin/bash
# Run all read-only exercises (1-6)
cd "$(dirname "$0")"
echo ""
echo "  ╭──────────────────────────────────────────────╮"
echo "  │  Comando:  npx @perkos/cli workshop all      │"
echo "  ╰──────────────────────────────────────────────╯"
echo ""
NODE_NO_WARNINGS=1 npx @perkos/cli workshop all
