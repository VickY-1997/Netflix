import express from 'express'
import {getTrendingTv, getTrailerTv, getDetailsTv, getSimilarTv, getCategoryTv} from '../controller/tv.controller.js'

const router = express.Router()

router.get('/trending', getTrendingTv)
router.get('/trailer/:id', getTrailerTv)
router.get('/details/:id', getDetailsTv)
router.get('/similar/:id', getSimilarTv)
router.get('/:category', getCategoryTv)

export default router;