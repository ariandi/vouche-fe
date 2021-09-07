import Axios from 'axios'

const baseUrl = 'http://localhost:3000/api/v1/';

export function getAllChatByRoom(room_id){
  return new Promise((res, rej) => {
    Axios.get(baseUrl + 'chats?room_id=' + room_id)
      .then((response) => {
        res(response.data)
      })
      .catch((e) => {
        rej(e.response.data);
      });
  })
}

export function createChat(params){
  return new Promise((res, rej) => {
    Axios.post(baseUrl + 'chats', params)
        .then((response) => {
          res(response.data)
        })
        .catch((e) => {
          rej(e.response.data);
        });
  })
}
