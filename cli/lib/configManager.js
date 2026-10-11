const fs = require("fs");
const path = require("path");

function readConfig(filePath) {
  if (!fs.existsSync(filePath)) {
    return { mcpServers: {} };
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    if (!raw.trim()) {
      return { mcpServers: {} };
    }
    const parsed = JSON.parse(raw);
    if (!parsed.mcpServers || typeof parsed.mcpServers !== "object") {
      parsed.mcpServers = {};
    }
    return parsed;
  } catch (err) {
    throw new Error(`Failed to parse existing JSON at ${filePath}: ${err.message}`);
  }
}

function saveConfig(filePath, newServers) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let backupPath = null;
  let existing = { mcpServers: {} };

  if (fs.existsSync(filePath)) {
    try {
      existing = readConfig(filePath);
      // Create safe backup
      backupPath = `${filePath}.bak.${Date.now()}`;
      fs.copyFileSync(filePath, backupPath);
    } catch {
      // If broken JSON, still backup raw file
      backupPath = `${filePath}.corrupt.bak.${Date.now()}`;
      fs.copyFileSync(filePath, backupPath);
      existing = { mcpServers: {} };
    }
  }

  const existingKeys = Object.keys(existing.mcpServers || {});
  const newKeys = Object.keys(newServers);

  const mergedServers = {
    ...(existing.mcpServers || {}),
    ...newServers,
  };

  const finalConfig = {
    ...existing,
    mcpServers: mergedServers,
  };

  fs.writeFileSync(filePath, JSON.stringify(finalConfig, null, 2) + "\n", "utf8");

  const newlyAdded = newKeys.filter((k) => !existingKeys.includes(k));
  const updated = newKeys.filter((k) => existingKeys.includes(k));

  return {
    filePath,
    backupPath,
    added: newlyAdded,
    updated,
    totalServers: Object.keys(mergedServers).length,
  };
}

module.exports = {
  readConfig,
  saveConfig,
};
