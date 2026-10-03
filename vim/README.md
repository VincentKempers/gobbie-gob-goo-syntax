# Gobbie Gob Goo for Vim & Neovim

A simple _gooey_ dark theme with a bit of light. Originally made for Atom, now revamped for Vim and Neovim.

One colorscheme file works in both editors. Neovim also gets tree-sitter, LSP, diagnostic and common plugin highlights (gitsigns, telescope, nvim-tree, neo-tree, indent-blankline, rainbow-delimiters).

## Install

The colorscheme lives in this `vim/` subfolder, so point your plugin manager at it.

**vim-plug**

```vim
Plug 'VincentKempers/gobbie-gob-goo-syntax', { 'rtp': 'vim' }
```

**lazy.nvim**

```lua
{
  "VincentKempers/gobbie-gob-goo-syntax",
  lazy = false,
  priority = 1000,
  config = function(plugin)
    vim.opt.rtp:append(plugin.dir .. "/vim")
    vim.cmd.colorscheme("gobbie-gob-goo")
  end,
}
```

**Manually:** copy `colors/gobbie-gob-goo.vim` into `~/.vim/colors/` (Vim) or `~/.config/nvim/colors/` (Neovim).

## Use

```vim
set termguicolors   " recommended: exact colors in truecolor terminals
colorscheme gobbie-gob-goo
```

Without `termguicolors`, the nearest xterm-256 colors are used.

## License

MIT © Vincent Kempers
