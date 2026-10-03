// Builds the Vim / Neovim colorscheme from the shared palette.
// Vim has no alpha channel, so translucent colors are pre-blended onto the
// background, and every color gets a nearest xterm-256 fallback for terminals
// without truecolor.

import { colors as c, syntax as s, ui } from "./palette.mjs";
import { blend, toXterm256 } from "./color.mjs";

const NONE = "NONE";
const over = (color, a, bg = s.background) => blend(color, bg, a);

const lineHighlight = over(c.gray, 0.45);
const findMatch = over(c.newOrange, 0.35);
const wordHighlight = over(c.blue, 0.2);
const lineNr = over(s.gutterText, 0.45);

// `cterm` overrides the computed xterm-256 colors where rounding collides,
// e.g. { bg: 237 } so CursorLine doesn't round to the Normal background.
const hl = (fg, bg, style, sp, cterm = {}) => ({ fg, bg, style, sp, cterm });

// Groups shared by Vim and Neovim.
const groups = {
  // Editor UI
  Normal: hl(s.text, s.background),
  NormalFloat: hl(s.text, ui.bgDark),
  FloatBorder: hl(c.gray, ui.bgDark),
  Cursor: hl(s.background, s.cursor),
  lCursor: hl(s.background, s.cursor),
  CursorIM: hl(s.background, s.cursor),
  TermCursor: hl(s.background, s.cursor),
  CursorLine: hl(null, lineHighlight, NONE, null, { bg: 237 }),
  CursorColumn: hl(null, lineHighlight, null, null, { bg: 237 }),
  ColorColumn: hl(null, s.wrapGuide),
  LineNr: hl(lineNr, s.gutterBackground),
  CursorLineNr: hl(s.gutterTextSelected, lineHighlight, NONE, null, { bg: 237 }),
  SignColumn: hl(null, s.gutterBackground),
  FoldColumn: hl(c.lightGray, s.gutterBackground),
  Folded: hl(c.lightGray, ui.bgDark, "italic"),
  VertSplit: hl(ui.border, ui.border),
  WinSeparator: hl(ui.border, ui.border),
  EndOfBuffer: hl(s.background, null),
  NonText: hl(s.invisible, null),
  SpecialKey: hl(s.invisible, null),
  Whitespace: hl(s.invisible, null),
  Conceal: hl(c.lightGray, null),
  Visual: hl(null, s.selection),
  VisualNOS: hl(null, s.selection),
  Search: hl(null, findMatch),
  IncSearch: hl(s.background, c.newOrange, NONE),
  CurSearch: hl(s.background, c.newOrange, NONE),
  Substitute: hl(s.background, c.red),
  MatchParen: hl(c.cyan, over(c.cyan, 0.15), "bold"),
  Pmenu: hl(s.text, ui.bgDark),
  PmenuSel: hl(c.white, c.gray, "bold"),
  PmenuSbar: hl(null, ui.bgDark),
  PmenuThumb: hl(null, c.gray),
  WildMenu: hl(c.white, c.gray, "bold"),
  StatusLine: hl(ui.fg, ui.bgDarker, NONE),
  StatusLineNC: hl(ui.fgSubtle, ui.bgDarker, NONE),
  StatusLineTerm: hl(ui.fg, ui.bgDarker, NONE),
  StatusLineTermNC: hl(ui.fgSubtle, ui.bgDarker, NONE),
  TabLine: hl(ui.fgSubtle, ui.bgDark, NONE),
  TabLineFill: hl(null, ui.bgDarker, NONE),
  TabLineSel: hl(c.white, s.background, "bold"),
  Title: hl(c.green, null, "bold"),
  Directory: hl(c.blue, null),
  QuickFixLine: hl(null, s.selection),
  ErrorMsg: hl(c.red, null),
  WarningMsg: hl(c.lightOrange, null),
  ModeMsg: hl(c.green, null, "bold"),
  MoreMsg: hl(c.green, null),
  Question: hl(c.cyan, null),
  SpellBad: hl(null, null, "undercurl", c.red),
  SpellCap: hl(null, null, "undercurl", c.lightOrange),
  SpellLocal: hl(null, null, "undercurl", c.cyan),
  SpellRare: hl(null, null, "undercurl", c.blue),

  // Diff
  DiffAdd: hl(null, over(c.green, 0.15)),
  DiffChange: hl(null, over(c.lightOrange, 0.1)),
  DiffDelete: hl(c.red, over(c.red, 0.15)),
  DiffText: hl(null, over(c.lightOrange, 0.25)),
  Added: hl(s.added, null),
  Changed: hl(s.modified, null),
  Removed: hl(s.removed, null),

  // Standard syntax groups (`:help group-name`)
  Comment: hl(c.lightGray, null, "italic"),
  Constant: hl(c.white, null),
  String: hl(c.green, null),
  Character: hl(c.green, null),
  Number: hl(c.trueBlue, null),
  Float: hl(c.trueBlue, null),
  Boolean: hl(c.white, null),
  Identifier: hl(c.red, null, NONE),
  Function: hl(c.blue, null),
  Statement: hl(c.middleGray, null, NONE),
  Conditional: hl(c.middleGray, null),
  Repeat: hl(c.middleGray, null),
  Label: hl(c.middleGray, null),
  Keyword: hl(c.middleGray, null),
  Exception: hl(c.middleGray, null),
  Operator: hl(c.newOrange, null),
  PreProc: hl(c.middleGray, null),
  Include: hl(c.blue, null),
  Define: hl(c.middleGray, null),
  Macro: hl(c.cyan, null),
  PreCondit: hl(c.middleGray, null),
  Type: hl(c.lightOrange, null, NONE),
  StorageClass: hl(c.middleGray, null),
  Structure: hl(c.lightOrange, null),
  Typedef: hl(c.lightOrange, null),
  Special: hl(c.cyan, null),
  SpecialChar: hl(c.cyan, null),
  Tag: hl(c.red, null, "underline"),
  Delimiter: hl(s.text, null),
  SpecialComment: hl(c.lightGray, null, "italic"),
  Debug: hl(c.red, null),
  Underlined: hl(c.cyan, null, "underline"),
  Ignore: hl(c.lightGray, null),
  Error: hl(s.background, c.red),
  Todo: hl(c.lightOrange, null, "bold,italic"),

  // HTML / XML / Vue (Atom: red underlined tags, white attributes)
  htmlTag: hl(s.text, null),
  htmlEndTag: hl(s.text, null),
  htmlTagName: hl(c.red, null, "underline"),
  htmlSpecialTagName: hl(c.red, null, "underline"),
  htmlArg: hl(c.white, null),
  htmlTitle: hl(s.text, null),
  htmlH1: hl(c.green, null, "bold"),
  xmlTag: hl(s.text, null),
  xmlEndTag: hl(s.text, null),
  xmlTagName: hl(c.red, null, "underline"),
  xmlAttrib: hl(c.white, null),

  // CSS
  cssClassName: hl(c.lightOrange, null),
  cssIdentifier: hl(c.blue, null),
  cssTagName: hl(c.red, null),
  cssPseudoClassId: hl(c.cyan, null),
  cssProp: hl(s.text, null),
  cssAttr: hl(c.white, null),
  cssColor: hl(c.cyan, null),
  cssUnitDecorators: hl(c.white, null),
  cssImportant: hl(c.newOrange, null),

  // JavaScript (vim's built-in syntax and vim-javascript)
  javaScriptIdentifier: hl(c.middleGray, null),
  javaScriptFunction: hl(c.middleGray, null),
  javaScriptMember: hl(s.text, null),
  jsFunction: hl(c.middleGray, null),
  jsFuncName: hl(c.blue, null),
  jsFuncCall: hl(c.blue, null),
  jsFuncArgs: hl(s.text, null),
  jsObjectKey: hl(s.text, null),
  jsObjectProp: hl(s.text, null),
  jsGlobalObjects: hl(c.lightOrange, null, "underline"),
  jsThis: hl(c.red, null),
  jsStorageClass: hl(c.middleGray, null),
  jsExportDefault: hl(c.red, null),
  jsDocTags: hl(c.lightGray, null, "italic"),
  jsDocType: hl(c.lightOrange, null, "italic,underline"),
  jsDocParam: hl(c.red, null, "bold,italic"),
  jsTemplateBraces: hl(s.redDark, null),

  // PHP
  phpVarSelector: hl(c.red, null),
  phpIdentifier: hl(c.red, null),
  phpMethodsVar: hl(s.text, null),

  // Markdown
  markdownH1: hl(c.green, null, "bold"),
  markdownH2: hl(c.green, null, "bold"),
  markdownH3: hl(c.green, null),
  markdownHeadingDelimiter: hl(c.blue, null),
  markdownBold: hl(c.white, null, "bold"),
  markdownItalic: hl(c.middleGray, null, "italic"),
  markdownCode: hl(c.green, null),
  markdownCodeBlock: hl(c.green, null),
  markdownListMarker: hl(c.red, null),
  markdownBlockquote: hl(c.white, null),
  markdownLinkText: hl(c.red, null),
  markdownUrl: hl(c.cyan, null, "underline"),

  // Git
  diffAdded: hl(c.green, null),
  diffRemoved: hl(c.red, null),
  diffChanged: hl(c.lightOrange, null),
  diffFile: hl(c.blue, null),
  diffLine: hl(c.cyan, null),
  gitcommitSummary: hl(s.text, null),
  GitGutterAdd: hl(s.added, s.gutterBackground),
  GitGutterChange: hl(s.modified, s.gutterBackground),
  GitGutterDelete: hl(s.removed, s.gutterBackground),
  SignifySignAdd: hl(s.added, s.gutterBackground),
  SignifySignChange: hl(s.modified, s.gutterBackground),
  SignifySignDelete: hl(s.removed, s.gutterBackground),
};

