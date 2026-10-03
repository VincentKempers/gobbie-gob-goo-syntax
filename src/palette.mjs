// Gobbie Gob Goo palette — ported 1:1 from the original Atom theme
// (styles/colors.less + styles/syntax-variables.less).

import { lighten, darken, alpha } from "./color.mjs";

export const colors = {
  veryLightGray: "#c5c8c6",
  lightGray: "#7f7f7f",
  gray: "#373b41",
  darkGray: "#282a2e",
  veryDarkGray: "#272c36",

  cyan: "#a4d8d1",
  blue: "#81a2be",
  middleGray: "#969896",
  green: "#9ed1a0",
  red: "#fda1aa",
  white: "#ffffff",
  lightOrange: "#f0c674",
  trueBlue: "#83c6d5",
  newOrange: "#ffe2a1",
  crimson: "#dc143c",
};

// Syntax variables from the Atom theme.
export const syntax = {
  text: colors.veryLightGray,
  cursor: colors.white,
  selection: lighten(colors.darkGray, 15),
  background: "#252c38",

  wrapGuide: colors.darkGray,
  indentGuide: colors.gray,
  invisible: colors.gray,

  resultMarker: colors.lightGray,
  resultMarkerSelected: colors.white,

  gutterText: colors.veryLightGray,
  gutterTextSelected: colors.veryLightGray,
  gutterBackground: "#252c38",
  gutterBackgroundSelected: colors.gray,

  renamed: colors.blue,
  added: colors.green,
  modified: colors.lightOrange,
  removed: colors.crimson,

  // Derived values used by the Atom styles.
  redDark: darken(colors.red, 10),
};

// Editor chrome (Atom left this to the UI theme, so these are new, but built
// from the same palette so the workbench feels like part of the goo).
export const ui = {
  bg: syntax.background,
  bgDark: darken(syntax.background, 3),
  bgDarker: darken(syntax.background, 5),
  bgLight: lighten(syntax.background, 4),
  bgLighter: lighten(syntax.background, 8),
  border: darken(syntax.background, 6),
  borderLight: colors.gray,
  fg: colors.veryLightGray,
  fgMuted: colors.middleGray,
  fgSubtle: colors.lightGray,
  accent: colors.cyan,
  selection: syntax.selection,
  lineHighlight: alpha(colors.gray, 0.45),
  findMatch: alpha(colors.newOrange, 0.35),
  findMatchHighlight: alpha(colors.newOrange, 0.15),
  wordHighlight: alpha(colors.blue, 0.2),
  wordHighlightStrong: alpha(colors.blue, 0.3),
};
