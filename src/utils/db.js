import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({ path: `./src/config/${process.env.ENVIRONMENT}.env` })

const authorizationString =
  process.env.ENVIRONMENT === 'dev' ? '' : `${process.env.DB_USER}:${process.env.DB_PASSWORD}@`

const URL = `${process.env.DB_PREFIX}://${authorizationString}${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`

export const connect = (url = URL, opts = {}) => {
  mongoose.connect(url, { ...opts, useNewUrlParser: true, useUnifiedTopology: true })
  let db = mongoose.connection
  db.once('open', () => console.log('Connected to the database'))
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))
}
