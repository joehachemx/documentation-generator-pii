const fs = require('fs');
var dedent = require('dedent');
const prettier = require("prettier");
const vscode = require('vscode');
const { format } = require('path');

function fileParser(file, writePath, fileName ,_callback) {
    let arrayOfItemCode = []

    let regStart = /(?<=@<r)\w+/
    let regEnd = /(?<=@r>)\w+/

    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) throw err;

        let thisID;

        const lines = data.split('\n');
    


        lines.forEach((line) => {
            if (line.includes("@/w")) {
                let reggg = /@\/?w(\d+)(.*?)$/
                thisID = reggg.exec(line)[1]

                for (let i = 0; i < arrayOfItemCode.length; i++) {
                    if (arrayOfItemCode[i].getId() == thisID) {
                        arrayOfItemCode[i].explication = reggg.exec(line)[2].trim()
                    }
                }

                // prend le cas ou prend le cas ou on met ca avant de initialise code
                // implement "if present"
            }

            if (line.includes("@/rw")) {
                let g = /^([^@]*)@\/rw(.*)$/

                let item = new itemCode()
                item.code = g.exec(line)[1].trim()
                item.explication = g.exec(line)[2]

                arrayOfItemCode.push(item)
            }



            if (line.includes("@<r")) {
                thisID = regStart.exec(line)[0]
                let isPresent = false

                for (let i = 0; i < arrayOfItemCode.length; i++) {
                    if (arrayOfItemCode[i].getId() == thisID) {
                        isPresent = true
                    }
                }

                if (!isPresent) {
                    let item = new itemCode(thisID)

                    let customRegID = `@<r${thisID}\\s+([^@\n]+)\n\\s*([\\s\\S]*?)\\s*@r>${thisID}`
                    customRegID = new RegExp(customRegID)

                    let language = fileName.split(".").pop()


                    let extractedCode = customRegID.exec(data)[2]
                    
                    try {
                        extractedCode = removeComments(extractedCode, language)
                    } catch (error) {
                        console.log(error)
                    }

                    extractedCode = removeEmptyLines(extractedCode)

                    // TODO: support more langus
                    extractedCode = dedent(extractedCode)

                    try {
                        item.code = extractedCode
                    } catch(error) {
                        console.log(error)
                    }
                    
                    item.explication = customRegID.exec(data)[1]
                    
                    arrayOfItemCode.push(item)
                }
            }
        })


        _callback(arrayOfItemCode, writePath, fileName)
    })
}

class itemCode {
    constructor(id, code, explication) {
      this.id = id; 
      this.code = code;
      this.explication = explication;
    }

    getId() {
        return this.id;
    }
}


function checkLanguage(language) {
	switch(language) {
		case "py":
			return "#"
		case "ru":
			return "#"
		case "hs":
			return "- -"
        case "lhs":
            return "- -"
		case "r":
			return "#"
		case "erl":
			return "%"
        case "hrl":
            return "%"
		case "pl":
			return "#"
		case "html":
			return null // waj3it ras for now
		case "css":
			return null // waj3it ras for now
		default:
			return "//"
	}
}

function removeComments(code, language) {
	switch(language) {
		case "py":
			return code.replace(/#.*/g, '')
		case "ru":
			return code.replace(/#.*/g, '')
		case "hs":
			return code.replace(/--.*/g, '')
        case "lhs":
            return code.replace(/--.*/g, '')
		case "r":
			return code.replace(/#.*/g, '')
		case "erl":
			return code.replace(/%.*/g, '')
        case "hrl":
            return code.replace(/%.*/g, '')
		case "pl":
			return code.replace(/#.*/g, '')
		case "html":
			return null // waj3it ras for now
		case "css":
			return null // waj3it ras for now
		default:
			return code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '')
	}
}

function removeEmptyLines(str) {
    return str.split(/\r?\n/).filter(line => line.trim() !== '').join('\n')
}
  


module.exports = { fileParser };