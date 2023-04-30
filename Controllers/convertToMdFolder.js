const fs = require("fs");

function convertToMdFolder(object, path) {
    function heading(object) {
        if (object.title != undefined || object.version != undefined || object.title != undefined) {
            fs.appendFileSync(`${path}`, `<center>`)
            if (object.title != undefined) {
                fs.appendFileSync(`${path}`, `<h1> ${object.title} </h1>`)
            }
            if (object.version != undefined) {
                fs.appendFileSync(`${path}`, `<h3> Version ${object.version} </h3>`)
            }
            if (object.date != undefined) {
                fs.appendFileSync(`${path}`, `<h4> ${object.date} </h4>`)
            }
            fs.appendFileSync(`${path}`, `</center> \n`)
        }
    }
    
    function authors(object) {
        if (object.authors != undefined){
                if (object.authors.length > 1) {
                    titre = "Authors";
                } else {
                    titre = "Author";
                }
                fs.appendFileSync(`${path}`, `<h2> 👨‍💻 ${titre} </h2> <br>`)
                for (let i=0; i<object.authors.length; i++) {
                    if (object.mail[i] != null){
                        fs.appendFileSync(`${path}`,`\n\n * ${object.authors[i]}, ${object.mail[i]}\n`)
                    }
                    else {
                        fs.appendFileSync(`${path}`,`\n\n * ${object.authors[i]}\n`)
                    }
                }
        }
    }
    
    function description(object) {
        if (object.description != undefined) {
            fs.appendFileSync(`${path}`,`\n\n<br> <h2> 📝 Description </h2> <br> ${object.description}\n`)
        }
    }

    function requirements(object) {
        if (object.requirements != undefined){
            if (object.requirements.length > 1){
                titre="Requirements";
            } else {
                titre = "Requirement";
            } 
            fs.appendFileSync(`${path}`, `\n<h2> <br> 🛠 ${titre} </h2> \n\n`)
            for (let i=0; i<object.requirements.length; i++){
                fs.appendFileSync(`${path}`,`* ${object.requirements[i]}\n`)
            } 
        }
    }

    function paragraph(object) {
        if (object.paragraph != undefined) {
            fs.appendFileSync(`${path}`,`\n\n<br> <h2> Paragraph :</h2> <br> ${object.paragraph} <br>\n`)
        }
    }

    heading(object)
    authors(object)
    description(object)
    requirements(object)
    paragraph(object)
    fs.appendFileSync(`${path}`, "<br>\n\n")
}

module.exports = { convertToMdFolder };