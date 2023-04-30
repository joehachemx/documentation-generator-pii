const vscode = require('vscode');
const fileParser = require('./Controllers/fileParser');
const fileToMD = require('./Controllers/filetoMD');
const fs = require("fs");
const gptController = require('./Controllers/gptController');
const folderParser = require('./Controllers/folderParser');
const folderMD = require('./Controllers/convertToMdFolder');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Extension is now active!');
  
	let disposable = vscode.commands.registerCommand("extension.showTextField", function () {
		let editor = vscode.window.activeTextEditor;
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

		const writePath = vscode.workspace.workspaceFolders[0].uri.fsPath

		let files = await vscode.workspace.findFiles('**/*.*', '**/node_modules/**');
		files = files.sort()
		fs.writeFileSync(`${writePath}/markdownfile.md`,"")

		// folder info if available
		async function processFolder() {
			try {
				const folderData = await folderParser.folderParser(`${writePath}/info.pii`)
				if (folderData != undefined) {
					await folderMD.convertToMdFolder(folderData, `${vscode.workspace.workspaceFolders[0].uri.fsPath}/markdownfile.md`)
				}
			} catch (e) {
				console.log(e)
			}
		}
		
		processFolder()

		async function processFiles() {
			for (let i = 0; i < files.length; i++) {
			  let file = files[i].fsPath;
			  try {
				const arrayOfItemCode = await fileParser.fileParser(file, writePath, getFileName(file));
				if (arrayOfItemCode != undefined) {
				  await fileToMD.convertToMDFile(arrayOfItemCode, writePath, getFileName(file));
				}
			  } catch (e) {
				console.log(e);
			  }
			}
		  }
		  
		  processFiles();
	})

	let gptAPI = vscode.commands.registerCommand("extension.gptAPI", async function () {
		console.log("gpt API")

		let editor = vscode.window.activeTextEditor;

		await vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Smart Comments ",
			cancellable: false
		  }, async (progress) => {
			// simulate a long-running task
			progress.report({ message: "Running GPT..." });
			await new Promise(resolve => setTimeout(resolve, 100));
			
			if (editor.document.getText(editor.selection).trim() == "") {
				progress.report({ increment: 100, message: "Error. Please select something." });
				await new Promise(resolve => setTimeout(resolve, 100));
				return
			} 

			let codeExplication = await gptController.runCompletion(editor.document.getText(editor.selection))

			codeExplication = codeExplication.trim()
		
			// update the progress indicator
			progress.report({ increment: 50, message: "Processing results..." });
			await new Promise(resolve => setTimeout(resolve, 100));
		
			editor.edit(editBuilder => {
			
				let id = Math.floor(Math.random() * (100 - 0 + 1)) + 0
				while (id in everyIDGenerated) {
					id = Math.floor(Math.random() * (100 - 0 + 1)) + 0
				}
				everyIDGenerated.push(id)
	
	
				if (editor.selection.start.line === editor.selection.end.line) {
					codeExplication = " " + checkLanguage() + " @/w" + `${id}` + " " +  codeExplication 
				} else {
					codeExplication = checkLanguage() + " @<r" + `${id}` + " " + codeExplication
				}

				closingText = checkLanguage() + " @r>" + `${id}`
				
				let newText;

				if (editor.selection.start.line === editor.selection.end.line) {
					newText = `${editor.document.getText(editor.selection)}` + `${codeExplication}` 
				} else {
					newText = `${codeExplication}` + '\n' + `${editor.document.getText(editor.selection)}` + '\n' + `${closingText}`
				}
	
				const selections = editor.selections; // to handle mutliple selection
				for (const selection of selections) {
					editBuilder.replace(selection, newText);
				}
	
			})
		
			// update the progress indicator
			progress.report({ increment: 50, message: "Done!" });
			await new Promise(resolve => setTimeout(resolve, 1000));
		  })
	})

	let createProjectInfoFile = vscode.commands.registerCommand("extension.createProjectInfoFile", async function () {
		console.log("creating project info file")

		fs.writeFileSync(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/info.pii`, infoPiiText)
	})
  
	// Register the command to the keyboard shortcut
	context.subscriptions.push(disposable);
	context.subscriptions.push(callParserNConverter);
	context.subscriptions.push(gptAPI);
	context.subscriptions.push(createProjectInfoFile);
  }


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

let infoPiiText = 
"@title=\"title\"\n\n@version=\"v 1.1.1\"\n@date=\"12/12/12\"\n\n@authors=\"x, y, ghada\"\n@mail=\"x@mail.com, y@mail.com, ghada@mail.com\"\n\n@description=\"this is a description\"\n\n@requirements=\"ios16, windows11\"\n\n@paragraph=\"this is a paragraph\""