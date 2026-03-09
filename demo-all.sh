#!/bin/bash
# Run all read-only exercises (1-6)
cd /Users/osx/Projects/perkos-workshop
echo ""
echo "  ╭──────────────────────────────────────────────╮"
echo "  │  Comando:  npx @perkos/cli workshop all      │"
echo "  ╰──────────────────────────────────────────────╯"
echo ""
NODE_NO_WARNINGS=1 npx @perkos/cli workshop all
