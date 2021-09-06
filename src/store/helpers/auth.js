import { setAuthorization } from "./general"
import Axios from 'axios'

const baseUrl = 'http://localhost:3000/api/v1/';

export function login(credentials){
  return new Promise((res, rej) => {
    Axios.post(baseUrl + 'login', credentials)
        .then((response) => {
          setAuthorization(response.data.token)
          res(response.data)
        })
        .catch((e) => {
          rej(e.response.data);
        })
  })
}

export function getLocalUser(){
  const userStr = localStorage.getItem('uservouch')

  if(!userStr){
    return null
  }

  return JSON.parse(userStr)
}

export function getToken(){
  const token = localStorage.getItem('tokenvouch')

  if(!token){
    return null;
  }

  return token;
}
