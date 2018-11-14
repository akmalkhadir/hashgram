let currentUserId = 2

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

// LocaL Data
let localData = {
  currentUser: {},
  chatrooms: [],
  currentRoomId: 0,
  currentRoom: {},
  currentRoomMessages: []
}

// Global Event Listeners
// Create New Chat Button Listener
navbarChatButton.addEventListener('click', event => {
  console.log(event)
  createChatPopUp.className += 'is-active'
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
  chatName.innerText = localData.currentRoom.name
  messages.forEach(message => renderMessage(message))
}

// Helper functions
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
      console.log(event)
      createChatPopUp.className += 'is-active'
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

// Initial call on load
getUser(currentUserId).then(user => {
  localData.currentUser = user
  localData.chatrooms = [...localData.currentUser.chatrooms]
  renderChatRoomListItems(localData.chatrooms)
  clearChatWindow()
})
