const fs = require("fs");

// let arrayOfItemCodes = 
// [
//     itemCode ={
//       id: '500',
//       code: '\n' +
//         '# @/w500 this function is useless\n' +
//         'def jennifer():\n' +
//         '    # @<r400\n' +
//         '    if pierre == cedric: # @/rw checks something useless\n' +
//         '        print("test1")\n' +
//         '    else:\n' +
//         '        print("test2") # @/r\n' +
//         '    # @r>400\n' +
//         '    print("test3")\n' +
//         '# ',
//       explication: 'this function is useless'
//     },
//     itemCode ={
//       id: '400',
//       code: '\n' +
//         '    if pierre == cedric: # @/rw checks something useless\n' +
//         '        print("test1")\n' +
//         '    else:\n' +
//         '        print("test2") # @/r\n' +
//         '    # ',
//       explication: 'tset test'
//     },
//     itemCode ={
//       id: undefined,
//       code: 'if pierre == cedric: #',
//       explication: ' checks something useless'
//     }
//   ]


function convertToMDFile(arrayOfItemCodes) {
  fs.writeFileSync("markdownfile.md","")

  console.log(arrayOfItemCodes)

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