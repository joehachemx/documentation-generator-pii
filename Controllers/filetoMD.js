const fs = require("fs");

function convertToMDFile(arrayOfItemCodes, path, fileName) {
  if (arrayOfItemCodes.length > 0) {
    fs.appendFileSync(`${path}/markdownfile.md`,`# ${fileName} \n`)
    try {
      arrayOfItemCodes.forEach(element => {
        fs.appendFileSync(`${path}/markdownfile.md`,`~~~js \n${element.code}\n~~~\n${element.explication}<br> <br>\n`)
      });
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = { convertToMDFile };