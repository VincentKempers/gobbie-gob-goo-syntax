// Generates the editor themes from src/. Run with: npm run build

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildVSCodeTheme } from "../src/vscode.mjs";
import { buildZedTheme } from "../src/zed.mjs";
import { buildVimColorscheme } from "../src/vim.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));

const json = (theme) => JSON.stringify(theme, null, 2) + "\n";

const outputs = {
  "vscode/themes/gobbie-gob-goo-color-theme.json": json(buildVSCodeTheme()),
  "zed/themes/gobbie-gob-goo.json": json(buildZedTheme()),
  "vim/colors/gobbie-gob-goo.vim": buildVimColorscheme(),
};

for (const [path, contents] of Object.entries(outputs)) {
  writeFileSync(root + path, contents);
  console.log(`✓ ${path}`);
}
