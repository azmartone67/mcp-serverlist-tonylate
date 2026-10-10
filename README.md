# Model Context Protocol (MCP) ServerList & Interactive Config Generator 🚀

[![Website](https://img.shields.io/badge/🌐_Official_Directory-mcp--serverlist.com-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white)](https://mcp-serverlist.com)
[![1-Click Config Generator](https://img.shields.io/badge/⚡_Config_Generator-1--Click-059669?style=for-the-badge&logo=anthropic&logoColor=white)](https://mcp-serverlist.com/config-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge)](LICENSE)
[![Submit Server](https://img.shields.io/badge/Submit_Server-Instant_Indexing-7c3aed?style=for-the-badge)](https://mcp-serverlist.com/submit)

> An open-source companion catalog and interactive client configuration matrix for the [Model Context Protocol (MCP)](https://modelcontextprotocol.io).  
> **Explore 170+ verified community & official MCP servers** and generate copy-paste ready configuration files in 1 click at **[https://mcp-serverlist.com](https://mcp-serverlist.com)**.

---

## 📑 Contents

- [Why MCP ServerList?](#-why-mcp-serverlist)
- [Interactive 1-Click Config Generator](#-interactive-1-click-config-generator)
- [Client Quickstart Configurations](#-client-quickstart-configurations)
  - [Claude Desktop](#1-claude-desktop-claude_desktop_configjson)
  - [Cursor IDE](#2-cursor-ide-cursormcpjson)
  - [Windsurf](#3-windsurf-mcp_configjson)
  - [Cline / Roo-Code](#4-cline--roo-code)
- [Curated MCP Servers Matrix](#-curated-mcp-servers-matrix)
  - [🛠️ Developer Tools & DevOps](#-developer-tools--devops)
  - [🗄️ Databases & Storage](#️-databases--storage)
  - [🌐 Web Browsing & Search](#-web-browsing--search)
  - [⚡ Productivity & Workspaces](#-productivity--workspaces)
  - [🤖 AI Models, Reasoning & Memory](#-ai-models-reasoning--memory)
- [For MCP Server Developers (Badges & Inclusion)](#-for-mcp-server-developers)
- [Contributing](#-contributing)
- [License](#-license)

---

## 💡 Why MCP ServerList?

Configuring Model Context Protocol servers in local AI clients can be frustrating due to:
1. **JSON formatting and path escaping errors** across Windows, macOS, and Linux.
2. **Missing environment variables** (`API_KEY`, tokens, connection strings).
3. **Scattered documentation** across hundreds of independent GitHub repositories.

**[MCP ServerList (mcp-serverlist.com)](https://mcp-serverlist.com)** solves this by offering:
- 🔍 **Live Search & Filter**: Search 170+ servers by category, transport type (stdio / SSE), and runtime (Node.js, Python, Go).
- ⚡ **1-Click Config Generator**: Visually toggle servers, fill required environment parameters, and download or copy ready-to-run JSON snippets.
- 🛡️ **Verified Health & Compatibility**: Live test status badges and direct links to official repositories.

---

## ⚡ Interactive 1-Click Config Generator

👉 **[Try the Visual Config Generator Online](https://mcp-serverlist.com/config-generator)**

Instead of manually editing JSON files, select the servers you need and get verified configuration snippets instantly for:
- **Claude Desktop**
- **Cursor IDE**
- **Windsurf**
- **Cline (VS Code)**

---

## 🚀 Client Quickstart Configurations

### 1. Claude Desktop (`claude_desktop_config.json`)

**File Location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Desktop",
        "/Users/username/Projects"
      ]
    },
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN"
      }
    }
  }
}
```

---

### 2. Cursor IDE (`.cursor/mcp.json`)

**File Location:** In your project root under `.cursor/mcp.json` or in Cursor Settings > Features > MCP.

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://localhost/mydb"
      ]
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "YOUR_BRAVE_API_KEY"
      }
    }
  }
}
```

---

### 3. Windsurf (`mcp_config.json`)

**File Location:** `~/.codeium/windsurf/mcp_config.json`

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "/path/to/database.db"]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

---

### 4. Cline / Roo-Code

In VS Code Cline extension settings, edit `cline_mcp_settings.json` with the identical `"mcpServers"` object.

---

## 📦 Curated MCP Servers Matrix

Explore the comprehensive and updated index on **[mcp-serverlist.com/category](https://mcp-serverlist.com/category)**.

### 🛠️ Developer Tools & DevOps
| Server Name | Description | Runtime | Quick Install / Run | Details |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub** | Search repositories, manage issues, and inspect PRs. | Node.js | `npx -y @modelcontextprotocol/server-github` | [View on Web](https://mcp-serverlist.com) |
| **Git** | Read, commit, diff, and inspect local Git repositories. | Python | `uvx mcp-server-git` | [View on Web](https://mcp-serverlist.com) |
| **Filesystem** | Secure local file operations with path allowlisting. | Node.js | `npx -y @modelcontextprotocol/server-filesystem` | [View on Web](https://mcp-serverlist.com) |
| **Docker** | Manage containers, images, and compose stacks. | Python | `uvx mcp-server-docker` | [View on Web](https://mcp-serverlist.com) |
| **Kubernetes** | Inspect pods, deployments, and cluster logs. | Go / Python | `uvx mcp-server-kubernetes` | [View on Web](https://mcp-serverlist.com) |
| **Sentry** | Retrieve issue details and error stack traces. | Python | `uvx mcp-server-sentry` | [View on Web](https://mcp-serverlist.com) |

👉 *[Browse all 40+ Developer Tools on MCP ServerList](https://mcp-serverlist.com/category/devtools)*

---

### 🗄️ Databases & Storage
| Server Name | Description | Runtime | Quick Install / Run | Details |
| :--- | :--- | :--- | :--- | :--- |
| **PostgreSQL** | Read-only inspection and querying of Postgres databases. | Node.js | `npx -y @modelcontextprotocol/server-postgres` | [View on Web](https://mcp-serverlist.com) |
| **SQLite** | Query and analyze local SQLite databases with schema inspection. | Python | `uvx mcp-server-sqlite` | [View on Web](https://mcp-serverlist.com) |
| **MySQL** | Inspect and query MySQL / MariaDB databases securely. | Node.js | `npx -y @modelcontextprotocol/server-mysql` | [View on Web](https://mcp-serverlist.com) |
| **Redis** | Key-value store inspection and command execution. | Node.js | `npx -y @modelcontextprotocol/server-redis` | [View on Web](https://mcp-serverlist.com) |
| **Supabase** | Query tables and manage Edge Functions on Supabase. | Node.js | `npx -y @supabase/mcp-server` | [View on Web](https://mcp-serverlist.com) |
| **MongoDB** | Schema exploration and aggregation queries on Mongo collections. | Node.js | `npx -y @mongodb/mcp-server` | [View on Web](https://mcp-serverlist.com) |

👉 *[Browse all 30+ Database Servers on MCP ServerList](https://mcp-serverlist.com/category/database)*

---

### 🌐 Web Browsing & Search
| Server Name | Description | Runtime | Quick Install / Run | Details |
| :--- | :--- | :--- | :--- | :--- |
| **Brave Search** | Real-time web and local search via Brave Search API. | Node.js | `npx -y @modelcontextprotocol/server-brave-search` | [View on Web](https://mcp-serverlist.com) |
| **Puppeteer** | Headless browser automation, scraping, and screenshot capture. | Node.js | `npx -y @modelcontextprotocol/server-puppeteer` | [View on Web](https://mcp-serverlist.com) |
| **Fetch** | Fast web content fetching with automatic Markdown conversion. | Python | `uvx mcp-server-fetch` | [View on Web](https://mcp-serverlist.com) |
| **Playwright** | Full browser automation with multi-tab evaluation. | Node.js | `npx -y @playwright/mcp-server` | [View on Web](https://mcp-serverlist.com) |
| **Firecrawl** | Turn any webpage into clean LLM-ready markdown. | Node.js | `npx -y firecrawl-mcp` | [View on Web](https://mcp-serverlist.com) |

👉 *[Browse all 25+ Web Browsing Servers on MCP ServerList](https://mcp-serverlist.com/category/web-browsing)*

---

### ⚡ Productivity & Workspaces
| Server Name | Description | Runtime | Quick Install / Run | Details |
| :--- | :--- | :--- | :--- | :--- |
| **Slack** | Read channel messages, send updates, and search history. | Node.js | `npx -y @modelcontextprotocol/server-slack` | [View on Web](https://mcp-serverlist.com) |
| **Google Drive** | Search files and read Google Docs / Sheets content. | Node.js | `npx -y @modelcontextprotocol/server-gdrive` | [View on Web](https://mcp-serverlist.com) |
| **Notion** | Search databases and read/write workspace pages. | Node.js | `npx -y @notionhq/mcp-server` | [View on Web](https://mcp-serverlist.com) |
| **Obsidian** | Search and manipulate local Markdown vaults. | Node.js | `npx -y obsidian-mcp` | [View on Web](https://mcp-serverlist.com) |
| **Linear** | Manage issues, cycles, and team roadmaps. | Node.js | `npx -y @linear/mcp-server` | [View on Web](https://mcp-serverlist.com) |

👉 *[Browse all 35+ Productivity Servers on MCP ServerList](https://mcp-serverlist.com/category/productivity)*

---

### 🤖 AI Models, Reasoning & Memory
| Server Name | Description | Runtime | Quick Install / Run | Details |
| :--- | :--- | :--- | :--- | :--- |
| **Sequential Thinking** | Structured dynamic step-by-step problem-solving tool. | Node.js | `npx -y @modelcontextprotocol/server-sequential-thinking` | [View on Web](https://mcp-serverlist.com) |
| **Memory Graph** | Open-source persistent knowledge graph memory for AI agents. | Node.js | `npx -y @modelcontextprotocol/server-memory` | [View on Web](https://mcp-serverlist.com) |
| **Ollama** | Local LLM inference and model interaction via MCP. | Python | `uvx mcp-server-ollama` | [View on Web](https://mcp-serverlist.com) |

---

## 🏷️ For MCP Server Developers

Are you authoring an open-source MCP server? Get discovered by thousands of developers experimenting with Claude Desktop, Cursor, and Windsurf!

### 1. Submit Your Server
Submit your repository for fast indexing on **[mcp-serverlist.com/submit](https://mcp-serverlist.com/submit)**. Free community submissions are reviewed and listed promptly.

### 2. Add the Verified Listing Badge
Show your users that your server is listed and verified on MCP ServerList by adding this badge to your `README.md`:

```markdown
[![Listed on MCP ServerList](https://img.shields.io/badge/Listed%20on-MCP%20ServerList-black?style=flat-square&logo=anthropic)](https://mcp-serverlist.com)
```

**Preview:**  
[![Listed on MCP ServerList](https://img.shields.io/badge/Listed%20on-MCP%20ServerList-black?style=flat-square&logo=anthropic)](https://mcp-serverlist.com)

---

## 🤝 Contributing

We welcome community contributions!
- To propose additions or corrections to this repository, submit a Pull Request.
- To list a brand new MCP server in the live catalog, please use the [Official Submission Portal](https://mcp-serverlist.com/submit).

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).  
Official Portal: [https://mcp-serverlist.com](https://mcp-serverlist.com)
