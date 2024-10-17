import { fetchTMDB } from "../services/tmdb.service.js"

export const getTrending = async(req,res) => {
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`)
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        res.status(201).json({success:true, content : randomMovie})
    } catch (error) {
        console.log(`Error in fetch TrendingMovie`);
        res.status(500).json({success:false, message: "Error fetching trending movie"})
    }
}
export const getTrailer = async(req,res) => {
    try {
        const {id} = req.params
        const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        res.status(201).json({success:true, trailer : data.results})
    } catch (error) {
        console.log(`Error in fetch Trailer`);
        res.status(500).json({success:false, message: "Error fetching trailer movie"})
    }

}
export const getDetails = async(req,res) => {
    try {
        const {id} = req.params
        const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.status(200).json({success:true, details : data})
    } catch (error) {
        console.log(`Error in fetch details`);
        res.status(500).json({success:false, message: "Error fetching details movie"})
    }
}
export const getSimilar = async(req,res) => {
  try {
    const {id} = req.params
    const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
    res.status(200).json({success:true, similar : data.results})
  } catch (error) {
    console.log(`Error in fetch similar`);
        res.status(400).json({success:false, message: "Error fetching similar movie"})
  }
}
export const getCategory = async(req,res) => {
    try {
        const {category} = req.params
        const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        res.status(200).json({success:true, content : data.results})
    } catch (error) {
        console.log(`Error in fetch category`);
        res.status(400).json({success:false, message: "Error fetching category movie"})
    }
}