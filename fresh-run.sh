#!/bin/bash
cd /Users/osx/Projects/perkos-workshop
WALLET=$(node -e "const{randomBytes}=require('crypto');console.log('0x'+randomBytes(32).toString('hex'))")
echo "PERKOS_PRIVATE_KEY=$WALLET" > .env
node -e "const{privateKeyToAccount}=require('viem/accounts');console.log('Wallet:',privateKeyToAccount('$WALLET').address)"
echo "Fund this wallet with ETH on Base, then run: npx @perkos/cli workshop 7"
