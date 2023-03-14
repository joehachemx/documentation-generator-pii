const fs = require('fs');

function fileParser(file) {
    let arrayOfItemCode = []

    let regStart = /(?<=@<r)\w+/
    let regEnd = /(?<=@r>)\w+/

    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) throw err;

        let isReadingFunction = false
        let thisID;

        const lines = data.split('\n');
    


        lines.forEach((line) => {
            if (line.includes("@/w")) {
                let reggg = /@\/?w(\d+)(.*?)$/
                thisID = reggg.exec(line)[1]

                for (let i = 0; i < arrayOfItemCode.length; i++) {
                    if (arrayOfItemCode[i].getId() == thisID) {
                        arrayOfItemCode[i].explication = reggg.exec(line)[2].trim()
                    }
                }


                // prend le cas ou prend le cas ou on met ca avant de initialise code
                // implement "if present"
            }

            if (line.includes("@/rw")) {
                let g = /^([^@]*)@\/rw(.*)$/

                let item = new itemCode()
                item.code = g.exec(line)[1].trim()
                item.explication = g.exec(line)[2]

                arrayOfItemCode.push(item)
            }



            if (line.includes("@<r")) {
                thisID = regStart.exec(line)[0]
                let isPresent = false

                for (let i = 0; i < arrayOfItemCode.length; i++) {
                    if (arrayOfItemCode[i].getId() == thisID) {
                        isPresent = true
                    }
                }

                if (!isPresent) {
                    let item = new itemCode(thisID)

                    let customRegID = `(?<=@<r${thisID})[\\s\\S]*?(?=@r>${thisID})`
                    customRegID = new RegExp(customRegID)

                    item.code = customRegID.exec(data)[0] // format avant de put ici
                    
                    arrayOfItemCode.push(item)
                }
            }
        })


        console.log()
        console.log(arrayOfItemCode)
    })
}




// rah ejwe le code, a arranger avant de commit

class itemCode {
    constructor(id, code, explication) {
      this.id = id; 
      this.code = code;
      this.explication = explication;
    }

    getId() {
        return this.id;
    }
}

/*
parser, lama il trouve un nv id 
il check sil existe dans array
    si existe, il update
    sinon il create a new itemcode object

to get start id (?<=@<r)\w+
to get finish id (?<=@r>)\w+



je extract mnel data block a block of code puis je le format
regex /@<r500([\s\S]*?)@r>500/


get text id @\/?w(\d+)
@\/?w(\d+)(.*?)$ use this


get same line text:
^([^@]*)@\/rw(.*)$
check if @/rw exists, take data w create random id that dont exists




to do:
- format the data !!!
- support mutliple explication on seperate lines



*/



function formatter(itemCode) {
    console.log(itemCode.code)




    
    return itemCode
}



fileParser("example.abc")


module.exports = { fileParser };