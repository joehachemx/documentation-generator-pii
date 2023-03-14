const fs = require("fs");

object={
    "let a=8;Σif(a>6) {Σ    console.log(\"Hello world \");Σ    a=7Σ}":"This code outputs Hello World if the value of a is greater than 6",
    "let a=7":"this stores 7 in a variable called a",
    "let s=0 Σlet n=10 Σfor (let i=0; i<=n, i++,) {Σ    if (n%2==0){Σ       s=s+1Σ      }Σ   }" : "hi this is a comment for the code above."
}

function filetoMD(object){
    fs.writeFileSync("documentation2.md","")
    for (const key in object){
        code=key.replace(/Σ/g, "\n");
fs.appendFileSync("documentation2.md",`~~~js
${code}
~~~ \n
${object[key]}\n\n<br>\n\n`)
    }
}

filetoMD(object)
