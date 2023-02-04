// on fai un algo qui pick le function hasab qd les parenthese bi sakro



// @function -> check if a given string is a palyndrome
// @arg -> name: string
function isPalyndrome(name) {
    let a = name // @var -> store the given string
    let b = name.toString().split('').reverse().join('')

    if (a === b) {
        console.log(true)
    } else {
        console.log(false)
    }
}


isPalyndrome("bob")