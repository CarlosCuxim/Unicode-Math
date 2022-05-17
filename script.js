
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
    let NextToken = ""
    let RestString = ""

    if(str[0]=="\\"){
        if(isLetter(str[1])){
            let idx = 2
            while(idx<str.length && isLetter(str[idx])){
                idx += 1
            }

            NextToken = str.substring(0,idx)
            RestString = str.substring(idx)
            
        } else {
            NextToken = str.substring(0,2)
            RestString = str.substring(2)
        }
    } else {
        NextToken = str[0]
        RestString = str.substring(1)
    }

    return {NextToken, RestString}
}




/* FUNCIONES ESTILIZADO */

// Limpia la entrada html y lo convierte a texto
function cleanInput(str) {

    str = globalReplace(str, "<div><br></div>", "\n")
    str = globalReplace(str, "</div>", "")
    str = globalReplace(str, "<div>", "\n")
    str = globalReplace(str, "&nbsp;", " ")

    return str
}

// Convierte un texto a html
function stringToHTML(str) {
    str = globalReplace(str, "\n", "<br>")

    return str
}


// Agrega estilo a los comandos
function prettyCommand(str) {
    newS = ""

    while(str.length>0){
        if(true){
            newS = newS + str[0]
            str = str.substring(1)
        }
    }

    return newS
}





/* PROGRAMACIÓN */


// FUNCIÓN listener
input.addEventListener("input", EventFunction)

function EventFunction(element) {
    S = element.srcElement.innerHTML
    
    S = cleanInput(S)

    console.log([S])
    console.log(S)
    
    S = stringToHTML(S)
    output.innerHTML = prettyCommand(S)
}