import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import notesRoutes from './routes/notesRoutes.js'
import connectDB from './config/db.js'
import rateLimiter from './middleware/rateLimiter.js'
import path from 'path'

import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000
const __dirname = path.resolve()

dotenv.config()

app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:5173'
  }))

app.use(rateLimiter)
app.use('/api', notesRoutes)

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")))

//   app.get(/.*/, (req, res, next) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
//   })
// }

connectDB().then(() => {
  app.listen(PORT)
}).catch(err => console.log(err))
