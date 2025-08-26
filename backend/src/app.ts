import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import './config/connectionDB'
import serviceRouter from './routes/serviceRouter'
import authRouter from './routes/authRouter'
import employeeRouter from './routes/employeeRouter'
import clientRouter from './routes/clientRouter'
import noteRouter from './routes/noteRouter'
import { errorHandler } from './middlewares/errorHandler'
import { routeNotFound } from './middlewares/routeNotFound'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { corsConfig } from './config/cors'

const app = express()
app.use(express.json())
app.use(cors({...corsConfig, credentials: true}))
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/auth', authRouter)
app.use('/api/services', serviceRouter)
app.use('/api/employees', employeeRouter)
app.use('/api/clients', clientRouter)
app.use('/api/notes', noteRouter)

app.use(routeNotFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(colors.cyan.bold('Server running on PORT: ' + PORT)))