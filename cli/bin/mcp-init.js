#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const os = require("os");

const { c, banner, promptText, promptSelect, promptCheckbox } = require("../lib/ui");
const { getClientPaths } = require("../lib/detectClients");
const { STARTER_PACKS } = require("../lib/starterPacks");
const { saveConfig } = require("../lib/configManager");

const ALL_SERVERS = require("../lib/servers.json");
const VERSION = "1.0.0";

// Fast slug lookup map
const SERVER_MAP = new Map(ALL_SERVERS.map((s) => [s.slug, s]));

// Parameter customization helper
async function customizeServerParams(server, isInteractive) {
  let snippetObj = {};
  try {
    snippetObj = JSON.parse(server.configSnippet);
  } catch {
    snippetObj = { command: "npx", args: ["-y", `@modelcontextprotocol/server-${server.slug}`] };
  }

  if (!isInteractive) return snippetObj;

  // Specific common configurations
  if (server.slug === "filesystem") {
    const defaultDir = path.join(os.homedir(), "Desktop");
    const chosenDir = await promptText(`  📁 Directory path for Filesystem MCP`, defaultDir);
    snippetObj.args = ["-y", "@modelcontextprotocol/server-filesystem", chosenDir];
  } else if (server.slug === "postgres") {
    const defaultUri = "postgresql://user:password@localhost:5432/dbname";
    const chosenUri = await promptText(`  🗄️ PostgreSQL connection URI`, defaultUri);
    snippetObj.args = ["-y", "@modelcontextprotocol/server-postgres", chosenUri];
  } else if (server.slug === "github") {
    const token = await promptText(`  🐙 GitHub Token (Enter to keep placeholder)`, "${GITHUB_TOKEN}");
    snippetObj.env = { GITHUB_PERSONAL_ACCESS_TOKEN: token };
  } else if (server.slug === "brave-search") {
    const key = await promptText(`  🦁 Brave Search API Key (Enter to keep placeholder)`, "${BRAVE_API_KEY}");
    snippetObj.env = { BRAVE_API_KEY: key };
  } else if (server.slug === "firecrawl") {
    const key = await promptText(`  🔥 Firecrawl API Key (Enter to keep placeholder)`, "${FIRECRAWL_API_KEY}");
    snippetObj.env = { FIRECRAWL_API_KEY: key };
  }

  return snippetObj;
}

