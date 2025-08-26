import axios, { isAxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
  config.withCredentials = true
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response){
     
      if( error.status === 401 && error.response.data.message.includes(String(import.meta.env.VITE_SESSION_ERROR))){
        window.location.replace('/auth/login')
        return
      }
    }

    return Promise.reject(error)
  }
)

export default api