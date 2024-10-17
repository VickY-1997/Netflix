import { fetchTMDB } from "../services/tmdb.service.js"

export const getTrendingTv = async(req,res) => {
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/trending/tv/day?language=en-US`)
        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)]
        res.status(201).json({success:true, content : randomTv})
    } catch (error) {
        console.log(`Error in fetch TrendingTv`);
        res.status(500).json({success:false, message: "Error fetching trending tv"})
    }
}
export const getTrailerTv = async(req,res) => {
    try {
        const {id} = req.params
        const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
        res.status(201).json({success:true, trailer : data.results})
    } catch (error) {
        console.log(`Error in fetch TrailerTv`);
        res.status(500).json({success:false, message: "Error fetching trailerTv movie"})
    }

}
export const getDetailsTv = async(req,res) => {
    try {
        const {id} = req.params
        const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
        res.status(200).json({success:true, details : data})
    } catch (error) {
        console.log(`Error in fetch detailsTv`);
        res.status(500).json({success:false, message: "Error fetching details Tv"})
    }
}
export const getSimilarTv = async(req,res) => {
  try {
    const {id} = req.params
    const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
    res.status(200).json({success:true, similar : data.results})
  } catch (error) {
    console.log(`Error in fetch similarTv`);
        res.status(400).json({success:false, message: "Error fetching similar Tv"})
  }
}
export const getCategoryTv = async(req,res) => {
    try {
        const {category} = req.params
        const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        res.status(200).json({success:true, content : data.results})
    } catch (error) {
        console.log(`Error in fetch categoryTv`);
        res.status(400).json({success:false, message: "Error fetching category Tv"})
    }
}