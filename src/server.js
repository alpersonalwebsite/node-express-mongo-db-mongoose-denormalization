import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import artistRouter from './resources/artists/router'
import songRouter from './resources/songs/router'
import { connect } from './utils/db'

const PORT = process.env.PORT || 3000

const app = express()

app.use(helmet())

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(morgan('dev'))

app.use(cors())

app.use('/api/artists', artistRouter)
app.use('/api/songs', songRouter)

app.get('*', (req, res) => {
  res.json({
    message: 'Node.js, Express, MongoDB and Mongoose Denormalization!'
  })
})

export const start = async () => {
  // Kick off the DB connection but don't block booting on it, so the catch-all
  // route stays usable even if MongoDB is unreachable. Connection errors are
  // reported by the 'error' handler set up in connect().
  connect().catch(() => {})

  app.listen(PORT, () => {
    console.log(`REST API on http://localhost:${PORT}`)
  })
}
