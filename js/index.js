let currentUserId

// Sidebar Elements
const chatRoomListEl = document.querySelector('.sidebar_chatroom_list')
const sidebar = document.querySelector(".sidebar")
const logoutBtn = document.querySelector("#logoutBtn")

// Navbar Elements
const navbarButtons = document.querySelector('#mainNavbar')
const navbarChatButton = navbarButtons.querySelector('.create_new_chat_btn')

// Chat Window Elements
const chatName = document.querySelector('#chatName')
const chatWindow = document.querySelector('.chat_window')
const chatWindowMessagesEl = document.querySelector('#chat_window_messages')
const chatWindowInput = document.querySelector('#chat_window_input')

// Modal (hidden elements)
const createChatPopUp = document.querySelector('#createChatPopUp')
const closeChatPopUp = document.querySelector('#closeChatPopUp')
const participantNameInput = document.querySelector('#participant_name')
const participantDropdown = document.querySelector('#participant_dropdown')
const chatNameInput = document.querySelector('#chat_name_input')
const submitNewChat = createChatPopUp.querySelector('#submit_new_chat')
const lock = document.querySelector("#lock")
let loginform

// LocaL Data
let localData = {
  currentUser: {},
  chatrooms: [],
  currentRoomId: 0,
  currentRoom: {},
  currentRoomMessages: [],
  otherUsers: []
}

// Login Window

const renderLoginBox = () => {
  chatWindowMessagesEl.innerHTML = `
  <div id="login" class="box">
  <h2 class="subtitle">Enter your username and password to continue.</h2>
  <form id="login-form">
    <div class="field">
    <label class="label">Username</label>
        <p class="control has-icons-left">
        <input id="username" name="username" class="input" type="text" placeholder="Username">
        <span class="icon is-small is-left">
            <i class="fas fa-user-secret"></i>
        </span>
        <span class="icon is-small is-right">
            <i class="fas"></i>
        </span>
        </p>
    </div>
    <div class="field">
    <label class="label">Password</label>
        <p class="control has-icons-left">
        <input id="password" name="password" class="input" type="password" placeholder="Password">
        <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
        </span>
        </p>
    </div>
    <div class="field">
        <button type="submit" id="login_button" class="button is-primary">Log In</a>
    </div>
    </form>
    <div class="field">
        <button id="signup_button" class="button is-link">Sign Up</a>
    </div>
</div>
  `
  loginform = document.querySelector("#login-form")
}

// const checkUserExistAndAssignId = usernameInput => {
//   API.getUsers()
//     .then(users => {
//       let exist = users.map(user => user.username).includes(usernameInput)
//       if (exist) {
//         let foundUser = users.find(user => user.username === usernameInput)
//         currentUserId = sessionStorage/
//       } else {
//         createUser({ username: usernameInput })
//         getUsers()
//           .then(users => {
//             currentUserId = users.find(user => user.username === usernameInput).id
//           })
//       }
//     })
// }

// Global Event Listeners
// Create New Chat Button Listener

const toggleModal = () => createChatPopUp.classList.toggle('is-active')

navbarChatButton.addEventListener('click', event => {
  toggleModal()
})

closeChatPopUp.addEventListener('click', () => {
  toggleModal()
})

submitNewChat.addEventListener('click', event => {
  let chatNameInputValue = chatNameInput.value
  let otherParticipantId = localData.otherUsers.find(user => user.username === participantDropdown.value).id
  let newChatroom = {
    name: chatNameInputValue,
    users: `${sessionStorage.id}, ${otherParticipantId}`
  }
  API.createChatroom(newChatroom)
    .then(() => {
      API.getUser(sessionStorage.id).then(user => {
        localData.currentUser = user
        localData.chatrooms = [...localData.currentUser.chatrooms]

        renderChatRoomListItems(localData.chatrooms)
        localData.currentRoomId = localData.chatrooms.slice(-1)[0].id
        getChatroomData()
        toggleModal()
      })
    })
})

// Sidebar - Chatroom Names
//  Render Single Chatroom Name
const renderChatRoomListItem = chatroom => {
  let chatRoomListItem = document.createElement('li')
  chatRoomListItem.dataset.roomId = chatroom.id
  chatRoomListItem.innerHTML = `
  <a href="#">#${chatroom.name}</a>
  `
  chatRoomListEl.appendChild(chatRoomListItem)

  chatRoomListItem.addEventListener('click', event => {
    console.log('click')
    localData.currentRoomId = parseInt(
      event.target.parentElement.dataset.roomId
    )
    console.log(localData.currentRoomId)
    chatWindowMessagesEl.innerHTML = ``
    getChatroomData()
  })
}

// Render all Chatrooms Name
const renderChatRoomListItems = chatrooms => {
  chatRoomListEl.innerHTML = ``
  chatrooms.forEach(chatroom => renderChatRoomListItem(chatroom))
}

// Chat Window
// Render a message
const renderMessage = message => {
  let roomUsers = localData.currentRoom.users
  let sender = roomUsers.find(user => user.id === message.sender_id)

  let messageItem = document.createElement('article')
  messageItem.className = 'chat_messages_item media'
  messageItem.dataset.messageId = message.id
  messageItem.innerHTML = `
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://api.adorable.io/avatars/128/${sender.id}@adorable.io.png" class="user_avatar">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p><strong class="sender_username">${sender.username}</strong></p>
      <p class="message_text">${message.message}</p>
    </div>
  </div>
  `
  chatWindowMessagesEl.appendChild(messageItem)
}

