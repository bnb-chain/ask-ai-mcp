# Ask AI MCP — BNBChain Knowledge Base

> Bring the entire BNBChain knowledge base into your AI tools in one line of config.

**Ask AI MCP** is a hosted, read-only Model Context Protocol (MCP) server that gives AI assistants and agents instant access to the BNBChain knowledge base — official documentation, BNB Evolution Proposals (BEPs), blog posts, announcements, and developer guides.

```
MCP Endpoint: https://api.superintern.ai/agent/async/mcp/mcp
```

---

## What is it?

| | Ask AI MCP | [bnbchain-mcp](https://github.com/bnb-chain/bnbchain-mcp) |
|---|---|---|
| **Purpose** | Knowledge & documentation Q&A | On-chain execution |
| **Hosting** | Hosted (no setup) | Run locally via npx |
| **Operations** | Read-only | Read + Write (with private key) |
| **Best for** | Research, docs lookup, BEP queries | Transfers, contracts, wallets |

These two MCPs are designed to work **together** — use Ask AI MCP to understand BNBChain concepts, and bnbchain-mcp to act on them.

---

## Quick Start

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "ask-ai-mcp": {
      "type": "sse",
      "url": "https://api.superintern.ai/agent/async/mcp/mcp"
    }
  }
}
```

Restart Claude Desktop. You can now ask BNBChain questions directly in chat.

### Cursor

Open **Settings → MCP** and add:

```json
{
  "ask-ai-mcp": {
    "type": "sse",
    "url": "https://api.superintern.ai/agent/async/mcp/mcp"
  }
}
```

### VS Code (with Copilot / MCP extension)

Add to `.vscode/mcp.json` or your user settings:

```json
{
  "servers": {
    "ask-ai-mcp": {
      "type": "sse",
      "url": "https://api.superintern.ai/agent/async/mcp/mcp"
    }
  }
}
```

### Claude Code (CLI)

Run the installer to configure the MCP and add the `/ask-bnbchain` skill in one step:

```bash
npx @bnb-chain/ask-ai-mcp skills add          # current project
npx @bnb-chain/ask-ai-mcp skills add --global  # all projects
```

Then invoke from any conversation:

```
/ask-bnbchain What is BEP-20?
/ask-bnbchain How do I deploy on opBNB?
```

### Custom MCP Client / AI Agent

```python
# Python
client = MCPClient("https://api.superintern.ai/agent/async/mcp/mcp")
result = await client.call_tool("ask_bnbchain", {"question": "What is BNB Greenfield?"})
```

```typescript
// TypeScript
const client = new MCPClient({ url: "https://api.superintern.ai/agent/async/mcp/mcp" });
const answer = await client.callTool("ask_bnbchain", { question: "How do I stake BNB?" });
```

---

## Available Tools

### `ask_bnbchain`

Semantic search over the BNBChain knowledge base. Returns accurate answers with source links.

| Parameter | Type | Description |
|-----------|------|-------------|
| `question` | `string` | Your question in plain English |

**Example:**
```json
{ "question": "What are the gas fees on opBNB?" }
```
```json
{
  "answer": "opBNB significantly reduces gas fees compared to BSC mainnet...",
  "sources": [
    { "title": "opBNB Overview", "url": "https://docs.bnbchain.org/bnb-opbnb/" }
  ]
}
```

---

## Use Cases

### 1. Enhance Your IDE Experience

When building on BNBChain in Cursor or VS Code, Ask AI MCP gives your AI coding assistant full knowledge of BNBChain without leaving your editor. Instead of switching tabs to search documentation, you get accurate, sourced answers inline as you write code — chain parameters, token standard behaviour, contract API signatures, deployment differences between BSC and opBNB, and more.

- "What EVM opcodes aren't supported on BSC?"
- "How do I verify a contract on BscScan programmatically?"
- "What's the difference between BSC and opBNB for a high-frequency trading dApp?"
- "What are the ABI differences for BEP-20 vs ERC-20?"

### 2. Enrich AI Agents with BNBChain Knowledge

AI agents acting on BNBChain often lack the domain knowledge to make correct decisions. Without grounding, they hallucinate chain IDs, outdated RPC endpoints, wrong staking parameters, or non-existent APIs. Ask AI MCP gives any agent a reliable source of truth for BNBChain — protocol rules, governance proposals, upgrade history, and ecosystem announcements.

Combine with [bnbchain-mcp](https://github.com/bnb-chain/bnbchain-mcp) for a fully autonomous agent that can both **understand** and **act**:

```
Agent: "Research the current BNB staking APR, then stake 1 BNB."

