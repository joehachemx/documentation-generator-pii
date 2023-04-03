// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
var path = require("path");
const fileParser = require('./Controllers/fileParser');
const fileToMD = require('./Controllers/filetoMD');
const fs = require("fs");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Extension is now active!');
  
	// Register a command to display the text field
	let disposable = vscode.commands.registerCommand("extension.showTextField", function () {
		// let selection = new itemCode()
		let editor = vscode.window.activeTextEditor;
		// Show an input box to the user
		vscode.window.showInputBox({
		prompt: "Enter your text"
		}).then(function (inputText) {			
			editor.edit(editBuilder => {
				if (inputText != undefined) {

					let id = Math.floor(Math.random() * (100 - 0 + 1)) + 0
					while (id in everyIDGenerated) {
						id = Math.floor(Math.random() * (100 - 0 + 1)) + 0
					}
					everyIDGenerated.push(id)


					if (editor.selection.start.line === editor.selection.end.line) {
						inputText = " " + checkLanguage() + " @/w" + `${id}` + " " +  inputText 
					} else {
						inputText = checkLanguage() + " @<r" + `${id}` + " " + inputText
					}


					closingText = checkLanguage() + " @r>" + `${id}`
					
					let newText;
	
					if (editor.selection.start.line === editor.selection.end.line) {
						newText = `${editor.document.getText(editor.selection)}` + `${inputText}` 
					} else {
						newText = `${inputText}` + '\n' + `${editor.document.getText(editor.selection)}` + '\n' + `${closingText}`
					}
					

					const selections = editor.selections; // to handle mutliple selection
					for (const selection of selections) {
						editBuilder.replace(selection, newText);
					}

				
				}
				
			});
		});


	});

	let callParserNConverter = vscode.commands.registerCommand("extension.callParserNConverter", async function () {
		console.log("calling parser n converter")

		function getFileName(path) {
			const pathArray = path.split('/');
			return pathArray[pathArray.length - 1];
		  }

		const files = await vscode.workspace.findFiles('**/*.*', '**/node_modules/**');

		fs.writeFileSync(`${vscode.workspace.workspaceFolders[0].uri.path}/markdownfile.md`,"")

		for (let i = 0; i < files.length; i++) {
			// console.log(files[i])
			let file = files[i].path
			await fileParser.fileParser(file, vscode.workspace.workspaceFolders[0].uri.path, getFileName(file), fileToMD.convertToMDFile)
		}
	})
  
	// Register the command to the keyboard shortcut
	context.subscriptions.push(disposable);
	context.subscriptions.push(callParserNConverter);
  }


// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

function checkLanguage() {
	// si preferable law zabatit built in mais ca marchait pas pr aucune raison
	// a revoir

    const editor = vscode.window.activeTextEditor;
	const document = editor.document;
	const language = document.languageId

	switch(language) {
		case "python":
			return "#"
		case "ruby":
			return "#"
		case "haskell":
			return "- -"
		case "r":
			return "#"
		case "erlang":
			return "%"
		case "perl":
			return "#"
		case "html":
			return null // waj3it ras for now
		case "css":
			return null // waj3it ras for now
		default:
			return "//"
	}
}

let everyIDGenerated = []