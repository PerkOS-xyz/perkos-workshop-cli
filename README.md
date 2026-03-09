# PerkOS ERC-8004 Workshop CLI

Interactive workshop for the [ERC-8004](https://github.com/PerkOS-xyz/ERC-8004-Workshop) trustless agent economy standard, powered by [PerkOS Stack](https://stack.perkos.xyz).

## What is ERC-8004?

ERC-8004 is an open standard for **on-chain agent identity and reputation**. It enables:

- **Agent Identity** — Every AI agent gets a unique on-chain identity (NFT) via the Identity Registry
- **Portable Reputation** — Transparent, immutable reputation scores that follow agents across platforms
- **x402 Payments** — HTTP-native payment protocol ("like OAuth but for money") using signed USDC transfers
- **CREATE2 Deployment** — Same contract addresses on ALL EVM chains (Base, Ethereum, Polygon, etc.)

This workshop walks through the complete agent lifecycle in 7 exercises — from discovery to live on-chain registration.

## Quick Start

```bash
# Clone this repo
git clone https://github.com/PerkOS-xyz/perkos-workshop-cli.git
cd perkos-workshop-cli

# Install and setup (generates a fresh wallet automatically)
./fresh-start.sh

# Run your first exercise
./demo-1.sh
```

## Exercises

### Read-only (no gas needed)

These exercises query the PerkOS Stack API and on-chain registries — no wallet funding required.

| Script | Exercise | What it does |
|---|---|---|
| `./demo-1.sh` | Discovery | Queries 5 standard agent endpoints: health, agent-card, erc-8004 descriptor, x402 discovery, and llms.txt |
| `./demo-2.sh` | Identity Lookup | Reads the Identity Registry on Base mainnet — verifies CREATE2 address is the same across all EVM chains |
| `./demo-3.sh` | Reputation Query | Fetches on-chain reputation for Agent #1: overall score, feedback count, unique clients, and recent feedback entries |
| `./demo-4.sh` | Agent Onboarding | Calls the Stack API to get a full onboarding package: registration tx, x402 payment config, and registry addresses |
| `./demo-5.sh` | x402 Payment Flow | Lists all 38 supported network/scheme pairs (exact + deferred) and checks RPC health across networks |
| `./demo-6.sh` | Full End-to-End | Combines Discover > Identity > Reputation > Onboard in 4 API calls — the complete agent lifecycle |
| `./demo-all.sh` | All (1-6) | Runs all 6 read-only exercises in sequence |

### On-chain (needs ETH on Base)

| Script | Exercise | What it does |
|---|---|---|
| `./demo-7.sh` | Live Agent Registration | Generates a new wallet, shows a QR code to fund it, polls for incoming ETH, then registers the agent on-chain and mints an AgentIdentity NFT |

## Demo Flow

### 1. Fresh Start

```bash
./fresh-start.sh
```

This script:
- Removes `node_modules/`, `package-lock.json`, and `.env`
- Runs `npm install` to install all dependencies
- Generates a new wallet (private key + address)
- Shows the menu of available demo scripts

### 2. Run Exercises (Read-Only)

Run them one by one for a guided walkthrough:

```bash
./demo-1.sh   # Discovery — 5 agent endpoints
./demo-2.sh   # Identity — on-chain registry lookup
./demo-3.sh   # Reputation — score and feedback
./demo-4.sh   # Onboarding — registration package via API
./demo-5.sh   # x402 — payment protocol and RPC health
./demo-6.sh   # End-to-End — complete lifecycle in 4 calls
```

Or all at once:

```bash
./demo-all.sh
```

Each script shows the CLI command at the top so participants can run it themselves:

```
  ╭──────────────────────────────────────────────╮
  │  Comando:  npx @perkos/cli workshop 3        │
  ╰──────────────────────────────────────────────╯
```

### 3. Live Registration (On-Chain)

```bash
./demo-7.sh
```

This script handles the full flow automatically:

1. **Generates a fresh wallet** — new keypair, saved to `.env`
2. **Shows a QR code** — scan with your phone to send ETH on Base
3. **Polls the balance** — checks every 3 seconds (5 min timeout)
4. **Registers on-chain** — calls `register()` on the Identity Registry
5. **Mints an NFT** — AgentIdentity token is minted to the wallet
6. **Submits reputation** — on-chain feedback to the Reputation Registry

Only needs ~$0.01 ETH on Base for gas.

### Generate New Wallet (without reinstalling)

```bash
./fresh-run.sh
```

## Architecture

```
PerkOS Stack (https://stack.perkos.xyz)
├── /.well-known/agent-card.json    — ERC-8004 agent identity card
├── /.well-known/erc-8004.json      — ERC-8004 descriptor
├── /.well-known/x402-discovery.json — x402 payment discovery
├── /api/health                      — Health check
├── /api/llms.txt                    — LLM-readable agent guide
├── /api/erc8004/identity            — Identity Registry queries
├── /api/erc8004/reputation          — Reputation Registry queries
├── /api/v2/agents/onboard           — Agent registration package
├── /api/v2/x402/supported           — Supported payment networks
└── /api/v2/x402/health              — RPC health across networks
```

## ERC-8004 Contracts

CREATE2 addresses — identical on ALL EVM chains:

| Contract | Address |
|---|---|
| Identity Registry | `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432` |
| Reputation Registry | `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63` |

## References

- **ERC-8004 Workshop** — https://github.com/PerkOS-xyz/ERC-8004-Workshop
- **PerkOS CLI (source)** — https://github.com/PerkOS-xyz/PerkOS-Client
- **PerkOS Stack** — https://stack.perkos.xyz
- **PerkOS** — https://perkos.xyz

## Requirements

- Node.js 18+
- npm
