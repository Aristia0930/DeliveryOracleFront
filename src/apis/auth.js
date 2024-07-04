import api from 'axios'

export const login =(email,password)=> api.post(`http://localhost:8080/login?email=${email}&password=${password}`)
export const loginStore =(email,password)=> api.post(`http://localhost:8080/loginStore?email=${email}&password=${password}`)

