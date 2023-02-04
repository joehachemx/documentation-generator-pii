const fs = require("fs");

// object = {
//     title: "Project Title",
//     version: "1.2.3",
//     date: "12-09-2023",
//     author: ["Michelle Metni", "Jameel Nakhle","Jenniffer Farah","Rami Moussally"],
//     email:["michellemetni@gmail.com","jameelxnakhle@gmail.com","jennyfarah2@gmail.com"],
//     description:"I love coding Project PII Is fun. Hi Jenny, How are you today? Are you good? Yeah Im good. BarTartine rating for the cappuchino: 5stars. Rami aam bi oul eno Chez Paul el cappuchino atyab",
//     requirements: ["Packages","Hiyen","Jenny is the best"]
// }


function ConvertToMarkdown(object){

    function heading(object){
        if (object.title != ""){
            if (object.version != ""){
                if (object.date != ""){
                    fs.writeFileSync("manuscript.md", `<center> <h1> ${object.title} </h1><h3> Version: ${object.version} </h3><h4> ${object.date} </h4></center><br>`)
                } else {
                    fs.writeFileSync("manuscript.md", `<center> <h1> ${object.title} </h1><h3> Version: ${object.version} </h3></center><br>`)
                }
            } else if(object.date != "") {
                fs.writeFileSync("manuscript.md", `<center> <h1> ${object.title} </h1><h4> ${object.date} </h4></center><br>`)
            }else if(object.date==""){
                fs.writeFileSync("manuscript.md", `<center> <h1> ${object.title} </h1></center><br>`)
            }
            } else{
                if (object.version != ""){
                    if (object.date != ""){
                        fs.writeFileSync("manuscript.md", `<center><h3> Version: ${object.version} </h3><h4> ${object.date} </h4></center><br>`)
                    }else{
                        fs.writeFileSync("manuscript.md", `<center> <h3> Version: ${object.version} </h3></center><br>`)
                    }
                }else if (object.date != ""){
                    fs.writeFileSync("manuscript.md", `<center><h4> ${object.date} </h4></center><br>`)
                }
            }
    }
    function authors(object) {
        let authors_array=object.authors;
        if (authors_array.length>=1){
                if (authors_array.length > 1) {
                    titre = "Authors";
                } else {
                    titre = "Author";
                }fs.appendFileSync("manuscript.md", `<h2> ${titre} : </h2> <br> `)
                for (let i=0; i<authors_array.length; i++) {
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
        let description_string=object.description
        if (description_string.length >0) {
            fs.appendFileSync("manuscript.md",`\n\n<br> <h2> Description :</h2> <br> ${object.description}`)
        }
    }
    function requirements(object) {
        let requirements_array=object.requirements;
        if (requirements_array.length>=1){
            if (requirements_array.length > 1){
                titre="Requirements";
            } else{
                titre = "Requirement";
            }fs.appendFileSync("manuscript.md", `\n<h2> <br>${titre} :</h2> <br>`)
            for (let i=0; i<requirements_array.length; i++){
                fs.appendFileSync("manuscript.md",`\n\n* ${requirements_array[i]}`)
            } 
        }
    }
    heading(object)
    authors(object)
    description(object)
    requirements(object)
}





// ConvertToMarkdown(object2)


//REFRENCES:
//HEADING:fs.writeFileSync("manuscript.md", `<center> <h1> ${object.title} </h1><h3> Version: ${object.version} </h3><h4> ${object.date} </h4></center><br>`)


module.exports = { ConvertToMarkdown };