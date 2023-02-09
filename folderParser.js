const fs = require('fs');
const convertToMdFolder = require('./convertToMdFolder').convertToMdFolder;

function folderParser(file, callback) {
    let objectKeyReg = /@(\w+)\b/
    
    let object = {}
    
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) throw err;

        const lines = data.split('\n');
    
        lines.forEach((line) => {
            if (line != "") {
                let objectValueReg;
                try {
                    objectValueReg = `@${objectKeyReg.exec(line)[1]}="(.*?)"`
                    objectValueReg = new RegExp(objectValueReg)
                } catch {
                    console.log("error here")
                }

                try {
                    if (objectKeyReg.exec(line)[1] == "authors" || objectKeyReg.exec(line)[1] == "mail" || objectKeyReg.exec(line)[1] == "requirements") {
                        if (objectValueReg.exec(line)[1].includes(",")) {
                            let text = objectValueReg.exec(line)[1].split(",")
                            object[objectKeyReg.exec(line)[1].toLowerCase()] = text
                        } else {
                            object[objectKeyReg.exec(line)[1].toLowerCase()] = objectValueReg.exec(line)[1]
                        }
                    } else {
                        object[objectKeyReg.exec(line)[1].toLowerCase()] = objectValueReg.exec(line)[1]
                    }
                    
                } catch {
                    console.log("error here too")
                }
                
            }
        });

        callback(object);
    });
}

folderParser("test.abc", (object) => {
    console.log(object)
    convertToMdFolder(object)
});


// task learn how regex works
// clean code c'est pas optimal mais ca marche
// descritpion??