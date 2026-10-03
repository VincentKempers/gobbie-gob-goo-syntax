// Builds the Zed theme from the shared palette.
// Zed highlights with tree-sitter captures rather than TextMate scopes; a
// capture like "function.method" falls back to "function" when not defined.
// Note: Zed themes can't underline tokens, so the Atom underlines are dropped.

import { colors as c, syntax as s, ui } from "./palette.mjs";
import { alpha } from "./color.mjs";

const tok = (color, extra = {}) => ({ color, font_style: null, font_weight: null, ...extra });
const italic = { font_style: "italic" };
const bold = { font_weight: 700 };

const syntaxStyles = {
  attribute: tok(c.white),
  boolean: tok(c.white),
  comment: tok(c.lightGray, italic),
  "comment.doc": tok(c.lightGray, italic),
  constant: tok(c.white),
  "constant.builtin": tok(c.white),
  constructor: tok(c.lightOrange),
  embedded: tok(s.text),
  emphasis: tok(c.middleGray, italic),
  "emphasis.strong": tok(c.white, bold),
  enum: tok(c.lightOrange),
  function: tok(c.blue),
  "function.builtin": tok(c.cyan),
  "function.method": tok(c.blue),
  "function.special": tok(c.blue),
  hint: tok(c.lightGray, italic),
  keyword: tok(c.middleGray),
  "keyword.operator": tok(c.newOrange),
  label: tok(c.blue),
  link_text: tok(c.red),
  link_uri: tok(c.cyan),
  number: tok(c.trueBlue),
  operator: tok(c.newOrange),
  predictive: tok(c.lightGray, italic),
  preproc: tok(c.middleGray),
  primary: tok(s.text),
  property: tok(s.text),
  punctuation: tok(s.text),
  "punctuation.bracket": tok(s.text),
  "punctuation.delimiter": tok(s.text),
  "punctuation.list_marker": tok(c.red),
  "punctuation.markup": tok(c.blue),
  "punctuation.special": tok(s.redDark),
  selector: tok(c.lightOrange),
  "selector.pseudo": tok(c.cyan),
  string: tok(c.green),
  "string.escape": tok(c.cyan),
  "string.regex": tok(c.cyan),
  "string.special": tok(c.cyan),
  "string.special.symbol": tok(c.green),
  tag: tok(c.red),
  "text.literal": tok(c.green),
  title: tok(c.green, bold),
  type: tok(c.lightOrange),
  "type.builtin": tok(c.lightOrange),
  variable: tok(s.text),
  "variable.member": tok(s.text),
  "variable.parameter": tok(s.text),
  "variable.special": tok(c.red),
  "variable.builtin": tok(c.red),
  variant: tok(c.white),
};

const ansi = {
  black: c.darkGray,
  red: c.red,
  green: c.green,
  yellow: c.lightOrange,
  blue: c.blue,
  magenta: "#d7a8d8",
  cyan: c.cyan,
  white: c.veryLightGray,
  bright_black: c.lightGray,
  bright_red: "#ffbfc5",
  bright_green: "#b9e3bb",
  bright_yellow: c.newOrange,
  bright_blue: c.trueBlue,
  bright_magenta: "#e8c6e9",
  bright_cyan: "#c3e8e3",
  bright_white: c.white,
};

const status = (name, color) => ({
  [name]: color,
  [`${name}.background`]: alpha(color, 0.12),
  [`${name}.border`]: alpha(color, 0.5),
});

