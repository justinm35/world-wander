//expres and middleware imports
import * as dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import postRoutes from './routes/postRoutes'
import photoRoutes from './routes/photoRoutes'
import authRoutes from './routes/authRoutes'
//mongoose imports
import mongoose, { ConnectOptions } from "mongoose";
dotenv.config()
import path from 'path'
import passport from 'passport'


const app = express()
const PORT : number | string = process.env.PORT || 3500;
app.use(bodyParser.json({ limit: "30mb"}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())


app.use('/posts', postRoutes)

app.use('/photos', photoRoutes)

app.use('/auth', authRoutes)


app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
mongoose
  .connect(process.env.CONNECTION_URI as string, {useNewUrlParser: true,useUnifiedTopology: true,} as ConnectOptions)
  .catch((error)=> console.log(error))

mongoose.connection.on('connected', () => {
    console.log('Database Connected')
})