import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'

import authRoute from './routes/auth.route.js'
import movieRoute from './routes/movie.route.js'
import tvRoute from './routes/tv.route.js'
import searchRoute from './routes/search.route.js'

import {protectRoute } from './middleware/protectRoute.js'
import { ENV_VARS } from './config/envVariables.js'
import {dbConnect} from './config/db.js'


const app = express()
const PORT = ENV_VARS.PORT
const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute )
app.use('/api/movie',protectRoute, movieRoute)
app.use('/api/tv',protectRoute, tvRoute)
app.use('/api/search',protectRoute, searchRoute)

if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontEnd/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontEnd", "dist", "index.html"));
	});
}

app.listen(PORT, (err) => {
    dbConnect()    
    if(err) throw err;
    console.log(`The server is running on port ${PORT}`);
})