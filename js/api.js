// User Calls
const getUser = userId =>
  fetch(`http://hashgram-backend.herokuapp.com/api/v1/users/${userId}`)
    .then(resp => resp.json())

const createUser = user =>
  fetch('http://hashgram-backend.herokuapp.com/api/v1/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

const deleteUser = userId =>
  fetch(`http://hashgram-backend.herokuapp.com/api/v1/users/${userId}`, {
    method: 'DELETE'
  })

// Chatrooms Call
const getChatroom = roomId =>
  fetch(`http://hashgram-backend.herokuapp.com/api/v1/chatrooms/${roomId}`)
    .then(resp => resp.json())

const createChatroom = chatroom =>
  fetch('http://hashgram-backend.herokuapp.com/api/v1/chatrooms/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(chatroom)
  })

const createMessage = message =>
    fetch('http://hashgram-backend.herokuapp.com/api/v1/messages/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })

let chatroom1 = {
  name: 'CIA',
  users: '1,6'
}

let message = {
  sender: 1,
  receiver: 6,
  chatroom: 3,
  message: 'wut'
}
