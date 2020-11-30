const vscode = require("vscode");
const stringify = require("json-stringify-pretty-compact");

const { WorkspaceEdit, Range } = vscode;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const subscription = vscode.commands.registerCommand(
    "simplejson.format",
    function () {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const { document, selections } = editor;
      const edit = new WorkspaceEdit();

      const nonEmptySelections = selections.filter(d => !d.isEmpty);

      try {
        if (nonEmptySelections.length) {
          nonEmptySelections.forEach(selection => {
            const range = new Range(selection.start, selection.end);
            const newText = prettify(document.getText(range));
            edit.replace(document.uri, range, newText);
          });
        } else {
          const newText = prettify(document.getText());
          const documentStart = document.lineAt(0).range.start;
          const documentEnd = document.lineAt(document.lineCount - 1).range.end;
          const range = new Range(documentStart, documentEnd);
          edit.replace(document.uri, range, newText);
        }
      } catch (jsonError) {
        return vscode.window.showErrorMessage(jsonError.toString());
      }
      return vscode.workspace.applyEdit(edit);
    }
  );

  context.subscriptions.push(subscription);
}

function prettify(str) {
  return stringify(JSON.parse(str));
}

exports.activate = activate;

module.exports = {
  activate
};
