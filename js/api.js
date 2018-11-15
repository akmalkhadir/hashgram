// User Calls
const getUser = userId =>
  fetch(`http://hashgram-backend.herokuapp.com/api/v1/users/${userId}`)
    .then(resp => resp.json())

const getUsers = () =>
  fetch(`http://hashgram-backend.herokuapp.com/api/v1/users/`)
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

const createUsers = users =>
  users.forEach(user => createUser(user))


let newUsers = [
{'name': 'Chet Matityahu', 'username': 'chetmatityahu'},
{'name': 'Lenora Shemmans', 'username': 'lenorashemmans'},
{'name': 'Wainwright Polet', 'username': 'wainwrightpolet'},
{'name': 'Donal Scardefield', 'username': 'donalscardefield'},
{'name': 'Richmound Easson', 'username': 'richmoundeasson'},
{'name': 'Giorgio Barends', 'username': 'giorgiobarends'},
{'name': 'Lolly Choake', 'username': 'lollychoake'},
{'name': 'Vina Attle', 'username': 'vinaattle'},
{'name': 'Niels Brann', 'username': 'nielsbrann'},
{'name': 'Mollee Cohan', 'username': 'molleecohan'},
{'name': 'Ricca Juris', 'username': 'riccajuris'},
{'name': 'Karole Spira', 'username': 'karolespira'},
{'name': 'Pet Olivey', 'username': 'petolivey'},
{'name': 'Del Peyzer', 'username': 'delpeyzer'},
{'name': 'Sherry Frisch', 'username': 'sherryfrisch'},
{'name': 'Van Attiwill', 'username': 'vanattiwill'},
{'name': 'Hymie Chaim', 'username': 'hymiechaim'},
{'name': "Aida O'Donnelly", 'username': "aidao'donnelly"},
{'name': 'Lory Grube', 'username': 'lorygrube'},
{'name': 'Reggis Sier', 'username': 'reggissier'},
{'name': 'Yolanda Amberg', 'username': 'yolandaamberg'},
{'name': 'Harp Ramel', 'username': 'harpramel'},
{'name': 'Nevsa Semeradova', 'username': 'nevsasemeradova'},
{'name': 'Margy Poytress', 'username': 'margypoytress'},
{'name': 'Milo Berndtsson', 'username': 'miloberndtsson'},
{'name': 'Jay Ganley', 'username': 'jayganley'},
{'name': 'Rikki Capelen', 'username': 'rikkicapelen'},
{'name': 'Deanna Hughill', 'username': 'deannahughill'},
{'name': 'Mace Tunnah', 'username': 'macetunnah'},
{'name': 'Arron Dormand', 'username': 'arrondormand'},
{'name': 'Davey Easdon', 'username': 'daveyeasdon'},
{'name': 'Gipsy Searjeant', 'username': 'gipsysearjeant'},
{'name': 'Corrie Djurdjevic', 'username': 'corriedjurdjevic'},
{'name': 'Ruby Bestall', 'username': 'rubybestall'},
{'name': 'Andrei Blodgett', 'username': 'andreiblodgett'},
{'name': 'Garreth Ladbrook', 'username': 'garrethladbrook'},
{'name': 'Jeddy Sisey', 'username': 'jeddysisey'},
{'name': 'Doralyn McElhargy', 'username': 'doralynmcelhargy'},
{'name': 'Kass Covendon', 'username': 'kasscovendon'},
{'name': 'Albie Aasaf', 'username': 'albieaasaf'},
{'name': 'Milo Beathem', 'username': 'milobeathem'},
{'name': 'Powell Plumley', 'username': 'powellplumley'},
{'name': 'Sally Enion', 'username': 'sallyenion'},
{'name': 'Milicent Mallinder', 'username': 'milicentmallinder'},
{'name': 'Hale Cromleholme', 'username': 'halecromleholme'},
{'name': 'Carolee Gillfillan', 'username': 'caroleegillfillan'},
{'name': 'Francisca Paolacci', 'username': 'franciscapaolacci'},
{'name': 'Libby Learmonth', 'username': 'libbylearmonth'},
{'name': 'Onfroi Wittleton', 'username': 'onfroiwittleton'},
{'name': 'Aluin MacTerrelly', 'username': 'aluinmacterrelly'},
{'name': 'Nelie Labbett', 'username': 'nelielabbett'},
{'name': 'Kaiser Spridgen', 'username': 'kaiserspridgen'},
{'name': 'Tine Cicutto', 'username': 'tinecicutto'},
{'name': 'Shae Tabram', 'username': 'shaetabram'},
{'name': 'Nelly Blethyn', 'username': 'nellyblethyn'},
{'name': 'Tilly Avieson', 'username': 'tillyavieson'},
{'name': 'Suzette Goodred', 'username': 'suzettegoodred'},
{'name': 'Roseanna Arpin', 'username': 'roseannaarpin'},
{'name': 'Charlie Beltzner', 'username': 'charliebeltzner'},
{'name': 'Libby Roglieri', 'username': 'libbyroglieri'},
{'name': 'Lenore Gocher', 'username': 'lenoregocher'},
{'name': 'Sela Sloss', 'username': 'selasloss'},
{'name': 'Jemima Dable', 'username': 'jemimadable'},
{'name': 'Godfrey Housby', 'username': 'godfreyhousby'},
{'name': 'Caz Chooter', 'username': 'cazchooter'},
{'name': 'Jammal Quixley', 'username': 'jammalquixley'},
{'name': 'Perla Doughty', 'username': 'perladoughty'},
{'name': 'Garnette Bosket', 'username': 'garnettebosket'},
{'name': 'Mortie Gallandre', 'username': 'mortiegallandre'},
{'name': 'Tabatha Maylin', 'username': 'tabathamaylin'},
{'name': 'Caritta Harber', 'username': 'carittaharber'},
{'name': 'Townie Sumner', 'username': 'towniesumner'},
{'name': 'Amby Taile', 'username': 'ambytaile'},
{'name': 'Merrile Shimoni', 'username': 'merrileshimoni'},
{'name': 'Theadora Matuska', 'username': 'theadoramatuska'},
{'name': 'Jobie Gogie', 'username': 'jobiegogie'},
{'name': 'Holden Leigh', 'username': 'holdenleigh'},
{'name': 'Coral Di Nisco', 'username': 'coraldinisco'},
{'name': 'Armin Cisland', 'username': 'armincisland'},
{'name': 'Zola Woodrough', 'username': 'zolawoodrough'},
{'name': 'Ronda Keyte', 'username': 'rondakeyte'},
{'name': 'Constanta Drugan', 'username': 'constantadrugan'},
{'name': 'Nicola Mewrcik', 'username': 'nicolamewrcik'},
{'name': 'Brooke Schule', 'username': 'brookeschule'},
{'name': 'Ertha Manjot', 'username': 'erthamanjot'},
{'name': 'Audrey Robelow', 'username': 'audreyrobelow'},
{'name': 'Donna Fealey', 'username': 'donnafealey'},
{'name': 'Alasdair Twist', 'username': 'alasdairtwist'},
{'name': 'Louie Wallen', 'username': 'louiewallen'},
{'name': 'Nessy Kernley', 'username': 'nessykernley'},
{'name': 'Chery Orris', 'username': 'cheryorris'},
{'name': 'Alicia Davenhall', 'username': 'aliciadavenhall'},
{'name': 'Dominique Formigli', 'username': 'dominiqueformigli'},
{'name': 'Farlee Maynell', 'username': 'farleemaynell'},
{'name': 'Lucina Gonnin', 'username': 'lucinagonnin'},
{'name': 'Yolanthe Rudge', 'username': 'yolantherudge'},
{'name': 'Devondra Pendleberry', 'username': 'devondrapendleberry'},
{'name': 'Way Coushe', 'username': 'waycoushe'}]
