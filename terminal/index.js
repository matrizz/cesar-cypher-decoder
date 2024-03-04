const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Insira o texto criptografado: ', (encrypted) => {
    rl.question('Insira o texto original: ', (original) => {
        // Faz um loop para cada chave de 0 a 25
        for (let cesarKey = 0; cesarKey < 26; cesarKey++) {
            // Descriptografa o texto criptografado
            const decrypted = decrypt(encrypted, cesarKey)
            // Verifica se o texto descriptografado bate com o texto original
            if (decrypted === original) {
                // Se for encontrada, faz um log e finaliza o rl
                console.log(`A chave utilizada foi: ${cesarKey}`)
                rl.close()
                return
            }
        }
        // Se não for encontrada, faz um log e finaliza o rl
        console.log('Chave não encontrada.')
        rl.close()
    })
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
