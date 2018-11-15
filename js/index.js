let currentUserId = 7

// Sidebar Elements
const chatRoomListEl = document.querySelector('.sidebar_chatroom_list')

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

// LocaL Data
let localData = {
  currentUser: {},
  chatrooms: [],
  currentRoomId: 0,
  currentRoom: {},
  currentRoomMessages: [],
  otherUsers: []
}

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
  let otherParticipantId = localData.otherUsers.find(user => user.name === participantDropdown.value).id
  let newChatroom = {
    name: chatNameInputValue,
    users: `${currentUserId}, ${otherParticipantId}`
  }
  createChatroom(newChatroom)
    .then(() => {
      getUser(currentUserId).then(user => {
        localData.currentUser = user
        localData.chatrooms = [...localData.currentUser.chatrooms]

        renderChatRoomListItems(localData.chatrooms)
        localData.currentRoomId = localData.chatrooms.slice(-1)[0].id
        getChatroomData()
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
        <img src="https://api.adorable.io/avatars/128/${currentUserId}@adorable.io.png">
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
    let receiverId = localData.currentRoom.users.find(user => user.id !== currentUserId).id
    let newMessage = {
      sender: currentUserId,
      receiver: receiverId,
      chatroom: localData.currentRoomId,
      message: messageText
    }
    createMessage(newMessage)
      .then(() => {
        chatWindowInput.querySelector('#message_text_input').value = ``
        chatWindowMessagesEl.innerHTML = ``
        getChatroomData()
      })
  })
}

// Fetch chat room messages and render
const getChatroomData = () =>
  getChatroom(localData.currentRoomId)
    .then(chatroom => {
      localData.currentRoom = chatroom
      localData.currentRoomMessages = chatroom.messages
      renderMessages(localData.currentRoomMessages)
      renderChatWindowInput()
    })

// Render participant selection dynamically for modal

participantNameInput.addEventListener('keyup', () => {
  console.log(participantNameInput.value)
  let filter = participantNameInput.value
  const filteredNames = localData.otherUsers.filter(
    user => user.name.toLowerCase().includes(filter.toLowerCase())
  ).map(user => user.name)
  renderDropdown(filteredNames)
})

const renderDropdown = (names) => {
  participantDropdown.innerHTML = ``
  names.forEach(name => {
    addNameToList(name)
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

// Initial call on load
getUser(currentUserId).then(user => {
  localData.currentUser = user
  localData.chatrooms = [...localData.currentUser.chatrooms]
  renderChatRoomListItems(localData.chatrooms)
  clearChatWindow()
  getUsers().then(users => {
    let allUsers = users
    localData.otherUsers = allUsers.filter(user => user.id !== currentUserId)
  })
})
