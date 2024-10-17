import dotenv from 'dotenv'

dotenv.config()

export const ENV_VARS = {
    mongo_url : process.env.mongo_url,
    PORT : process.env.PORT,
    JWT_SECRET : process.env.JWT_SECRET,
    NODE_ENV : process.env.NODE_ENV,
    TMDB_API_KEY : process.env.TMDB_API_KEY
}