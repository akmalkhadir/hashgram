// Import encryption modules
var nacl = require(['../node_modules/tweetnacl/nacl'])
nacl.util = require(['../node_modules/tweetnacl-util/nacl-util'])
let secretKey
const newNonce = () => nacl.randomBytes(nacl.secretbox.nonceLength)

// Generate random key
const generateKey = () => {secretKey = nacl.util.encodeBase64(nacl.randomBytes(nacl.secretbox.keyLength))}

// Generate key based on userinput, MUST be exactly 32 char
// const generateKey = (input) => {secretKey = nacl.util.encodeBase64(nacl.util.decodeUTF8(input))}

const encrypt = (message, key) => {
    let utf8message = nacl.util.decodeUTF8(message)
    let utf8key = nacl.util.decodeBase64(key)
    let nonce = newNonce()
    let box = nacl.secretbox(utf8message, nonce, utf8key)

    let fullMessage = new Uint8Array(nonce.length + box.length)
    fullMessage.set(nonce)
    fullMessage.set(box, nonce.length)
    return nacl.util.encodeBase64(fullMessage)
}

const decrypt = (ciphertext, key) => {
    let utf8key = nacl.util.decodeBase64(key)
    let utf8message = nacl.util.decodeBase64(ciphertext)
    let nonce = utf8message.slice(0, nacl.secretbox.nonceLength)
    let message = utf8message.slice(nacl.secretbox.nonceLength, ciphertext.length)

    let decrypted = nacl.secretbox.open(message, nonce, utf8key)

    return nacl.util.encodeUTF8(decrypted)
}