const privateKey = document.querySelector("#private-key")
const public = document.querySelector("#public-key")
const messageList = document.querySelector("#messages")
const messageForm = document.querySelector("#message-form")
const inputField = document.querySelector("#message-input")

messageForm.addEventListener("submit", event => {
    event.preventDefault()
    let el = document.createElement("li")
    el.id = "message"
    el.innerText = encrypt(inputField.value, secretKey)
    messageList.appendChild(el)
    messageForm.reset()
})

const createElement = () => {
    let el = document.createElement("li")
    return el
}

document.addEventListener("click", event => {
    if (event.target.id === "generateKeys"){
        generateSignKey()
        privateKey.innerHTML = `
            Key: ${secretKey}
        `
    } else if (event.target.id === "decryptMessage") {
        let arr = document.querySelectorAll('#message')
        arr.forEach(element => {
            element.className = "decryptedMessage"
            element.innerText = decrypt(element.innerText, secretKey)})
    }
})