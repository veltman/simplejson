# SimpleJSON

A very simple JSON formatter.

When installed, using Cmd+J (Mac) or Ctrl+J (Windows/Linux) will prettify the selected text as JSON, or prettify the entire document as JSON if no text is selected. You can also pick "Format JSON" from the context menu or the command palette to do the same thing.

JSON is prettified with [json-stringify-pretty-compact](https://github.com/lydell/json-stringify-pretty-compact), which is essentially the same as `JSON.stringify(obj, null, " ")` but will keep arrays and objects on a single line if they're 80 characters or less.

## Options

There are no options.

## Contact

[noah@noahveltman.com](mailto:noah@noahveltman.com)
