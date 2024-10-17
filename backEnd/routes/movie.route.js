import express from 'express'
import {getTrending, getTrailer, getDetails, getSimilar, getCategory} from '../controller/movie.controller.js'

const router = express.Router()

router.get('/trending', getTrending)
router.get('/trailer/:id', getTrailer)
router.get('/details/:id', getDetails)
router.get('/similar/:id', getSimilar)
router.get('/:category', getCategory)

export default router;