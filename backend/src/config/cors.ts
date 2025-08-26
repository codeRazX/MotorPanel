import { CorsOptions } from 'cors'

const whiteList = [process.env.URL_FRONTEND]

export const corsConfig : CorsOptions= {

  origin: function(origin, cb){
    if (whiteList.includes(origin)){
      cb(null, true)
    } else {
      cb(new Error('No permitido por CORS'))
    }
  }
}