const STARTER_PACKS = [
  {
    id: "dev",
    name: "🌟 All-in-One Developer Pack",
    desc: "Postgres + GitHub + Filesystem + Puppeteer (Most Popular)",
    slugs: ["postgres", "github", "filesystem", "puppeteer"],
  },
  {
    id: "web",
    name: "🌐 Web Scraping & Research Pack",
    desc: "Firecrawl + Brave Search + Puppeteer + Fetch",
    slugs: ["firecrawl", "brave-search", "puppeteer", "fetch"],
  },
  {
    id: "db",
    name: "🗄️ Database & Storage Power Pack",
    desc: "Postgres + SQLite + MySQL + Supabase + Redis",
    slugs: ["postgres", "sqlite", "mysql", "supabase", "redis"],
  },
  {
    id: "ai",
    name: "🧠 AI Models, Vectors & Memory Pack",
    desc: "Ollama + Chroma + Qdrant + Memory Graph",
    slugs: ["ollama", "chroma", "qdrant", "memory"],
  },
  {
    id: "prod",
    name: "📝 Productivity & Workspace Pack",
    desc: "Notion + Obsidian + Slack + Google Drive",
    slugs: ["notion", "obsidian", "slack", "google-drive"],
  },
];

module.exports = {
  STARTER_PACKS,
};
