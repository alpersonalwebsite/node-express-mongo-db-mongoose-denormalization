import { Router } from 'express'

import { addArtist, getArtists } from './controllers'

const router = Router()

// equals to /api/users
router.get('/', getArtists)

router.post('/', addArtist)

export default router