→ ask-ai-mcp:    ask_bnbchain("What is the current BSC staking APR?")
→ bnbchain-mcp:  stake({ amount: "1", validator: "..." })
```

### 3. Smart Contract Development

When writing Solidity for BSC or opBNB, developers need chain-specific knowledge that generic AI tools don't have — precompile addresses, gas pricing models, supported opcodes, system contract interfaces, and cross-chain message formats. Ask AI MCP fills that gap with documentation-backed answers.

- "What precompiles are available on BSC and how do I call them?"
- "What is the correct way to use the cross-chain bridge contract interface?"
- "How does opBNB's gas model differ from Ethereum's EIP-1559?"
- "What are the constraints on contract size on BSC?"

### 4. BEP Governance & Tracking

Teams integrating BNBChain or building on it need to stay ahead of protocol changes introduced through BNB Evolution Proposals. Ask AI MCP lets developers and analysts query any BEP — its status, motivation, technical specification, and impact — without reading through raw GitHub proposals.

- "What does BEP-336 change about BSC gas pricing?"
- "Which BEPs are currently in voting or Draft status?"
- "Summarize all BEPs related to cross-chain communication."
- "What governance process does a BEP go through before going live?"

### 5. Developer Onboarding

New developers joining BNBChain projects face a steep learning curve across BSC, opBNB, and Greenfield. Embedding Ask AI MCP in onboarding tooling, internal wikis, or chatbots lets new team members get accurate answers to foundational questions instantly, reducing time-to-productivity.

- "What is the relationship between BSC, opBNB, and BNB Greenfield?"
- "How does BNB Chain's consensus mechanism work?"
- "What wallets and tools should I set up to develop on BSC?"
- "Where do I find testnet faucets and RPC endpoints?"

### 6. DApp Product & Architecture Decisions

Product teams evaluating whether to build on BSC, opBNB, or Greenfield — or which token standard to adopt, or how to structure cross-chain UX — can use Ask AI MCP to quickly compare options and understand tradeoffs based on up-to-date documentation.

- "Should I deploy on BSC or opBNB for a gaming application?"
- "What are the tradeoffs between using BNB Greenfield vs IPFS for NFT metadata?"
- "How does the BNB Chain ecosystem support account abstraction?"
- "What bridging options exist between opBNB and BSC?"

### 7. Community Bots & Support Tooling

Projects building on BNBChain can embed Ask AI MCP into their Discord bots, Telegram assistants, or support portals to answer user questions about BNBChain concepts automatically — with answers sourced directly from official documentation rather than from model training data that may be stale.

```python
# Discord bot handling a user question
answer = await mcp.call_tool("ask_bnbchain", {
    "question": user_message
})
await channel.send(answer["answer"])
```

### 8. Research & Documentation Q&A

Use Ask AI MCP in Claude Desktop or any MCP-compatible chat interface to explore BNBChain topics conversationally — BEP lookups, staking mechanics, bridging guides, Greenfield storage architecture, validator economics, and ecosystem announcements — with source links for every answer.

---

## Using Both MCPs Together

```json
{
  "mcpServers": {
    "ask-ai-mcp": {
      "type": "sse",
      "url": "https://api.superintern.ai/agent/async/mcp/mcp"
    },
    "bnbchain-mcp": {
      "command": "npx",
      "args": ["@bnb-chain/mcp@latest"]
    }
  }
}
```

| Task | MCP to Use |
|---|---|
| "What is BEP-20?" | ask-ai-mcp |
| "Deploy ERC-20 contract" | bnbchain-mcp |
| "Explain the staking mechanism" | ask-ai-mcp |
| "Stake 1 BNB" | bnbchain-mcp |
| "What BEPs affect token standards?" | ask-ai-mcp |
| "Get my wallet balance" | bnbchain-mcp |

---

## Knowledge Base Coverage

- **BNB Smart Chain (BSC)** — full documentation, guides, and API references
- **opBNB** — L2 documentation, deployment guides, and gas model
- **BNB Greenfield** — storage SDK, architecture, and developer guides
- **BEPs** — all BNB Evolution Proposals (active, draft, final, withdrawn)
- **Blog & Announcements** — ecosystem updates, upgrade notices, ecosystem news
- **Developer FAQs** — common questions from the BNBChain developer community

The knowledge base is continuously updated as BNBChain documentation evolves.

---

## License

MIT © BNB Chain
