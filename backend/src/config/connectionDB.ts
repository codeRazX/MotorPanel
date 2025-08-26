import mongoose  from "mongoose";
import colors from 'colors'
import 'dotenv/config'

(() => {

  const connection = async () => {
    try{
      if (!process.env.NODE_ENV){
        console.log(colors.bgRed.bold('Environment variable NODE_ENV not found! Check this!'))
        process.exit(1)
      }

      const connectionString = ['dev', 'test'].includes(process.env.NODE_ENV) ? 
      process.env.DATABASE_URI_DEV : 
      process.env.DATABASE_URI_PROD

      if (!connectionString){
        process.exit(1)
      }

      await mongoose.connect(connectionString)
      console.log(colors.bgCyan.bold('Connection to DB successful'))
    }
    catch(error){
      console.log(error)
      console.log(colors.bgRed.bold('Failed to connect to the DB'))
      process.exit(1)
    }
  }

  connection()
})();