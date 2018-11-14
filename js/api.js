const getUser = (userId) =>
  fetch(`http://hashgram-backend.herokuapp.com/api/v1/users/${userId}`)
    .then(resp => resp.json())
    .catch(console.log('API Down'))
