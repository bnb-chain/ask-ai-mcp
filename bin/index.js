#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const MCP_URL = 'https://api.superintern.ai/agent/async/mcp/mcp';
const SKILLS_SRC = path.join(__dirname, '..', 'skills');

const HELP = `
Usage: npx @bnb-chain/ask-ai-mcp <command> [options]

Commands:
  skills add           Install BNBChain AI skills into your Claude Code project
  skills add --global  Install skills globally (~/.claude/skills/)

Options:
  --help               Show this help message

Examples:
  npx @bnb-chain/ask-ai-mcp skills add
  npx @bnb-chain/ask-ai-mcp skills add --global
`;

const MCP_CONFIG = {
  "ask-ai-mcp": {
    "type": "sse",
    "url": MCP_URL
  }
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copySkills(targetDir) {
  ensureDir(targetDir);
  const files = fs.readdirSync(SKILLS_SRC);
  const copied = [];
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const src = path.join(SKILLS_SRC, file);
    const dest = path.join(targetDir, file);
    fs.copyFileSync(src, dest);
    copied.push(file);
  }
  return copied;
}

function upsertMcpConfig(settingsPath) {
  let settings = {};
  if (fs.existsSync(settingsPath)) {
    try { settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8')); }
    catch { /* leave empty */ }
  }
  settings.mcpServers = settings.mcpServers || {};
  Object.assign(settings.mcpServers, MCP_CONFIG);
  ensureDir(path.dirname(settingsPath));
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n');
}

function skillsAdd(global) {
  const base = global ? path.join(os.homedir(), '.claude') : path.join(process.cwd(), '.claude');
  const skillsDir = path.join(base, 'skills');
  const settingsPath = path.join(base, global ? 'settings.json' : 'settings.json');

  console.log(`\n📦 Installing BNBChain AI skills...`);

  const copied = copySkills(skillsDir);
  if (copied.length === 0) {
    console.error('No skill files found in package. Please re-install.');
    process.exit(1);
  }
  console.log(`✅ Installed ${copied.length} skill(s) to ${skillsDir}:`);
  copied.forEach(f => console.log(`   • ${f}`));

  upsertMcpConfig(settingsPath);
  console.log(`✅ Configured ask-ai-mcp in ${settingsPath}`);

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 BNBChain Ask AI MCP is ready!

 MCP endpoint : ${MCP_URL}
 Skills dir   : ${skillsDir}

 In Claude Code, run:
   /ask-bnbchain What is BEP-20?
   /ask-bnbchain How do I bridge tokens to BNB Chain?

 Or enable the MCP in your IDE config — see README for details:
 https://github.com/bnb-chain/ask-ai-mcp
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

// ── CLI entry ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.includes('--help') || args.length === 0) {
  console.log(HELP);
  process.exit(0);
}

if (args[0] === 'skills' && args[1] === 'add') {
  const global = args.includes('--global');
  skillsAdd(global);
} else {
  console.error(`Unknown command: ${args.join(' ')}`);
  console.log(HELP);
  process.exit(1);
}
