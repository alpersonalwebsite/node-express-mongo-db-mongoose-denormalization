import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'

import artistRouter from './resources/artists/router'
import songRouter from './resources/songs/router'
import { connect } from './utils/db'

const PORT = process.env.PORT || 3333

const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/api/artists', artistRouter)
app.use('/api/songs', songRouter)

app.get('*', (req, res) => {
  res.json({
    message: 'Node.js, Express, MongoDB and Mongoose Denormalization!'
  })
})

export const start = async () => {
  try {
    await connect()
    app.listen(PORT, () => {
      console.log(`REST API on http://localhost:${PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
}
