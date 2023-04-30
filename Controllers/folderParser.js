const fs = require('fs');

async function folderParser(file) {
    let objectKeyReg = /@(\w+)\b/;

    let object = {};

    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const lines = data.split("\n");

            lines.forEach((line) => {
                if (line != "") {
                    let objectValueReg;
                    try {
                        objectValueReg = `@${objectKeyReg.exec(line)[1]}="(.*?)"`;
                        objectValueReg = new RegExp(objectValueReg);
                    } catch {
                        console.log("error here");
                    }

                    try {
                        if (
                            objectKeyReg.exec(line)[1] == "authors" ||
                            objectKeyReg.exec(line)[1] == "mail" ||
                            objectKeyReg.exec(line)[1] == "requirements"
                        ) {
                            if (objectValueReg.exec(line)[1].includes(",")) {
                                let text = objectValueReg.exec(line)[1].split(",");
                                object[objectKeyReg.exec(line)[1].toLowerCase()] = text;
                            } else {
                                object[objectKeyReg.exec(line)[1].toLowerCase()] = objectValueReg.exec(
                                    line
                                )[1];
                            }
                        } else {
                            object[objectKeyReg.exec(line)[1].toLowerCase()] = objectValueReg.exec(
                                line
                            )[1];
                        }
                    } catch {
                        console.log("error here too");
                    }
                }
            });

            resolve(object);
        });
    });
}


module.exports = { folderParser };