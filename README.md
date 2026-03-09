# PerkOS ERC-8004 Workshop

Workshop interactivo para demostrar el protocolo ERC-8004 y la economia de agentes trustless usando PerkOS Stack.

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/PerkOS-xyz/perkos-workshop-cli.git
cd perkos-workshop-cli

# 2. Install dependencies
npm install

# 3. Run your first exercise
npx @perkos/cli workshop 1
```

## Quick Start

```bash
# Empezar fresh (limpia todo, reinstala, genera wallet nueva)
./fresh-start.sh

# Correr un ejercicio
./demo-1.sh
```

## Scripts de Demo

### Read-only (no necesitan gas)

| Script | Ejercicio | Descripcion |
|---|---|---|
| `./demo-1.sh` | [Discovery](exercises/01-discovery.md) | Consulta endpoints del agente (health, agent-card, erc-8004, x402, llms.txt) |
| `./demo-2.sh` | [Identity Lookup](exercises/02-identity.md) | Consulta el Identity Registry on-chain en Base mainnet |
| `./demo-3.sh` | [Reputation Query](exercises/03-reputation.md) | Lee reputacion on-chain: score, feedback, clientes unicos |
| `./demo-4.sh` | [Agent Onboarding](exercises/04-onboarding.md) | Solicita paquete de registro via API (tx lista para firmar) |
| `./demo-5.sh` | [x402 Payment Flow](exercises/05-x402-payment.md) | Explora metodos de pago x402 y salud de RPCs |
| `./demo-6.sh` | [Full End-to-End](exercises/06-full-flow.md) | Ciclo completo: Discover > Identity > Reputation > Onboard |
| `./demo-all.sh` | Todos (1-6) | Corre los 6 ejercicios read-only en secuencia |

### On-chain (necesita ETH en Base)

| Script | Ejercicio | Descripcion |
|---|---|---|
| `./demo-7.sh` | [Live Agent Registration](exercises/07-live-registration.md) | Transaccion real en Base mainnet — registra agente + feedback de reputacion |

## Flow para el Demo

### Preparacion

```bash
# Empezar desde cero
./fresh-start.sh
```

Esto hace:
- Limpia `node_modules`, `package-lock.json`, `.env`
- Reinstala dependencias (`@perkos/cli`, `dotenv`, `viem`)
- Genera una wallet nueva y muestra la address

### Ejercicios Read-Only (1-6)

Correr uno por uno durante el demo:

```bash
./demo-1.sh   # Discovery — endpoints del agente
./demo-2.sh   # Identity — registro on-chain
./demo-3.sh   # Reputation — score y feedback
./demo-4.sh   # Onboarding — registro via API
./demo-5.sh   # x402 — pagos HTTP
./demo-6.sh   # End-to-End — todo junto
```

O todos de una vez:

```bash
./demo-all.sh
```

### Ejercicio 7: Live Registration

Solo corre el script — el hace todo:

```bash
./demo-7.sh
```

El script automaticamente:
1. Genera una wallet nueva
2. Muestra la address para fondear
3. Hace polling del balance cada 3 segundos (timeout 5 min)
4. Cuando detecta ETH, ejecuta el registro on-chain

Solo necesitas enviar ~$0.01 ETH en Base a la address que muestra.

### Wallet Nueva (sin reinstalar)

Si solo necesitas generar otra wallet sin limpiar todo:

```bash
./fresh-run.sh
```

## Contratos ERC-8004

Direcciones CREATE2 — mismas en todas las cadenas EVM:

| Contrato | Address |
|---|---|
| Identity Registry | `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432` |
| Reputation Registry | `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63` |

## Stack

- PerkOS Stack: https://stack.perkos.xyz
- Referencia CLI: https://github.com/PerkOS-xyz/PerkOS-Client

## Requisitos

- Node.js 18+
- npm
