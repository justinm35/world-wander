import * as functions from 'firebase-functions'
//expres and middleware imports
// import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import postRoutes from './routes/postRoutes'
import photoRoutes from './routes/photoRoutes'
import authRoutes from './routes/authRoutes'
//mongoose imports
import mongoose from "mongoose";
// dotenv.config()
import path from 'path'
import passport from 'passport'
import passportConfig from './middleware/passport'

passportConfig(passport);

const app = express()
// const PORT : number | string = 3500;
app.use(bodyParser.json({ limit: "30mb"}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())
app.use(passport.initialize())

app.use('/posts', postRoutes)

app.use('/photos', photoRoutes)

app.use('/auth', authRoutes)


app.use(express.static(path.join(__dirname, "public")));

// app.listen(PORT, () => console.log(`###### Server running on port: ${PORT}`))//Not needed for firebase functions 
//process.env.CONNECTION_URI ||

const MONGO_URI = 'mongodb+srv://WorldWander:12341234@cluster0.ljqueyg.mongodb.net/?retryWrites=true&w=majority';
mongoose
  .connect(MONGO_URI as string)
  .catch((error : any)=> console.log(error))

mongoose.connection.on('connected', () => {
    console.log('###### Databse Connected')
})

export const server = functions.https.onRequest(app);


