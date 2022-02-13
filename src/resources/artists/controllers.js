import { toNumber } from '../../utils/helpers'
import { Artist, validateArtist } from './model'

export const getArtists = async (req, res) => {
  try {
    const docs = await Artist.find()
      .limit(toNumber(req.query.limit || 40))
      .skip(toNumber(req.query.offset))
      .exec()

    res.status(200).json({ data: docs })
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

export const addArtist = async (req, res) => {
  const { error } = validateArtist(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  const artist = new Artist({
    name: req.body.name
  })

  try {
    await artist.save()
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message)
    }
  }

  res.send(artist)
}
