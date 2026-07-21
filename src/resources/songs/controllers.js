import { toNumber } from '../../utils/helpers'
import { Artist } from '../artists/model'
import { Song, validateSong } from './model'

export const getSongs = async (req, res) => {
  try {
    const docs = await Song.find().limit(toNumber(req.query.limit, 40)).skip(toNumber(req.query.offset, 0))

    res.status(200).json({ data: docs })
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}

export const addSong = async (req, res) => {
  const { error } = validateSong(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    const artist = await Artist.findById(req.body.artist)
    if (!artist) return res.status(400).send('Invalid artist!')

    const song = new Song({
      name: req.body.name,
      artist: {
        _id: artist.id,
        name: artist.name
      }
    })

    await song.save()
    res.status(201).json(song)
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}
