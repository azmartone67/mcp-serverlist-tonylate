const readline = require("readline");

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
  bgCyan: "\x1b[46m",
  bgBlue: "\x1b[44m",
  bgGreen: "\x1b[42m",
};

function banner() {
  console.log(`
${c.cyan}${c.bold} __  __  ____ ____    ___       _ _   ${c.reset}
${c.cyan}${c.bold}|  \\/  |/ ___|  _ \\  |_ _|_ __ (_) |_ ${c.reset}
${c.cyan}${c.bold}| |\\/| | |   | |_) |  | || '_ \\| | __|${c.reset}
${c.cyan}${c.bold}| |  | | |___|  __/   | || | | | | |_ ${c.reset}
${c.cyan}${c.bold}|_|  |_|\\____|_|     |___|_| |_|_|\\__|${c.reset}
${c.dim}Model Context Protocol Interactive Config Generator${c.reset}
${c.yellow}Directory: 620+ Servers | Authors: 570+ Verified | Free & Open-Source${c.reset}
${c.dim}─────────────────────────────────────────────────────────────────${c.reset}
`);
}

function promptText(question, defaultValue = "") {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const defaultHint = defaultValue ? ` ${c.dim}(default: ${defaultValue})${c.reset}` : "";
    rl.question(`${c.bold}${question}${defaultHint}: ${c.reset}`, (answer) => {
      rl.close();
      const trimmed = answer.trim();
      resolve(trimmed || defaultValue);
    });
  });
}

function promptSelect(title, items) {
  return new Promise((resolve) => {
    console.log(`\n${c.bold}${c.cyan}? ${title}${c.reset}`);
    items.forEach((item, index) => {
      const idx = `${c.dim}[${index + 1}]${c.reset}`;
      const name = `${c.bold}${item.name}${c.reset}`;
      const desc = item.desc ? ` ${c.gray}- ${item.desc}${c.reset}` : "";
      console.log(`  ${idx} ${name}${desc}`);
    });

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    function ask() {
      rl.question(`\n${c.bold}Select an option (1-${items.length}): ${c.reset}`, (ans) => {
        const num = parseInt(ans.trim(), 10);
        if (!isNaN(num) && num >= 1 && num <= items.length) {
          rl.close();
          resolve(items[num - 1]);
        } else {
          console.log(`${c.red}Please enter a valid number between 1 and ${items.length}.${c.reset}`);
          ask();
        }
      });
    }

    ask();
  });
}

function promptCheckbox(title, items, defaultSelectedSlugs = []) {
  return new Promise((resolve) => {
    console.log(`\n${c.bold}${c.cyan}? ${title}${c.reset}`);
    console.log(`${c.dim}(Enter numbers separated by comma, e.g. "1,2,4", or "a" for all):${c.reset}`);

    items.forEach((item, index) => {
      const isDefault = defaultSelectedSlugs.includes(item.slug);
      const mark = isDefault ? `${c.green}[✓]${c.reset}` : `${c.dim}[ ]${c.reset}`;
      const idx = `${c.dim}[${index + 1}]${c.reset}`;
      const name = `${c.bold}${item.name}${c.reset}`;
      const desc = item.tagline ? ` ${c.gray}- ${item.tagline.slice(0, 70)}...${c.reset}` : "";
      console.log(`  ${mark} ${idx} ${name}${desc}`);
    });

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    function ask() {
      rl.question(`\n${c.bold}Your choice (e.g. 1,2,3 or 'a' for all, Enter to confirm defaults): ${c.reset}`, (ans) => {
        const raw = ans.trim().toLowerCase();
        if (raw === "a" || raw === "all") {
          rl.close();
          resolve(items);
          return;
        }

        if (!raw) {
          // Keep defaults
          rl.close();
          const selected = items.filter((i) => defaultSelectedSlugs.includes(i.slug));
          resolve(selected.length > 0 ? selected : [items[0]]);
          return;
        }

        const indices = raw.split(/[\s,]+/).map((s) => parseInt(s, 10)).filter((n) => !isNaN(n));
        const selected = [];
        for (const idx of indices) {
          if (idx >= 1 && idx <= items.length) {
            selected.push(items[idx - 1]);
          }
        }

        if (selected.length === 0) {
          console.log(`${c.red}No valid selections found. Please enter valid numbers.${c.reset}`);
          ask();
        } else {
          rl.close();
          resolve(selected);
        }
      });
    }

    ask();
  });
}

module.exports = {
  c,
  banner,
  promptText,
  promptSelect,
  promptCheckbox,
};
