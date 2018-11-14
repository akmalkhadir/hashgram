let userId = 1

const chatRoomListEl = document.querySelector('.sidebar_chatroom_list')

let localData = {
  currentUser: {},
  chatrooms: [],
  currentRoomId: 0
}

//  Render Single Chatroom Name
const renderChatRoomListItem = (chatroom) => {
  let chatRoomListItem = document.createElement('li')
  chatRoomListItem.dataset.roomId = chatroom.id
  chatRoomListItem.innerHTML = `
  <a href="#">#${chatroom.name}</a>
  `
  chatRoomListEl.appendChild(chatRoomListItem)
}

const renderChatRoomListItems = chatrooms => {
  chatrooms.forEach(chatroom => renderChatRoomListItem(chatroom))
}

getUser(userId)
  .then(user => {
    localData.currentUser = user
    localData.chatrooms = [...localData.currentUser.chatrooms]
    renderChatRoomListItems(localData.chatrooms)
  })
