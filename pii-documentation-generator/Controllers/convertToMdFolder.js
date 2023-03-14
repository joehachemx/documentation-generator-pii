const fs = require("fs");

function convertToMdFolder(object) {
    function heading(object) {
        if (object.title != undefined || object.version != undefined || object.title != undefined) {
            fs.appendFileSync("manuscript.md", `<center>`)
            if (object.title != undefined) {
                fs.appendFileSync("manuscript.md", `<h1> ${object.title} </h1>`)
            }
            if (object.version != undefined) {
                fs.appendFileSync("manuscript.md", `<h3> Version: ${object.version} </h3>`)
            }
            if (object.date != undefined) {
                fs.appendFileSync("manuscript.md", `<h4> ${object.date} </h4>`)
            }
            fs.appendFileSync("manuscript.md", `</center> \n`)
        }
    }
    
    function authors(object) {
        if (object.authors != undefined){
                if (object.authors.length > 1) {
                    titre = "Authors";
                } else {
                    titre = "Author";
                }fs.appendFileSync("manuscript.md", `<h2> ${titre} : </h2> <br>`)
                for (let i=0; i<object.authors.length; i++) {
                    if (object.mail[i] != null){
                        fs.appendFileSync("manuscript.md",`\n\n * ${object.authors[i]}, ${object.mail[i]}`)
                    }
                    else {
                        fs.appendFileSync("manuscript.md",`\n\n * ${object.authors[i]}`)
                    }
                }
        }
    }
    
    function description(object) {
        if (object.description != undefined) {
            fs.appendFileSync("manuscript.md",`\n\n<br> <h2> Description :</h2> <br> ${object.description}`)
        }
    }

    function requirements(object) {
        if (object.requirements != undefined){
            if (object.requirements.length > 1){
                titre="Requirements";
            } else {
                titre = "Requirement";
            } 
            fs.appendFileSync("manuscript.md", `\n<h2> <br>${titre} :</h2> <br>`)
            for (let i=0; i<object.requirements.length; i++){
                fs.appendFileSync("manuscript.md",`\n\n* ${object.requirements[i]}`)
            } 
        }
    }

    function paragraph(object) {
        if (object.paragraph != undefined) {
            fs.appendFileSync("manuscript.md", `\n\n ${object.paragraph}`)
        }
    }

    fs.writeFileSync("manuscript.md", "") // c utiliser pr override existing data for testing
    heading(object)
    authors(object)
    description(object)
    requirements(object)
    paragraph(object)
}

module.exports = { convertToMdFolder };