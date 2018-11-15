// Import encryption modules
// var nacl = require(['../node_modules/tweetnacl/nacl'])
// nacl.util = require(['../node_modules/tweetnacl-util/nacl-util'])

// // Temporary setup for the basics
// const privateKey = document.querySelector("#private-key")
// const public = document.querySelector("#public-key")
// const messageList = document.querySelector("#messages")
// const messageForm = document.querySelector("#message-form")
// const inputField = document.querySelector("#message-input")
// let secretKey

// const newNonce = () => nacl.randomBytes(nacl.secretbox.nonceLength);
// const generateSignKey = () => nacl.sign.keyPair();
// const generateBoxKey = () => nacl.box.keyPair();
const generateSignKey = () => {
    fetch("https://us-central1-hashgram-222609.cloudfunctions.net/generateSignKey?=AIzaSyC1zs303mCxvhdhlRLnzyMQ7DdIappyWVs").then(res => res.json())
    .then(res => secretKey = res.split(","))
}

// const encryptMessage = (text, signPriv, boxPub) => {
//     let envelope = {
//         message: {nacl.sign(sign)}
//     }

//     const keyUint8Array = nacl.util.decodeBase64(publickey);

//     const nonce = newNonce();
//     const messageUint8 = nacl.util.decodeUTF8(message);
//     const box = nacl.secretbox(messageUint8, nonce, keyUint8Array);

//     const fullMessage = new Uint8Array(nonce.length + box.length);
//     fullMessage.set(nonce);
//     fullMessage.set(box, nonce.length);

//     const base64FullMessage = nacl.util.encodeBase64(fullMessage);
//     return base64FullMessage;
// }

// const decryptMessage = () => {

// }

// const createEntry = () => {
//     let el = document.createElement("li")
//     let button = document.createElement("button")
//     button.id = "decryptMessage"
//     el.appendChild(button)
//     return el
// }

// messageForm.addEventListener("submit", event => {
//     event.preventDefault()
//     let el = createEntry()
//     el.innerText = encryptMessage(inputField, keyPair.publicKey)
//     messageList.appendChild(el)
//     inputField.clear()
// })

// document.addEventListener("click", event => {
//     if (event.target.id === "generateKeys"){
//         let signPair = generateSignKey()
//         // let boxPair = generateBoxKey()
//         privateKey.innerHTML = `
//             SignKey Private: ${secretKey}
//         `
//         // public.innerHTML = `
//         //     SignKey Public: ${signPair.publicKey}
//         //     BoxKey Public: ${boxPair.publicKey}
        
//     } else if (event.target.id === "decryptMessage") {

//     }
// })