const style = {
  // Surfaces
  background: ui.bgDarker,
  "surface.background": ui.bgDark,
  "elevated_surface.background": ui.bgDark,
  "panel.background": ui.bgDark,
  "status_bar.background": ui.bgDarker,
  "title_bar.background": ui.bgDarker,
  "title_bar.inactive_background": ui.bgDarker,
  "toolbar.background": s.background,
  "tab_bar.background": ui.bgDark,
  "tab.inactive_background": ui.bgDark,
  "tab.active_background": s.background,

  // Borders
  border: ui.border,
  "border.variant": ui.border,
  "border.focused": alpha(c.cyan, 0.6),
  "border.selected": c.cyan,
  "border.transparent": "#00000000",
  "border.disabled": ui.border,
  "panel.focused_border": alpha(c.cyan, 0.6),
  "pane.focused_border": alpha(c.cyan, 0.6),
  "pane_group.border": ui.border,

  // Elements
  "element.background": ui.bgLight,
  "element.hover": alpha(c.gray, 0.6),
  "element.active": c.gray,
  "element.selected": c.gray,
  "element.disabled": ui.bgDark,
  "ghost_element.background": "#00000000",
  "ghost_element.hover": alpha(c.gray, 0.5),
  "ghost_element.active": c.gray,
  "ghost_element.selected": c.gray,
  "ghost_element.disabled": "#00000000",
  "drop_target.background": alpha(c.cyan, 0.15),
  "panel.indent_guide": c.gray,
  "panel.indent_guide_hover": c.lightGray,
  "panel.indent_guide_active": c.lightGray,
  // Used for rainbow brackets / indent guides.
  accents: [c.newOrange, c.cyan, c.red, c.blue, c.green, c.lightOrange],

  // Text & icons
  text: ui.fg,
  "text.muted": ui.fgMuted,
  "text.placeholder": ui.fgSubtle,
  "text.disabled": ui.fgSubtle,
  "text.accent": c.cyan,
  icon: ui.fg,
  "icon.muted": ui.fgMuted,
  "icon.disabled": ui.fgSubtle,
  "icon.placeholder": ui.fgSubtle,
  "icon.accent": c.cyan,
  "link_text.hover": c.cyan,

  // Scrollbar
  "scrollbar.thumb.background": alpha(c.gray, 0.6),
  "scrollbar.thumb.hover_background": c.gray,
  "scrollbar.thumb.border": "#00000000",
  "scrollbar.track.background": "#00000000",
  "scrollbar.track.border": "#00000000",

  // Search
  "search.match_background": ui.findMatch,

  // Editor
  "editor.foreground": s.text,
  "editor.background": s.background,
  "editor.gutter.background": s.gutterBackground,
  "editor.subheader.background": ui.bgDark,
  "editor.active_line.background": ui.lineHighlight,
  "editor.highlighted_line.background": alpha(c.gray, 0.4),
  "editor.line_number": alpha(s.gutterText, 0.45),
  "editor.active_line_number": s.gutterTextSelected,
  "editor.invisible": s.invisible,
  "editor.wrap_guide": s.wrapGuide,
  "editor.active_wrap_guide": c.gray,
  "editor.indent_guide": s.indentGuide,
  "editor.indent_guide_active": c.lightGray,
  "editor.document_highlight.read_background": ui.wordHighlight,
  "editor.document_highlight.write_background": ui.wordHighlightStrong,
  "editor.document_highlight.bracket_background": alpha(c.cyan, 0.15),

  // Terminal
  "terminal.background": ui.bgDark,
  "terminal.foreground": s.text,
  "terminal.ansi.background": ui.bgDark,
  "terminal.bright_foreground": c.white,
  "terminal.dim_foreground": c.lightGray,
  ...Object.fromEntries(
    Object.entries(ansi).flatMap(([k, v]) => [
      [`terminal.ansi.${k}`, v],
      ...(k.startsWith("bright_") ? [] : [[`terminal.ansi.dim_${k}`, alpha(v, 0.7)]]),
    ]),
  ),

  // Diagnostics & VCS
  ...status("conflict", c.lightOrange),
  ...status("created", s.added),
  ...status("deleted", c.red),
  ...status("error", c.red),
  ...status("hidden", c.lightGray),
  ...status("hint", c.cyan),
  ...status("ignored", c.lightGray),
  ...status("info", c.blue),
  ...status("modified", s.modified),
  ...status("predictive", c.lightGray),
  ...status("renamed", s.renamed),
  ...status("success", c.green),
  ...status("unreachable", c.lightGray),
  ...status("warning", c.lightOrange),
  "version_control.added": s.added,
  "version_control.modified": s.modified,
  "version_control.deleted": s.removed,

  // Collaborators — the first entry is your own cursor and selection.
  players: [
    { cursor: s.cursor, background: s.cursor, selection: s.selection },
    ...[c.red, c.green, c.lightOrange, c.blue, c.cyan, "#d7a8d8", c.trueBlue].map((color) => ({
      cursor: color,
      background: color,
      selection: alpha(color, 0.25),
    })),
  ],

  syntax: syntaxStyles,
};

export function buildZedTheme() {
  return {
    $schema: "https://zed.dev/schema/themes/v0.2.0.json",
    name: "Gobbie Gob Goo",
    author: "Vincent Kempers",
    themes: [{ name: "Gobbie Gob Goo", appearance: "dark", style }],
  };
}
