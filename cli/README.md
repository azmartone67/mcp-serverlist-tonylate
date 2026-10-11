# mcp-init 🚀

> ⚡ **1-Click Model Context Protocol (MCP) Client Config Generator for Claude Desktop, Cursor, and Windsurf.**  
> Powered by [https://mcp-serverlist.com](https://mcp-serverlist.com) (620+ Curated Servers & 570+ Verified Authors).

[![npm version](https://img.shields.io/badge/npm-v1.0.0-cb3837?style=flat-square&logo=npm)](https://www.npmjs.com/package/mcp-init)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Website](https://img.shields.io/badge/Website-mcp--serverlist.com-indigo?style=flat-square)](https://mcp-serverlist.com)

---

## 💡 Why `mcp-init`?

Manually configuring Model Context Protocol servers in local AI clients is error-prone:
- ❌ **JSON syntax errors** (trailing commas, unescaped path slashes on Windows)
- ❌ **Scattered documentation** across hundreds of independent GitHub repositories
- ❌ **Missing environment variables** (`API_KEY`, credentials, database strings)

`mcp-init` provides a zero-dependency, lightning-fast interactive CLI to configure any client in seconds without typing JSON by hand.

---

## ⚡ Quickstart

Run directly with `npx` (no installation required):

```bash
npx mcp-init
```

The interactive wizard will:
1. 🔍 **Auto-detect your installed AI clients** (Claude Desktop, Cursor IDE, Windsurf, or Cline)
2. 📦 **Offer curated starter packs or search 620+ servers**
3. 🛡️ **Safely merge configurations** with automatic backup of existing files

---

## 🚀 One-Liner Automation Examples

### 1. Configure Claude Desktop with the Developer Pack
```bash
npx mcp-init --client claude --pack dev
```
*Installs PostgreSQL + GitHub + Local Filesystem + Puppeteer.*

### 2. Add PostgreSQL and GitHub to Cursor IDE
```bash
npx mcp-init --client cursor --add postgres,github
```

### 3. Add Web Scraping pack to Windsurf
```bash
npx mcp-init --client windsurf --pack web
```

### 4. Search for any MCP server
```bash
npx mcp-init --search sqlite
```

### 5. Preview JSON without modifying files
```bash
npx mcp-init --client cursor --pack dev --dry-run
```

---

## 📦 Curated Starter Packs

| Pack ID | Name | Included MCP Servers |
| :--- | :--- | :--- |
| `dev` | **🌟 All-in-One Developer Pack** | `postgres`, `github`, `filesystem`, `puppeteer` |
| `web` | **🌐 Web Scraping & Research Pack** | `firecrawl`, `brave-search`, `puppeteer`, `fetch` |
| `db` | **🗄️ Database & Storage Pack** | `postgres`, `sqlite`, `mysql`, `supabase`, `redis` |
| `ai` | **🧠 AI Models & Vector Memory Pack** | `ollama`, `chroma`, `qdrant`, `memory` |
| `prod` | **📝 Productivity & Workspace Pack** | `notion`, `obsidian`, `slack`, `google-drive` |

---

## 📂 Supported Clients & Default Paths

| Client | Configuration Path |
| :--- | :--- |
| **Claude Desktop** | `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)<br>`%APPDATA%\Claude\claude_desktop_config.json` (Windows) |
| **Cursor IDE** | `~/.cursor/mcp.json` |
| **Windsurf Editor** | `~/.codeium/windsurf/mcp_config.json` |
| **Cline / Roo-Code** | `Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json` |

---

## 🌐 Official Web Catalog

Browse all 620+ Model Context Protocol servers visually with live search, tags, and web-based 1-click generator at:  
👉 **[https://mcp-serverlist.com](https://mcp-serverlist.com)**

Official GitHub Matrix:  
👉 **[https://github.com/tonylate520/mcp-serverlist](https://github.com/tonylate520/mcp-serverlist)**

---

## 📄 License

MIT © [MCP ServerList Team](https://mcp-serverlist.com)
