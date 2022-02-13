import Joi from 'joi'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { collection: 'artists' }
)

export const Artist = mongoose.model('Artist', artistSchema)

export const validateArtist = (artist) => {
  const artistSchema = Joi.object({
    name: Joi.string().required()
  })

  return artistSchema.validate(artist)
}