// Neovim-only groups: diagnostics, tree-sitter captures, LSP semantic tokens
// and popular plugins. Vim rejects names starting with "@", hence the guard.
const nvimGroups = {
  DiagnosticError: hl(c.red, null),
  DiagnosticWarn: hl(c.lightOrange, null),
  DiagnosticInfo: hl(c.blue, null),
  DiagnosticHint: hl(c.cyan, null),
  DiagnosticOk: hl(c.green, null),
  DiagnosticUnderlineError: hl(null, null, "undercurl", c.red),
  DiagnosticUnderlineWarn: hl(null, null, "undercurl", c.lightOrange),
  DiagnosticUnderlineInfo: hl(null, null, "undercurl", c.blue),
  DiagnosticUnderlineHint: hl(null, null, "undercurl", c.cyan),
  DiagnosticVirtualTextError: hl(c.red, over(c.red, 0.1)),
  DiagnosticVirtualTextWarn: hl(c.lightOrange, over(c.lightOrange, 0.1)),
  DiagnosticVirtualTextInfo: hl(c.blue, over(c.blue, 0.1)),
  DiagnosticVirtualTextHint: hl(c.cyan, over(c.cyan, 0.1)),
  LspReferenceText: hl(null, wordHighlight),
  LspReferenceRead: hl(null, wordHighlight),
  LspReferenceWrite: hl(null, over(c.blue, 0.3)),
  LspInlayHint: hl(c.lightGray, over(c.gray, 0.5)),
  WinBar: hl(ui.fgMuted, null, NONE),
  WinBarNC: hl(ui.fgSubtle, null, NONE),

  // Tree-sitter — matched to the Atom screenshots: plain identifiers and
  // parameters use the text color; object/builtin variables are red.
  "@variable": hl(s.text, null),
  "@variable.builtin": hl(c.red, null),
  "@variable.parameter": hl(s.text, null),
  "@variable.member": hl(s.text, null),
  "@property": hl(s.text, null),
  "@constant": hl(c.white, null),
  "@constant.builtin": hl(c.white, null),
  "@module": hl(c.lightOrange, null),
  "@label": hl(c.blue, null),
  "@string": hl(c.green, null),
  "@string.escape": hl(c.cyan, null),
  "@string.regexp": hl(c.cyan, null),
  "@string.special": hl(c.cyan, null),
  "@string.special.symbol": hl(c.green, null),
  "@string.special.url": hl(c.cyan, null, "underline"),
  "@character": hl(c.green, null),
  "@number": hl(c.trueBlue, null),
  "@boolean": hl(c.white, null),
  "@type": hl(c.lightOrange, null, "underline"),
  "@type.builtin": hl(c.lightOrange, null, "underline"),
  "@type.definition": hl(c.lightOrange, null),
  "@attribute": hl(c.white, null),
  "@function": hl(c.blue, null),
  "@function.call": hl(c.blue, null),
  "@function.builtin": hl(c.cyan, null),
  "@function.method": hl(c.blue, null),
  "@function.method.call": hl(c.blue, null),
  "@constructor": hl(c.lightOrange, null, "underline"),
  "@operator": hl(c.newOrange, null),
  "@keyword": hl(c.middleGray, null),
  "@keyword.operator": hl(c.newOrange, null),
  "@keyword.import": hl(c.middleGray, null),
  "@keyword.export": hl(c.middleGray, null),
  "@punctuation": hl(s.text, null),
  "@punctuation.special": hl(s.redDark, null),
  "@comment": hl(c.lightGray, null, "italic"),
  "@comment.documentation": hl(c.lightGray, null, "italic"),
  "@comment.todo": hl(c.lightOrange, null, "bold,italic"),
  "@tag": hl(c.red, null, "underline"),
  "@tag.builtin": hl(c.red, null, "underline"),
  "@tag.attribute": hl(c.white, null),
  "@tag.delimiter": hl(s.text, null),
  "@markup.heading": hl(c.green, null, "bold"),
  "@markup.strong": hl(c.white, null, "bold"),
  "@markup.italic": hl(c.middleGray, null, "italic"),
  "@markup.strikethrough": hl(c.middleGray, null, "strikethrough"),
  "@markup.raw": hl(c.green, null),
  "@markup.quote": hl(c.white, null),
  "@markup.list": hl(c.red, null),
  "@markup.link": hl(c.red, null),
  "@markup.link.label": hl(c.red, null),
  "@markup.link.url": hl(c.cyan, null, "underline"),
  "@diff.plus": hl(c.green, null),
  "@diff.minus": hl(c.red, null),
  "@diff.delta": hl(c.lightOrange, null),

  // LSP semantic tokens
  "@lsp.type.class": hl(c.lightOrange, null),
  "@lsp.type.interface": hl(c.lightOrange, null),
  "@lsp.type.enum": hl(c.lightOrange, null),
  "@lsp.type.enumMember": hl(c.white, null),
  "@lsp.type.namespace": hl(c.lightOrange, null),
  "@lsp.type.parameter": hl(s.text, null),
  "@lsp.type.property": hl(s.text, null),
  "@lsp.type.variable": hl(s.text, null),
  "@lsp.typemod.variable.defaultLibrary": hl(c.red, null),
  "@lsp.typemod.function.defaultLibrary": hl(c.cyan, null),

  // Plugins
  GitSignsAdd: hl(s.added, s.gutterBackground),
  GitSignsChange: hl(s.modified, s.gutterBackground),
  GitSignsDelete: hl(s.removed, s.gutterBackground),
  TelescopeBorder: hl(c.gray, ui.bgDark),
  TelescopeNormal: hl(s.text, ui.bgDark),
  TelescopeSelection: hl(c.white, c.gray),
  TelescopeMatching: hl(c.cyan, null, "bold"),
  NvimTreeNormal: hl(ui.fgMuted, ui.bgDark),
  NvimTreeFolderName: hl(c.blue, null),
  NvimTreeOpenedFolderName: hl(c.blue, null, "bold"),
  NeoTreeNormal: hl(ui.fgMuted, ui.bgDark),
  NeoTreeNormalNC: hl(ui.fgMuted, ui.bgDark),
  IblIndent: hl(s.indentGuide, null, NONE),
  IblScope: hl(c.lightGray, null, NONE),
  RainbowDelimiterYellow: hl(c.newOrange, null),
  RainbowDelimiterCyan: hl(c.cyan, null),
  RainbowDelimiterRed: hl(c.red, null),
  RainbowDelimiterBlue: hl(c.blue, null),
  RainbowDelimiterGreen: hl(c.green, null),
  RainbowDelimiterOrange: hl(c.lightOrange, null),
};

