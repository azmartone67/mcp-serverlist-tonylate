const os = require("os");
const path = require("path");
const fs = require("fs");

function getClientPaths() {
  const platform = os.platform();
  const home = os.homedir();

  let claudePath = "";
  let cursorPath = path.join(home, ".cursor", "mcp.json");
  let windsurfPath = path.join(home, ".codeium", "windsurf", "mcp_config.json");
  let clinePath = "";

  if (platform === "darwin") {
    claudePath = path.join(home, "Library", "Application Support", "Claude", "claude_desktop_config.json");
    clinePath = path.join(home, "Library", "Application Support", "Code", "User", "globalStorage", "saoudrizwan.claude-dev", "settings", "cline_mcp_settings.json");
  } else if (platform === "win32") {
    const appData = process.env.APPDATA || path.join(home, "AppData", "Roaming");
    claudePath = path.join(appData, "Claude", "claude_desktop_config.json");
    clinePath = path.join(appData, "Code", "User", "globalStorage", "saoudrizwan.claude-dev", "settings", "cline_mcp_settings.json");
  } else {
    // Linux and others
    claudePath = path.join(home, ".config", "Claude", "claude_desktop_config.json");
    clinePath = path.join(home, ".config", "Code", "User", "globalStorage", "saoudrizwan.claude-dev", "settings", "cline_mcp_settings.json");
  }

  return [
    {
      id: "claude",
      name: "Claude Desktop",
      desc: "Anthropic official desktop app",
      configPath: claudePath,
      exists: fs.existsSync(claudePath),
      appInstalled: fs.existsSync(path.dirname(claudePath)),
    },
    {
      id: "cursor",
      name: "Cursor IDE",
      desc: "AI-first code editor",
      configPath: cursorPath,
      exists: fs.existsSync(cursorPath),
      appInstalled: fs.existsSync(path.dirname(cursorPath)),
    },
    {
      id: "windsurf",
      name: "Windsurf Editor",
      desc: "Codeium collaborative AI editor",
      configPath: windsurfPath,
      exists: fs.existsSync(windsurfPath),
      appInstalled: fs.existsSync(path.dirname(windsurfPath)),
    },
    {
      id: "cline",
      name: "Cline / Roo-Code",
      desc: "Autonomous coding agent in VS Code",
      configPath: clinePath,
      exists: fs.existsSync(clinePath),
      appInstalled: fs.existsSync(path.dirname(clinePath)),
    },
    {
      id: "local",
      name: "Export to Local File",
      desc: "Write ./mcp_config.json in current directory",
      configPath: path.resolve(process.cwd(), "mcp_config.json"),
      exists: fs.existsSync(path.resolve(process.cwd(), "mcp_config.json")),
      appInstalled: true,
    },
  ];
}

module.exports = {
  getClientPaths,
};
