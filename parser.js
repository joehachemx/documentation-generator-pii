function readAndExtract(file) {
    const fs = require('fs');

    let objectKeyReg = /@(\w+)\b/
    
    let object = {}
    
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) throw err;

        const lines = data.split('\n');
    
        // console.log(lines)
    
        lines.forEach((line) => {
            if (line != "") { // aw on les enleve avant mais mej de check cmt
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

        console.log(object)
        return object
    });
}

readAndExtract("test.hoe")

// task learn how regex works
// clean code c'est pas optimal mais ca marche
// descritpion??