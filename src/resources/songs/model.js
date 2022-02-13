import Joi from 'joi'
import JoiObjectId from 'joi-objectid'
import mongoose from 'mongoose'

import { artistSchema } from '../artists/model'

const myJoiObjectId = JoiObjectId(Joi)

const Schema = mongoose.Schema

const songSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    artist: {
      type: artistSchema,
      required: true
    }
  },
  { collection: 'songs' }
)

export const Song = mongoose.model('Song', songSchema)

export const validateSong = (song) => {
  const songSchema = Joi.object({
    name: Joi.string().required(),
    artist: myJoiObjectId().required()
  })

  return songSchema.validate(song)
}
