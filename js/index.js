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
}

// Render all Chatrooms Name
const renderChatRoomListItems = chatrooms => {
  chatrooms.forEach(chatroom => renderChatRoomListItem(chatroom))
}

// Render one a message
const renderMessage = (message) => {
  let messageItem = document.createElement('article')
  messageItem.className = 'chat_messages_item media'
  messageItem.dataset.messageId = message.id
  messageItem.innerHTML = `
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://avatars1.githubusercontent.com/u/1881633?s=88&v=4" class="user_avatar">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p><strong class="user_name">Akmal Khadir</strong></p>
      <p class="message_text">vdfjkbvjfdvbdfbvd vdksv dsc kn m5 43nkt hjf erkg rh t34. 543hjr 43 34nr j f4k 5h34r 3knr ;h23 r32nk 32;k rnk34;r 34n 4;3k 543nkr n34r3qnkr</p>
    </div>
  </div>
  `
  chatRoomListEl.appendChild(chatRoomListItem)
}

const clearChatWindow = () => {
  chatWindow.innerHTML = `
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
    clearChatWindow()
  })
