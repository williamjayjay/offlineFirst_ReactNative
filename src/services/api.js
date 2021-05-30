import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.18.8:3333', 
  // http://192.xxx.xx.xx:3000/user/
  //IP DA MAQUINA LOCAL PARA UTILIZAR DISPOSITIVO FÍSICO
  //LOCALHOST PARA UTILIZAR EMULADORES

})

export default api