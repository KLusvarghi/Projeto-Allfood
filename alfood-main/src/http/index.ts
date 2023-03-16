import axios from 'axios';

// criando uma instancia do axios
// Recebendo um objeto, podendo ter varias configurações dentro dele, e uma delas é a url base
const http = axios.create({
  baseURL: 'http://localhost:8000/api/v2/'
})

export default http;