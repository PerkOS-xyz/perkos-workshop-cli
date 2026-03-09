#!/bin/bash
# ============================================
# PerkOS Workshop — Fresh Start
# Limpia todo y reinstala desde cero
# ============================================

set -e

cd /Users/osx/Projects/perkos-workshop

echo ""
echo "  🧹  Limpiando instalacion anterior..."
rm -rf node_modules package-lock.json .env
echo "  ✔  Limpio"

echo ""
echo "  📦  Instalando dependencias..."
npm init -y --silent > /dev/null 2>&1
npm install @perkos/cli dotenv viem --silent 2>/dev/null
echo "  ✔  Dependencias instaladas"

echo ""
echo "  🔑  Generando wallet nueva..."
WALLET=$(node -e "const{randomBytes}=require('crypto');console.log('0x'+randomBytes(32).toString('hex'))")
echo "PERKOS_PRIVATE_KEY=$WALLET" > .env

ADDRESS=$(node -e "const{privateKeyToAccount}=require('viem/accounts');console.log(privateKeyToAccount('$WALLET').address)")
echo "  ✔  Wallet: $ADDRESS"

echo ""
echo "  ✅  Listo para el demo!"
echo ""
echo "  Ejercicios read-only (no necesitan gas):"
echo "    ./demo-1.sh   📡  Discovery"
echo "    ./demo-2.sh   🆔  Identity Lookup"
echo "    ./demo-3.sh   ⭐  Reputation Query"
echo "    ./demo-4.sh   🚀  Agent Onboarding"
echo "    ./demo-5.sh   💸  x402 Payment Flow"
echo "    ./demo-6.sh   🔄  Full End-to-End Flow"
echo "    ./demo-all.sh 🎯  Todos (1-6)"
echo ""
echo "  On-chain (necesita ETH en Base):"
echo "    ./demo-7.sh   ⛓️   Live Agent Registration"
echo ""
echo "  Wallet para fondear (exercise 7):"
echo "    $ADDRESS"
echo "    Enviar ~\$0.01 ETH en Base mainnet"
echo ""
