
let input = document.getElementById("input")
let output = document.getElementById("output")



/* FUNCIONES AUXILIARES */

// Reemplaza una cadena por otra globalmente
function globalReplace(str, findStr, replaceStr) {
    let regex = new RegExp(findStr, "g")

    return str.replace(regex, replaceStr)
}

// Determina si el carácter es letra
function isLetter(C) {
    if(C.match(/[a-z]/i)){
        return true
    } else {
        return false
    }
}

// Obtiene el siguiente token de una cadena y el resto de la cadena
function getNextToken(str) {

    let idx = 1
    
    if(str.length>1) {
        if(str[idx-1]=="\\"){
            idx++
            if(idx<str.length && isLetter(str[idx-1]) && isLetter(str[idx])){
                do {
                    idx++
                } while(idx<str.length && isLetter(str[idx]))
            }
        }
    }


    let NextToken = str.substring(0,idx)
    let RestString = str.substring(idx)

    return {NextToken, RestString}
}




/* FUNCIONES ESTILIZADO */

// Limpia la entrada html y lo convierte a texto
function cleanInput(str) {

    str = globalReplace(str, "<br>", "\n")
    str = globalReplace(str, "&nbsp;", " ")

    /*if(str[0]=="\n"){
        str = str.substring(1)
    }*/

    return str
}

// Convierte un texto a html
function stringToHTML(str) {
    str = globalReplace(str, "\n", "<br>")

    return str
}


// Agrega estilo a los comandos
function prettyCommand(str) {
    let newS = ""

    while(str.length>0){
        let ReadToken = getNextToken(str)

        NextToken = ReadToken.NextToken
        str = ReadToken.RestString

        if(NextToken[0]=="\\"){
            NextToken = "<b style='color:red'>" + NextToken + "</b>"
        }

        newS += NextToken
    }

    return newS
}





/* PROGRAMACIÓN */


// FUNCIÓN listener
input.addEventListener("input", EventFunction)

function EventFunction(element) {
    let S = element.srcElement.innerHTML
    
    console.log([S])

    S = cleanInput(S)

    console.log([S])
    //console.log(S)
    
    S = stringToHTML(S)
    output.innerHTML = prettyCommand(S)
}