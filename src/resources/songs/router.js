import { Router } from 'express'

import { addSong, getSongs } from './controllers'

const router = Router()

// equals to /api/users
router.get('/', getSongs)

router.post('/', addSong)

export default router
