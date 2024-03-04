const button = document.querySelector('button')
const logs = []


const log = (type, text, color) => {
    if (type === 'html') {
        document.querySelector('.log').innerHTML = text
        color? document.querySelector('p').style.color = color: null
    }
    if (type === 'text') {
        document.querySelector('.log').appendChild(document.createElement('p').textContent = text)
        color? document.querySelector('p').style.color = color : null 
    }
}

const logRegister = (type, text, color) => {
    if (type === 'json') {
        document.querySelector('.log').appendChild(document.createElement('pre').appendChild(document.createElement('code').textContent = JSON.stringify(text, null, 4)))
    }

    document.querySelector('.logs').appendChild(document.createElement('p'))
    document.querySelector('.logs').lastChild.textContent = text
    document.querySelector('.logs').lastChild.style.fontWeight = 'bold'
    color? document.querySelector('.logs').lastChild.style.color = color : null
    logs.push(text)
}

button.addEventListener('click', () => {
    const encrypted = document.querySelector('.in').value
    const original = document.querySelector('.out').value
    // Faz um loop para cada chave de 0 a 25
    for (let cesarKey = 0; cesarKey < 26; cesarKey++) {
        // Descriptografa o texto criptografado
        const decrypted = decrypt(encrypted, cesarKey)
        console.log(decrypted)
        // Verifica se o texto descriptografado bate com o texto original
        if (decrypted === original) {
            // Se for encontrada, faz um log
            log('html', `<p>A chave utilizada foi: ${cesarKey}</p>`, 'green')
            // logRegister(`[LOG] A chave utilizada foi: ${cesarKey}`, 'green')
            logRegister('json', {
                encrypted: encrypted,
                decrypted: original,
                key: cesarKey,
            })
            return
        }
    }
    // Se não for encontrada, faz um log
    log(`Chave não encontrada.`, '', 'red')
    logRegister(`[ERROR] Chave não encontrada.`, 'red')
})

const decrypt = (encrypted, key) => {
    let decrypted = ''
    // Faz um loop para cada caractere do texto
    for (let i = 0; i < encrypted.length; i++) {
        const char = encrypted[i]
        // Verifica se o caractere é uma letra
        if (char.match(/[a-z]/i)) {
            const code = encrypted.charCodeAt(i)
            let newChar
            // Se for uma letra maiúscula
            if (code >= 65 && code <= 90) {
                // Descriptografa com a chave
                newChar = String.fromCharCode(((code - 65 - key + 26) % 26) + 65)
            }
            // Se for uma letra minúscula
            else if (code >= 97 && code <= 122) {
                // Descriptografa com a chave
                newChar = String.fromCharCode(((code - 97 - key + 26) % 26) + 97)
            }
            // Faz um append do caractere descriptografado no texto descriptografado
            decrypted += newChar
        }
        // Se o char não for uma letra faz um append do char no texto descriptografado
        else {
            decrypted += char
        }
    }
    // Retorna o texto descriptografado
    return decrypted
}


// A B C D E F G H I J K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25