// Render all Messages
const renderMessages = messages => {
  chatName.innerText = `#${localData.currentRoom.name}`
  chatWindowMessagesEl.innerHTML = ``
  messages.forEach(message => renderMessage(message))
}

// Helper functions

// Refresh

// Clear chat window
const clearChatWindow = () => {
  chatWindowMessagesEl.innerHTML = `
  <div class="box">
  <h2>Please select or create a chatroom to start</h2>
  <button class="button create_new_chat_btn">Create New</button>
  </div>
  `

  chatWindow
    .querySelector('.create_new_chat_btn')
    .addEventListener('click', event => {
      toggleModal()
    })
}

// Render Chat Window input

const renderChatWindowInput = () => {
  chatWindowInput.innerHTML = `
  <article class="media">

    <figure class="media-left">
      <p class="image is-64x64">
        <img src="https://api.adorable.io/avatars/128/${sessionStorage.id}@adorable.io.png">
      </p>
    </figure>

    <div class="media-content">
      <div class="field">
        <p class="control">
          <textarea id="message_text_input" class="textarea" placeholder="Type your secret message here..."></textarea>
        </p>
      </div>

      <div class="field">
        <p class="control">
          <button id="send_button" class="button">Send Message</button>
        </p>
      </div>
    </div>
  </article>
  `

  chatWindowInput.querySelector('#send_button').addEventListener('click', event => {
    let messageText = chatWindowInput.querySelector('#message_text_input').value
    let receiverId = localData.currentRoom.users.find(user => user.id !== sessionStorage.id).id
    let newMessage = {
      sender: sessionStorage.id,
      receiver: receiverId,
      chatroom: localData.currentRoomId,
      message: messageText
    }
    API.createMessage(newMessage)
      .then(() => {
        chatWindowInput.querySelector('#message_text_input').value = ``
        chatWindowMessagesEl.innerHTML = ``
        getChatroomData()
      })
  })
}

// Fetch chat room messages and render
const getChatroomData = () =>
  setInterval(() => {API.getChatroom(localData.currentRoomId)
    .then(chatroom => {
      let conn = API.openConnection()
      console.log(conn)
      localData.currentRoom = chatroom
      localData.currentRoomMessages = chatroom.messages
      renderMessages(localData.currentRoomMessages)}, 1000)
      renderChatWindowInput();
    })

// Render participant selection dynamically for modal

participantNameInput.addEventListener('keyup', () => {
  console.log(participantNameInput.value)
  let filter = participantNameInput.value
  const filteredNames = localData.otherUsers.filter(
    user => user.username.toLowerCase().includes(filter.toLowerCase())
  ).map(user => user.username)
  renderDropdown(filteredNames)
})

const renderDropdown = (names) => {
  participantDropdown.innerHTML = ``
  names.forEach(username => {
    addNameToList(username)
  })
}

const addNameToList = name => {
  let newSelection = document.createElement('option')
  newSelection.innerText = name
  participantDropdown.appendChild(newSelection)
}

participantDropdown.addEventListener('change', event => {
  let chosenParticipantName = event.target.value
})

const toggleSidebars = () => {
    navbarChatButton.classList.toggle("is-hidden")
    sidebar.classList.toggle("is-hidden")
    lock.classList.toggle("is-hidden")
}

// Initial call on load
const initialLoad = () => {
  API.getUser(sessionStorage.id).then(user => {
    toggleSidebars()
    localData.currentUser = user
    localData.chatrooms = [...localData.currentUser.chatrooms]
    renderChatRoomListItems(localData.chatrooms)
    clearChatWindow()
    API.getUsers().then(users => {
      let allUsers = users
      localData.otherUsers = allUsers.filter(user => user.id !== sessionStorage.id)
    })
  })
}

const attachEventListener = () => {
    if(loginform){
    loginform.addEventListener('submit', event => {
        event.preventDefault()
        let body = {
            username: loginform.username.value,
            password: loginform.password.value
        }
        API.signin(body)
        .then(resp => {
            if (resp.error) {
                alert(resp.error)
            } else {
                loginform.reset()
                sessionStorage.setItem("token", resp.token)
                sessionStorage.setItem("id", resp.id)
                initialLoad()
            }
        })
    })}

    document
    .addEventListener("click", event => {
        if (event.target.id === "logoutBtn") {
            toggleSidebars()
            sessionStorage.clear()
            renderLoginBox()
        } else if (event.target.id === "signup_button"){
            let body = {
                username: loginform.username.value,
                password: loginform.password.value
            }
            API.signup(body)
            .then(resp => {
                if (resp.error) {
                    alert(resp.error)
                } else {
                    loginform.reset()
                    sessionStorage.setItem("token", resp.token)
                    sessionStorage.setItem("id", resp.id)
                    initialLoad()
                }
            })
        }
    })
}


if (!sessionStorage.token){
    renderLoginBox()
} else {initialLoad()}


attachEventListener()



