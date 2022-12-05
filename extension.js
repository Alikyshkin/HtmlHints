// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const disposable = vscode.commands.registerTextEditorCommand('htmlhints.htmlBase', () => {
		const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Document</title>
  <meta name="description" content="">
  <meta name="keywords" content="">
  <link rel="canonical" href="" />
  <link rel="stylesheet" href="/assets/css/style.css" />
</head>
<body>
	<header></header>
	<main></main>
	<footer></footer>
  	<script src="/assets/js/script.js"></script>
</body>
</html>`;

		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(editBuilder => {
				editBuilder.insert(editor.selection.active, htmlContent);
			});
		}

		const wsedit = new vscode.WorkspaceEdit();
		const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
		const filePath = vscode.Uri.file(wsPath + '/assets/css/style.css');
		vscode.window.showInformationMessage(filePath.toString());
		wsedit.createFile(filePath, { ignoreIfExists: true });
		vscode.workspace.applyEdit(wsedit);

		const filePath2 = vscode.Uri.file(wsPath + '/assets/js/script.js');
		vscode.window.showInformationMessage(filePath2.toString());
		wsedit.createFile(filePath2, { ignoreIfExists: true });
		vscode.workspace.applyEdit(wsedit);

		vscode.window.showInformationMessage('Created a new file: /assets/css/style.css');
		vscode.window.showInformationMessage('Created a new file: /assets/js/script.js');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
