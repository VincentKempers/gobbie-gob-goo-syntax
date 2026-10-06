# Gobbie Gob Goo for VS Code

A simple _gooey_ dark theme with a bit of light. Originally made for Atom, now revamped for VS Code.

Select it with **Preferences: Color Theme**, then **Gobbie Gob Goo**.

## Turning off the tag underline

HTML, JSX and Vue tags are underlined by default, like in the original Atom theme. To turn that off override just the tags, add this to your `settings.json`:

```json
"editor.tokenColorCustomizations": {
  "[Gobbie Gob Goo]": {
    "textMateRules": [
      {
        "scope": ["entity.name.tag", "support.class.component"],
        "settings": { "fontStyle": "" }
      }
    ]
  }
}
```

## License

MIT © Vincent Kempers