const ansi = [
  c.darkGray, c.red, c.green, c.lightOrange, c.blue, "#d7a8d8", c.cyan, c.veryLightGray,
  c.lightGray, "#ffbfc5", "#b9e3bb", c.newOrange, c.trueBlue, "#e8c6e9", "#c3e8e3", c.white,
];

// Every attribute is always written (NONE when unset); otherwise Vim's
// built-in defaults leak through, e.g. Visual keeps cterm=reverse.
function highlight(name, { fg, bg, style, sp, cterm }) {
  return [
    `hi ${name}`,
    `guifg=${fg ?? NONE}`,
    `guibg=${bg ?? NONE}`,
    `guisp=${sp ?? NONE}`,
    `gui=${style ?? NONE}`,
    `ctermfg=${cterm.fg ?? (fg ? toXterm256(fg) : NONE)}`,
    `ctermbg=${cterm.bg ?? (bg ? toXterm256(bg) : NONE)}`,
    `cterm=${style ?? NONE}`,
  ].join(" ");
}

const block = (g, indent = "") =>
  Object.entries(g)
    .map(([name, spec]) => indent + highlight(name, spec))
    .join("\n");

export function buildVimColorscheme() {
  return `" Name:        Gobbie Gob Goo
" Description: A dark theme with a bit of light
" Author:      Vincent Kempers
" License:     MIT
" Note:        Generated by scripts/build.mjs from src/ — edit there, not here.

hi clear
if exists('syntax_on')
  syntax reset
endif
set background=dark
let g:colors_name = 'gobbie-gob-goo'

${block(groups)}

if has('nvim')
${block(nvimGroups, "  ")}

${ansi.map((color, i) => `  let g:terminal_color_${i} = '${color}'`).join("\n")}
else
  let g:terminal_ansi_colors = [
${ansi.map((color) => `        \\ '${color}',`).join("\n")}
        \\ ]
endif
`;
}
