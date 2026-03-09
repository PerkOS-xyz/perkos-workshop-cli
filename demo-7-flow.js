const { randomBytes } = require("crypto");
const { createPublicClient, http, formatEther } = require("viem");
const { base } = require("viem/chains");
const { privateKeyToAccount } = require("viem/accounts");
const fs = require("fs");
const { execSync } = require("child_process");
const qrcode = require("qrcode-terminal");

const POLL_INTERVAL = 3000; // 3 seconds
const POLL_TIMEOUT = 300000; // 5 minutes

async function main() {
  console.log("");
  console.log("  ╭──────────────────────────────────────────────╮");
  console.log("  │  Comando:  npx @perkos/cli workshop 7        │");
  console.log("  ╰──────────────────────────────────────────────╯");
  console.log("");
  console.log("  ⛓️   Exercise 7: Live Agent Registration");
  console.log("  ─────────────────────────────────────────");
  console.log("");
  console.log("  This exercise registers a NEW agent on Base mainnet.");
  console.log("  It performs real on-chain transactions — not a simulation.");
  console.log("");
  console.log("  What will happen:");
  console.log("    1. Generate a fresh wallet (private key + address)");
  console.log("    2. You fund it with a tiny amount of ETH on Base");
  console.log("    3. The script calls register() on the Identity Registry");
  console.log("    4. An AgentIdentity NFT (ERC-8004) is minted to your wallet");
  console.log("    5. Reputation feedback is submitted on-chain");
  console.log("");

  // Step 1: Generate new wallet
  console.log("  ── Step 1: Generate Wallet ──────────────────────");
  console.log("");
  console.log("  🔑  Creating a new Ethereum keypair...");
  const pk = "0x" + randomBytes(32).toString("hex");
  const account = privateKeyToAccount(pk);
  console.log(`  ✔  Address:     ${account.address}`);
  console.log(`  ✔  Private key: ${pk.slice(0, 10)}...${pk.slice(-6)} (saved to .env)`);
  console.log("");
  console.log("  This wallet is brand new — 0 ETH, no history.");
  console.log("  We need a tiny amount of ETH to pay for gas on Base.");

  // Save to .env
  fs.writeFileSync(".env", `PERKOS_PRIVATE_KEY=${pk}\n`);

  // Step 2: Show QR code and wait for funding
  console.log("");
  console.log("  ── Step 2: Fund the Wallet ──────────────────────");
  console.log("");
  console.log("  📬  Scan this QR code to send ETH on Base:");
  console.log("");

  // Ethereum EIP-681 URI — wallets recognize this as Base transfer
  const ethUri = `ethereum:${account.address}@8453`;
  await new Promise((resolve) => {
    qrcode.generate(ethUri, { small: true }, (code) => {
      // Indent each line of the QR code
      code.split("\n").forEach((line) => console.log(`      ${line}`));
      resolve();
    });
  });

  console.log("");
  console.log(`  Address: ${account.address}`);
  console.log("  Network: Base (chain ID 8453)");
  console.log("  Amount:  ~$0.01 ETH (just gas fees)");
  console.log("");
  console.log("  ⏳  Polling Base RPC for incoming ETH...");
  console.log("      (checking every 3s — will auto-continue when funded)");

  const client = createPublicClient({ chain: base, transport: http() });
  const isTTY = process.stdout.isTTY;

  const start = Date.now();
  let dots = 0;
  let funded = false;

  while (Date.now() - start < POLL_TIMEOUT) {
    const balance = await client.getBalance({ address: account.address });

    if (balance > 0n) {
      if (isTTY) { process.stdout.clearLine(0); process.stdout.cursorTo(0); }
      console.log("  ✅  Funds received! Wallet is ready.");
      funded = true;
      break;
    }

    dots = (dots + 1) % 10;
    const spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    const frame = spinner[dots];
    const elapsed = Math.floor((Date.now() - start) / 1000);
    if (isTTY) {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write(`  ${frame}  Waiting for funds... (${elapsed}s)`);
    }

    await new Promise((r) => setTimeout(r, POLL_INTERVAL));
  }

  if (!funded) {
    console.log("");
    console.log("  ⏰  Timeout — no ETH detected after 5 minutes.");
    console.log("  Fund the wallet and run ./demo-7.sh again.");
    console.log(`  Wallet: ${account.address}`);
    console.log("");
    process.exit(1);
  }

  // Step 3: Register on-chain
  console.log("");
  console.log("  ── Step 3: On-Chain Registration ────────────────");
  console.log("");
  console.log("  Now calling the PerkOS CLI to:");
  console.log("    → Send register() tx to Identity Registry (0x8004...a432)");
  console.log("    → Mint an AgentIdentity NFT to this wallet");
  console.log("    → Submit reputation feedback to Reputation Registry");
  console.log("");
  console.log("  All transactions are on Base mainnet (chain 8453).");
  console.log("  Verify everything on https://basescan.org");
  console.log("");

  try {
    execSync("npx @perkos/cli workshop 7", {
      stdio: "inherit",
      env: { ...process.env, NODE_NO_WARNINGS: "1" },
    });
  } catch (e) {
    process.exit(e.status || 1);
  }

  // Summary
  console.log("");
  console.log("  ── Summary ─────────────────────────────────────");
  console.log("");
  console.log(`  Agent wallet:    ${account.address}`);
  console.log("  Registry:        0x8004A169FB4a3325136EB29fA0ceB6D2e539a432");
  console.log("  Network:         Base mainnet (chain 8453)");
  console.log("  Standard:        ERC-8004 (AgentIdentity)");
  console.log("");
  console.log("  This agent now exists on-chain — permanently.");
  console.log("  Its identity is verifiable by anyone, on any platform.");
  console.log("  No centralized registry. No API keys. Just the blockchain.");
  console.log("");
}

main().catch((err) => {
  console.error("  Error:", err.message);
  process.exit(1);
});
