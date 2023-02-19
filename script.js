let input = document.getElementById("input")
let output = document.getElementById("output")

/* DICCIONARIOS */
const ControlSequences = {
    "to" : "→",
    "pm" : "±",
    "in" : "∈",
    "int": "∫"
}

const SupScript = {
    // Números
    "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
    "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
    // Símbolos
    "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾",
    "/": "ᐟ",
    // Letras
    "a": "ᵃ", "b": "ᵇ", "c": "ᶜ", "d": "ᵈ", "e": "ᵉ",
    "f": "ᶠ", "g": "ᵍ", "h": "ʰ", "i": "ⁱ", "j": "ʲ",
    "k": "ᵏ", "l": "ˡ", "m": "ᵐ", "n": "ⁿ", "o": "ᵒ",
    "p": "ᵖ", "q": "ꝰ", "r": "ʳ", "s": "ˢ", "t": "ᵗ",
    "u": "ᵘ", "v": "ⱽ", "w": "ʷ", "x": "ˣ", "y": "ʸ",
    "z": "ᶻ",
    // Mayúsculas
    "A": "ᴬ", "B": "ᴮ", "C": "ᶜ", "D": "ᴰ", "E": "ᴱ",
    "F": "ᶠ", "G": "ᴳ", "H": "ᴴ", "I": "ᴵ", "J": "ᴶ",
    "K": "ᴷ", "L": "ᴸ", "M": "ᴹ", "N": "ᴺ", "O": "ᴼ",
    "P": "ᴾ", "Q": "ᶿ", "R": "ᴿ", "S": "ˢ", "T": "ᵀ",
    "U": "ᵁ", "V": "ⱽ", "W": "ᵂ", "X": "ˣ", "Y": "ᵞ",
    "Z": "ᶻ"
}

const SubScript = {
    // Números
    "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
    "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
    // Símbolos
    "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎",
    // Letras
    "a": "ₐ",
    "e": "ₑ",
    "h": "ₕ", "i": "ᵢ", "j": "ⱼ", "k": "ₖ", "l": "ₗ", "m": "ₘ", "n": "ₙ", "o": "ₒ", "p": "ₚ",
    "r": "ᵣ", "s": "ₛ", "t": "ₜ", "u": "ᵤ", "v": "ᵥ",
    "x": "ₓ"
}

// Cambiar usando un diccionario
function ReplaceByDict(str, dict){
    const n = str.length
    let NewStr = ""

    for(let i=0; i<n; i++){
        NewStr += dict[str[i]]
    }
    return NewStr
}

// Determina si el carácter es letra
function isLetter(C) {
    const LetterRegex = /[a-z,A-Z]/
    
    return LetterRegex.test(C)
}


// Obtiene el siguiente token de una cadena y el resto de la cadena
function getNextToken(str) {
    const n = str.length

    if(n==0){
        return {Token: str, TypeToken: undefined, RestString: str}
    }

    const l = str[0] 

    if(isLetter(l)){
        return {Token: l, TypeToken: "Letter", RestString: str.substring(1)}
    }

    switch(l){
        case "\\":
            const CsRegex = /\\[a-z,A-Z]+|\\./
            const CS = str.match(CsRegex)[0]

            return {Token: CS, TokenName: CS.substring(1), TypeToken: "ControlSequence", RestString: str.substring(CS.length)}
        
        case "$":
            return {Token: l, TypeToken: "MathDelimiter", RestString: str.substring(1)}

        case "{":
            return {Token: l, TypeToken: "OpenDelimiter", RestString: str.substring(1)}
    
        case "}":
            return {Token: l, TypeToken: "CloseDelimiter", RestString: str.substring(1)}

        default:
            return {Token: l, TypeToken: "Other", RestString: str.substring(1)}
    }
}




/* FUNCIONES ESTILIZADO */

// Limpia la entrada html y lo convierte a texto
function cleanInput(str) {

    str = str.replaceAll("<br>", "\n")
    str = str.replaceAll("&nbsp;", " ")

    return str
}

// Convierte un texto a html
function stringToHTML(str) {
    str = str.replaceAll("\n", "<br>")

    return str
}


// Cambia los comandos
function ReplaceControlSequences(str) {
    let newS = ""

    while(str.length>0){
        let Token = getNextToken(str)
        let Replace = Token.Token

        if((Token.TypeToken=="ControlSequence") && (Token.TokenName in ControlSequences)){
            Replace = ControlSequences[Token.TokenName]
        }

        newS += Replace
        str = Token.RestString
    }

    return newS
}


function ReplaceSupScript(str){
    let NewStr = str

    // Quitar los superindices solo numéricos o de una letra
    let SupRegex  = /\^[0-9]+|\^[a-z,A-Z,+,\-,=,(,),/]/g
    let M = str.match(SupRegex)

    if(M){
        for(let substr of M){
            let replace = substr.substring(1)
            replace = ReplaceByDict(replace, SupScript)
            NewStr = NewStr.replaceAll(substr, replace)
        }
    }

    // Quitar los superíndices con llaves
    SupRegex  = /\^{[0-9,a-z,A-Z,+,\-,=,(,),/]+}/g
    M = str.match(SupRegex)
    
    if(M){
        for(let substr of M){
            let replace = substr.substring(2,substr.length-1)
            replace = ReplaceByDict(replace, SupScript)
            NewStr = NewStr.replaceAll(substr, replace)
        }
    }
    
    return NewStr
}

function ReplaceSubScript(str){
    let NewStr = str

    // Quitar los superindices solo numéricos o de una letra
    let SupRegex  = /\_[0-9]+|\_[a,e,h-p,r-v,x,+,\-,=,(,)]/g
    let M = str.match(SupRegex)

    if(M){
        for(let substr of M){
            let replace = substr.substring(1)
            replace = ReplaceByDict(replace, SubScript)
            NewStr = NewStr.replaceAll(substr, replace)
        }
    }

    // Quitar los superíndices con llaves
    SupRegex  = /\_{[0-9,a,e,h-p,r-v,x,+,\-,=,(,)]+}/g
    M = str.match(SupRegex)
    
    if(M){
        for(let substr of M){
            let replace = substr.substring(2,substr.length-1)
            replace = ReplaceByDict(replace, SubScript)
            NewStr = NewStr.replaceAll(substr, replace)
        }
    }
    
    return NewStr
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
    S = ReplaceControlSequences(S)
    S = ReplaceSupScript(S)
    S = ReplaceSubScript(S)

    output.innerHTML = S
}