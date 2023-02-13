const fs = require('fs');
const { it } = require('node:test');
const { isModuleNamespaceObject } = require('util/types');

function fileParser(file) {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) throw err;

        let isReadingFunction = false


        const lines = data.split('\n');
    
        lines.forEach((line) => {
            if (line.includes("@endfunc")) {
                isReadingFunction = false
            }

            let isReadingLineComment = false

            if (isReadingFunction) {
                let comment = ''
                for (let i = 0; i < line.length; i++) {
                    if (line[i] === "#") {
                        isReadingLineComment = true
                    }
                    if (isReadingLineComment) {
                        comment += line[i]
                    }
                }
                console.log(comment)
            }

            if (line.includes("@startfunc")) {
                isReadingFunction = true
            }

        })
    })
}

fileParser("example.abc")

