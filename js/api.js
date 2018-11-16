class API {
    static init () {
      this.baseUrl = 'https://hashgram-backend.herokuapp.com/api/v1'
      this.signinUrl = this.baseUrl + '/signin'
      this.validateUrl = this.baseUrl + '/validate'
      this.signupUrl = this.baseUrl + '/signup'
      this.usersUrl = this.baseUrl + '/users'
      this.chatroomsUrl = this.baseUrl + '/chatrooms'
      this.messagesUrl = this.baseUrl + '/messages'
      this.connection = "ws://hashgram-backend.herokuapp.com/cable"
    }
  
    // Authentication Calls

    static signin (body) {
      return fetch(this.signinUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      }).then(resp => resp.json())
    }
  
    static validate () {
      const token = localStorage.getItem('token')
      return fetch(this.validateUrl, {
        headers: {'Authorization': token}
      }).then(resp => resp.json())
    }
  
    static signup (body) {
        return fetch(this.signupUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    // User Calls

    static getUser (userId) {
        return fetch(this.usersUrl + `/${userId}`)
        .then(resp => resp.json())
    }

    static getUsers () {
        return fetch(this.usersUrl)
        .then(resp => resp.json())
    }

    static deleteUser (userId) {
        fetch(this.usersUrl + `/${userId}`, {
            method: "DELETE"
        })
    }

    // Chatrooms Call

    static getChatroom (roomId) {
        return fetch(this.chatroomsUrl + `/${roomId}`)
        .then(resp => resp.json())
    }

    static createChatroom (chatroom) {
      const token = sessionStorage.getItem('token')
        return fetch(this.chatroomsUrl, {
            method: "POST",
            headers: {'Content-Type': 'application/json',
                      "Authorization": token},
            body: JSON.stringify(chatroom)
        })
    }

    static createMessage (message) {
        return fetch(this.messagesUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(message)
        })
    }

    static openConnection () {
      fetch(this.connection, {
        "command":"subscribe",
        "identifier": {"channel": "ChatroomsChannel"}
      })
    }
  }
  
  API.init()


//   const generateSignKey = () => {
//     return fetch("https://us-central1-hashgram-222609.cloudfunctions.net/generateSignKey")
//     .then(res=> res.json())
//     .then((res) => secretKey = Object.values(res))
// }