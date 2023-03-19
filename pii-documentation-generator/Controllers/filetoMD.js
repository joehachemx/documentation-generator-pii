const fs = require("fs");

function convertToMDFile(arrayOfItemCodes) {
  fs.writeFileSync("markdownfile.md","")

  arrayOfItemCodes.forEach(element => {
    fs.appendFileSync("markdownfile.md",`
~~~js
${element.code}
~~~ 
${element.explication}<br> <br>
`)
  });
}

module.exports = { convertToMDFile };