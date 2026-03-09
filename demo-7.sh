#!/bin/bash
# Exercise 7: Live Agent Registration — Full flow
# Genera wallet → espera funding → ejecuta registro on-chain
cd "$(dirname "$0")"
NODE_NO_WARNINGS=1 node demo-7-flow.js
