const getUser = (userId) =>
  fetch(`http://hashgram-backend.herokuapp.com/api/v1/users/${userId}`)
    .then(resp => resp.json())

const getChatroom =(roomId) =>
  fetch(`http://hashgram-backend.herokuapp.com/api/v1/chatrooms/${roomId}`)
    .then(resp => resp.json())
