const fs = require('fs');

function folderParser(file, writeToFile, _callback) {
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

        // _callback(object, writeToFile);
        _callback(object, writeToFile)
        // convertToMdFolder(object, writeToFile)
    });
}

module.exports = { folderParser };

// task learn how regex works
// clean code c'est pas optimal mais ca marche
// descritpion??

// function convertToMdFolder(object, path) {
//     console.log("here")
//     function heading(object) {
//         if (object.title != undefined || object.version != undefined || object.title != undefined) {
//             fs.appendFileSync(`${path}`, `<center>`)
//             if (object.title != undefined) {
//                 fs.appendFileSync(`${path}`, `<h1> ${object.title} </h1>`)
//             }
//             if (object.version != undefined) {
//                 fs.appendFileSync(`${path}`, `<h3> Version: ${object.version} </h3>`)
//             }
//             if (object.date != undefined) {
//                 fs.appendFileSync(`${path}`, `<h4> ${object.date} </h4>`)
//             }
//             fs.appendFileSync(`${path}`, `</center> \n`)
//         }
//     }
    
//     function authors(object) {
//         if (object.authors != undefined){
//                 if (object.authors.length > 1) {
//                     titre = "Authors";
//                 } else {
//                     titre = "Author";
//                 }fs.appendFileSync(`${path}`, `<h2> ${titre} : </h2> <br>`)
//                 for (let i=0; i<object.authors.length; i++) {
//                     if (object.mail[i] != null){
//                         fs.appendFileSync(`${path}`,`\n\n * ${object.authors[i]}, ${object.mail[i]}`)
//                     }
//                     else {
//                         fs.appendFileSync(`${path}`,`\n\n * ${object.authors[i]}`)
//                     }
//                 }
//         }
//     }
    
//     function description(object) {
//         if (object.description != undefined) {
//             fs.appendFileSync(`${path}`,`\n\n<br> <h2> Description :</h2> <br> ${object.description}`)
//         }
//     }

//     function requirements(object) {
//         if (object.requirements != undefined){
//             if (object.requirements.length > 1){
//                 titre="Requirements";
//             } else {
//                 titre = "Requirement";
//             } 
//             fs.appendFileSync(`${path}`, `\n<h2> <br>${titre} :</h2> <br>`)
//             for (let i=0; i<object.requirements.length; i++){
//                 fs.appendFileSync(`${path}`,`\n\n* ${object.requirements[i]}`)
//             } 
//         }
//     }

//     function paragraph(object) {
//         if (object.paragraph != undefined) {
//             fs.appendFileSync(`${path}`, `\n\n ${object.paragraph}`)
//         }
//     }

//     heading(object)
//     authors(object)
//     description(object)
//     requirements(object)
//     paragraph(object)
// }