function showHelp() {
  banner();
  console.log(`
${c.bold}USAGE:${c.reset}
  npx mcp-serverlist [OPTIONS]
  (or: npx mcp-init [OPTIONS])

${c.bold}OPTIONS:${c.reset}
  --client <name>     Target client: claude | cursor | windsurf | cline | local
  --pack <id>         Preset starter pack: dev | web | db | ai | prod
  --add <slugs>       Comma-separated list of MCP slugs to install
  --search <keyword>  Search for MCP servers matching keyword
  --list              List popular curated MCP servers
  --output <file>     Custom config file path
  --dry-run           Print generated JSON without modifying files
  -v, --version       Show version (${VERSION})
  -h, --help          Show this help screen

${c.bold}EXAMPLES:${c.reset}
  ${c.dim}# 1. Interactive wizard (recommended):${c.reset}
  npx mcp-init

  ${c.dim}# 2. 1-Click install Developer Pack into Claude Desktop:${c.reset}
  npx mcp-init --client claude --pack dev

  ${c.dim}# 3. Add PostgreSQL and GitHub servers to Cursor IDE:${c.reset}
  npx mcp-init --client cursor --add postgres,github

  ${c.dim}# 4. Search for database servers:${c.reset}
  npx mcp-init --search postgres

${c.bold}ONLINE DIRECTORY & 1-CLICK GENERATOR:${c.reset}
  Explore 620+ servers visually at ${c.cyan}https://mcp-serverlist.com${c.reset}
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("-h") || args.includes("--help")) {
    showHelp();
    process.exit(0);
  }

  if (args.includes("-v") || args.includes("--version")) {
    console.log(`mcp-init v${VERSION}`);
    process.exit(0);
  }

  // Handle --list
  if (args.includes("--list")) {
    banner();
    console.log(`${c.bold}Top Curated MCP Servers (Sample):${c.reset}\n`);
    ALL_SERVERS.slice(0, 20).forEach((s, idx) => {
      console.log(`  ${c.cyan}${idx + 1}.${c.reset} ${c.bold}${s.name}${c.reset} (${c.yellow}⭐ ${s.githubStars.toLocaleString()}${c.reset})`);
      console.log(`     ${c.dim}${s.tagline.slice(0, 80)}...${c.reset}`);
      console.log(`     ${c.gray}Slug: ${s.slug} | Command: ${s.installCommand}${c.reset}\n`);
    });
    console.log(`Browse all 620+ servers at: ${c.cyan}https://mcp-serverlist.com${c.reset}\n`);
    process.exit(0);
  }

  // Handle --search
  const searchIdx = args.indexOf("--search");
  if (searchIdx !== -1 && args[searchIdx + 1]) {
    const q = args[searchIdx + 1].toLowerCase();
    banner();
    console.log(`${c.bold}Search results for "${q}":${c.reset}\n`);
    const matches = ALL_SERVERS.filter(
      (s) =>
        s.slug.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
    if (matches.length === 0) {
      console.log(`${c.red}No matching MCP servers found.${c.reset}`);
    } else {
      matches.slice(0, 15).forEach((s, idx) => {
        console.log(`  ${c.cyan}${idx + 1}.${c.reset} ${c.bold}${s.name}${c.reset} [${s.category}]`);
        console.log(`     ${c.gray}Slug: ${c.green}${s.slug}${c.gray} | ⭐ ${s.githubStars.toLocaleString()}${c.reset}`);
        console.log(`     ${c.dim}${s.tagline.slice(0, 90)}...${c.reset}\n`);
      });
      console.log(`Found ${matches.length} servers. Install using: ${c.yellow}npx mcp-init --add ${matches[0].slug}${c.reset}\n`);
    }
    process.exit(0);
  }

  // Parse direct arguments
  const clientIdx = args.indexOf("--client");
  const targetClientArg = clientIdx !== -1 ? args[clientIdx + 1] : null;

  const packIdx = args.indexOf("--pack");
  const targetPackArg = packIdx !== -1 ? args[packIdx + 1] : null;

  const addIdx = args.indexOf("--add");
  const targetAddArg = addIdx !== -1 ? args[addIdx + 1] : null;

  const outputIdx = args.indexOf("--output");
  const customOutputPath = outputIdx !== -1 ? args[outputIdx + 1] : null;

  const isDryRun = args.includes("--dry-run");

  banner();

  // 1. Determine Target Client & Path
  const availableClients = getClientPaths();
  let selectedClient = null;

  if (targetClientArg) {
    selectedClient = availableClients.find((c) => c.id.toLowerCase() === targetClientArg.toLowerCase());
    if (!selectedClient) {
      console.log(`${c.red}Unknown client "${targetClientArg}". Choose from: claude, cursor, windsurf, cline, local${c.reset}`);
      process.exit(1);
    }
  } else {
    // Interactive Client Selection
    const clientOptions = availableClients.map((client) => {
      const status = client.exists
        ? `${c.green}(Config file found)${c.reset}`
        : client.appInstalled
        ? `${c.yellow}(App detected)${c.reset}`
        : `${c.dim}(New config)${c.reset}`;
      return {
        ...client,
        name: `${client.name} ${status}`,
        desc: client.configPath,
      };
    });

    selectedClient = await promptSelect("Select target AI client to configure:", clientOptions);
  }

  const targetFilePath = customOutputPath ? path.resolve(customOutputPath) : selectedClient.configPath;

  console.log(`\n${c.dim}Target config file:${c.reset} ${c.bold}${targetFilePath}${c.reset}`);

  // 2. Select MCP Servers
  let chosenServers = [];

  if (targetAddArg) {
    const rawSlugs = targetAddArg.split(/[\s,]+/).map((s) => s.trim().toLowerCase());
    for (const slug of rawSlugs) {
      if (SERVER_MAP.has(slug)) {
        chosenServers.push(SERVER_MAP.get(slug));
      } else {
        console.log(`${c.yellow}Warning: Server slug "${slug}" not found in registry. Skipping.${c.reset}`);
      }
    }
    if (chosenServers.length === 0) {
      console.log(`${c.red}No valid MCP servers specified. Exiting.${c.reset}`);
      process.exit(1);
    }
  } else if (targetPackArg) {
    const pack = STARTER_PACKS.find((p) => p.id === targetPackArg.toLowerCase());
    if (!pack) {
      console.log(`${c.red}Unknown pack "${targetPackArg}". Choose from: dev, web, db, ai, prod${c.reset}`);
      process.exit(1);
    }
    chosenServers = pack.slugs.map((s) => SERVER_MAP.get(s)).filter(Boolean);
  } else {
    // Interactive Selection Mode
    const mode = await promptSelect("How would you like to select MCP servers?", [
      {
        id: "pack",
        name: "🌟 Preset Starter Packs (Recommended)",
        desc: "Curated bundles: Dev, Scraping, DB, AI, Office",
      },
      {
        id: "category",
        name: "📂 Browse by Category",
        desc: "Filter through DevTools, Database, Web, etc.",
      },
      {
        id: "search",
        name: "🔍 Search by Keyword",
        desc: "Quickly find servers by name, database, or tool",
      },
      {
        id: "top",
        name: "⭐ Top Starred MCP Servers",
        desc: "Postgres, GitHub, Puppeteer, Docker, Slack...",
      },
    ]);

    if (mode.id === "pack") {
      const selectedPack = await promptSelect(
        "Choose a curated Starter Pack:",
        STARTER_PACKS.map((p) => ({
          ...p,
          desc: p.desc,
        }))
      );
      chosenServers = selectedPack.slugs.map((s) => SERVER_MAP.get(s)).filter(Boolean);
    } else if (mode.id === "category") {
      const cat = await promptSelect("Select a category:", [
        { id: "dev-tools", name: "🛠️ DevTools & Cloud Infrastructure (119 Servers)" },
        { id: "database", name: "🗄️ Databases & Storage (93 Servers)" },
        { id: "web-browsing", name: "🌐 Web Browsing & Scraping (103 Servers)" },
        { id: "productivity", name: "⚡ Productivity & Workspace (104 Servers)" },
        { id: "communication", name: "💬 Communication & CRM (98 Servers)" },
        { id: "ai-data", name: "🧠 AI Models & Vectors (109 Servers)" },
      ]);
      const catServers = ALL_SERVERS.filter((s) => s.category === cat.id).slice(0, 15);
      chosenServers = await promptCheckbox(`Select servers to add from ${cat.name}:`, catServers, [
        catServers[0].slug,
        catServers[1]?.slug,
      ]);
    } else if (mode.id === "search") {
      const q = await promptText("Enter search term (e.g. postgres, web, redis)");
      const matches = ALL_SERVERS.filter(
        (s) =>
          s.slug.toLowerCase().includes(q.toLowerCase()) ||
          s.name.toLowerCase().includes(q.toLowerCase()) ||
          s.tagline.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 15);

      if (matches.length === 0) {
        console.log(`${c.red}No servers found matching "${q}". Falling back to top servers.${c.reset}`);
        chosenServers = ALL_SERVERS.slice(0, 4);
      } else {
        chosenServers = await promptCheckbox(`Search matches for "${q}":`, matches, [matches[0].slug]);
      }
    } else {
      // Top servers
      const topList = ALL_SERVERS.slice(0, 15);
      chosenServers = await promptCheckbox(
        "Select from top community MCP servers:",
        topList,
        ["postgres", "github", "filesystem", "puppeteer"]
      );
    }
  }

  if (chosenServers.length === 0) {
    console.log(`${c.yellow}No servers selected. Exiting.${c.reset}`);
    process.exit(0);
  }

  // 3. Customize parameters
  console.log(`\n${c.bold}${c.cyan}⚙️  Configuring ${chosenServers.length} MCP server(s)...${c.reset}`);
  const finalServersObj = {};

  const isInteractive = !targetAddArg && !targetPackArg;
  for (const server of chosenServers) {
    console.log(`  • Setting up ${c.bold}${server.name}${c.reset}...`);
    finalServersObj[server.slug] = await customizeServerParams(server, isInteractive);
  }

  // 4. Save or Dry Run
  if (isDryRun) {
    console.log(`\n${c.yellow}--- DRY RUN: Generated mcpServers JSON ---${c.reset}`);
    console.log(JSON.stringify({ mcpServers: finalServersObj }, null, 2));
    console.log(`${c.yellow}--- No files were modified ---${c.reset}\n`);
    process.exit(0);
  }

  const result = saveConfig(targetFilePath, finalServersObj);

  // 5. Final Output & Growth Banner
  console.log(`\n${c.bold}${c.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);
  console.log(`${c.bold}${c.green}✅ CONFIGURATION SUCCESSFUL!${c.reset}`);
  console.log(`${c.bold}${c.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}\n`);

  console.log(`  📁 Saved to:   ${c.bold}${result.filePath}${c.reset}`);
  if (result.backupPath) {
    console.log(`  🛡️ Backup at:  ${c.dim}${result.backupPath}${c.reset}`);
  }
  console.log(`  📦 Added:      ${c.green}${result.added.length} new server(s)${c.reset} (${result.added.join(", ")})`);
  if (result.updated.length > 0) {
    console.log(`  🔄 Updated:    ${c.yellow}${result.updated.length} server(s)${c.reset} (${result.updated.join(", ")})`);
  }
  console.log(`  📊 Total:      ${c.bold}${result.totalServers} active MCP servers${c.reset} in config.\n`);

  console.log(`${c.bold}👉 NEXT STEP:${c.reset}`);
  console.log(`   Restart ${c.bold}${selectedClient.name}${c.reset} to load your new MCP tools!\n`);

  console.log(`${c.dim}─────────────────────────────────────────────────────────────${c.reset}`);
  console.log(`${c.bold}🌐 DISCOVER 620+ MCP SERVERS & VISUAL CONFIG GENERATOR:${c.reset}`);
  console.log(`   ${c.cyan}https://mcp-serverlist.com${c.reset}`);
  console.log(`⭐ Star our Official Companion Matrix on GitHub:`);
  console.log(`   ${c.cyan}https://github.com/tonylate520/mcp-serverlist${c.reset}`);
  console.log(`${c.dim}─────────────────────────────────────────────────────────────${c.reset}\n`);
}

main().catch((err) => {
  console.error(`\n${c.red}Error: ${err.message}${c.reset}\n`);
  process.exit(1);
});
