let input = document.getElementById("input")
let output = document.getElementById("output")

/* DICCIONARIOS */
const ControlSequences = {
    "to" : "→",
    "pm" : "±",
    "in" : "∈",
    "int": "∫",
    "otimes" : "⊗",
    "tensor" : "⊗",
    "simeq" : "≃",
    "circ": "○",
    "iff": "⇔",
    "implies": "⇒",
    "geq": "≥",
    "leq": "≤",
    "subseteq": "⊆",
    "supseteq": "⊇",
    "mapsto": "↦",
    "cdot": "·",
    "times": "×",
    "coprod": "∐",
    // Script text
    "scrA": "𝓐",
    "scrB": "𝓑",
    "scrC": "𝓒",
    "scrI": "𝓘",
    // mathbb
    "Z": "ℤ",
    "R": "ℝ",
    // Letras griegas
    "alpha": "α",
    "beta": "β",
    "pi": "π",
    "tau": "τ",
    "Pi": "Π",
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

const MathIt = {
        // Letras
        "a": "𝑎", "b": "𝑏", "c": "𝑐", "d": "𝑑", "e": "𝑒",
        "f": "𝑓", "g": "𝑔", "h": "ℎ", "i": "𝑖", "j": "𝑗",
        "k": "𝑘", "l": "𝑙", "m": "𝑚", "n": "𝑛", "o": "𝑜",
        "p": "𝑝", "q": "𝑞", "r": "𝑟", "s": "𝑠", "t": "𝑡",
        "u": "𝑢", "v": "𝑣", "w": "𝑤", "x": "𝑥", "y": "𝑦",
        "z": "𝑧", 
        // Mayúsculas 
        "A": "𝐴", "B": "𝐵", "C": "𝐶", "D": "𝐷", "E": "𝐸",
        "F": "𝐹", "G": "𝐺", "H": "𝐻", "I": "𝐼", "J": "𝐽",
        "K": "𝐾", "L": "𝐿", "M": "𝑀", "N": "𝑁", "O": "𝑂",
        "P": "𝑃", "Q": "𝑄", "R": "𝑅", "S": "𝑆", "T": "𝑇",
        "U": "𝑈", "V": "𝑉", "W": "𝑊", "X": "𝑋", "Y": "𝑌",
        "Z": "𝑍"
}



// Cambiar usando un diccionario
function ReplaceByDict(str, dict){
    const n = str.length
    let NewStr = ""

    for(let i=0; i<n; i++){
        if(str[i] in dict){
            NewStr += dict[str[i]]
        } else {
            NewStr += str[i]
        }
        
    }
    return NewStr
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
    let NewStr = str

    const CsRegex = /\\[a-zA-Z]+|\\./g

    let M = str.match(CsRegex)

    if(M){
        M = M.reverse()
        for(let substr of M){
            let csname = substr.substring(1)
            if(csname in ControlSequences){
                NewStr = NewStr.replaceAll(substr, ControlSequences[csname])
            }
        }
    }


    return NewStr
}


// Cambia los superindices
function ReplaceSupScript(str){
    let NewStr = str

    // Quitar los superindices solo numéricos o de una letra
    let SupRegex  = /\^[0-9]+|\^[a-zA-Z+\-=()/]/g
    let M = str.match(SupRegex)

    if(M){
        for(let substr of M){
            let replace = substr.substring(1)
            replace = ReplaceByDict(replace, SupScript)
            NewStr = NewStr.replaceAll(substr, replace)
        }
    }

    // Quitar los superíndices con llaves
    SupRegex  = /\^{[0-9a-zA-Z+\-=()/]+}/g
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


// Cambia los subindices
function ReplaceSubScript(str){
    let NewStr = str

    // Quitar los superindices solo numéricos o de una letra
    let SupRegex  = /\_[0-9]+|\_[aeh-pr-vx+\-=()]/g
    let M = str.match(SupRegex)

    if(M){
        for(let substr of M){
            let replace = substr.substring(1)
            replace = ReplaceByDict(replace, SubScript)
            NewStr = NewStr.replaceAll(substr, replace)
        }
    }

    // Quitar los superíndices con llaves
    SupRegex  = /\_{[0-9aeh-pr-vx+\-=()]+}/g
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


// Cambiar texto matemático
function ReplaceMath(str){
    let NewStr = str

    const CsRegex = /\$[^\$]+\$/g

    let M = str.match(CsRegex)
    
    if(M){
        for(let substr of M){
            let replace = substr.substring(1, substr.length-1)
            replace = ReplaceByDict(replace, MathIt)
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

    S = cleanInput(S)
    S = stringToHTML(S)
    S = ReplaceControlSequences(S)
    S = ReplaceSupScript(S)
    S = ReplaceSubScript(S)
    S = ReplaceMath(S)

    output.innerHTML = S
}