let userId = 1

const chatRoomListEl = document.querySelector('.sidebar_chatroom_list')
const createChatPopUp = document.querySelector('#createChatPopUp')
const navbarButtons = document.querySelector('#mainNavbar')
const navbarChatButton = navbarButtons.querySelector('.create_new_chat_btn')
const chatWindow = document.querySelector('.chat_window')
const chatWindowMessagesEl = document.querySelector('#chat_window_messages')

let localData = {
  currentUser: {},
  chatrooms: [],
  currentRoomId: 0,
  currentRoom: {},
  currentRoomMessages: []
}

navbarChatButton.addEventListener('click', (event) => {
  console.log(event)
  createChatPopUp.className += 'is-active'
})

//  Render Single Chatroom Name
const renderChatRoomListItem = (chatroom) => {
  let chatRoomListItem = document.createElement('li')
  chatRoomListItem.dataset.roomId = chatroom.id
  chatRoomListItem.innerHTML = `
  <a href="#">#${chatroom.name}</a>
  `
  chatRoomListEl.appendChild(chatRoomListItem)

  chatRoomListItem.addEventListener('click', (event) => {
    console.log('click')
    localData.currentRoomId = parseInt(event.target.parentElement.dataset.roomId)
    console.log(localData.currentRoomId)
    chatWindowMessagesEl.innerHTML = ``
    getChatroomData()
      .then(renderMessages(localData.currentRoomMessages))
  })
}

// Render all Chatrooms Name
const renderChatRoomListItems = chatrooms => {
  chatrooms.forEach(chatroom => renderChatRoomListItem(chatroom))
}

// Render a message
const renderMessage = (message) => {
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

const renderMessages = messages => (
  messages.forEach(message => renderMessage(message))
)

const clearChatWindow = () => {
  chatWindowMessagesEl.innerHTML = `
  <div class="box">
  <h2>Please select or create a chatroom to start</h2>
  <button class="button create_new_chat_btn">Create New</button>
  </div>
  `
  chatWindow.querySelector('.create_new_chat_btn').addEventListener('click', (event) => {
    console.log(event)
    createChatPopUp.className += 'is-active'
  })
}

getUser(userId)
  .then(user => {
    localData.currentUser = user
    localData.chatrooms = [...localData.currentUser.chatrooms]
    renderChatRoomListItems(localData.chatrooms)
  })

const getChatroomData = () =>
  getChatroom(localData.currentRoomId)
    .then(chatroom => {
      localData.currentRoom = chatroom
      localData.currentRoomMessages = chatroom.messages
    })
