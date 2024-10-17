import { fetchTMDB } from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";

export const searchPerson = async (req,res) => {
    const {query} = req.params
    try {
       const data = await fetchTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
       if(data.results.length === 0){
        return res.status(404).json({message: "No results found"})
       }

       await User.findByIdAndUpdate(req.user._id, {
        $push : {
            searchHistory : {
                id : data.results[0].id,
                image : data.results[0].profile_path,
                title : data.results[0].name,
                searchType : "person",
                createdAt : new Date()
            }
        }
    })

        res.status(200).json({success:true, content : data.results})

    } catch (error) {
        console.log(`Error in searchPerson ${error.message} `);
        res.status(400).json({success:false, message:"Internal server error"})
    }
}

export const searchMovie = async (req,res) => {
    const {query} = req.params
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
        if(data.results.length === 0){
            return res.status(404).json({message: "No results found"})
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push : {
                searchHistory : {
                    id : data.results[0].id,
                    image : data.results[0].poster_path,
                    title : data.results[0].name,
                    searchType : "movie",
                    createdAt : new Date()
                }
            }
        })

        res.status(200).json({success:true, content : data.results})
    } catch (error) {
        console.log(`Error in searchMovie ${error.message} `);
        res.status(400).json({success:false, message:"Internal server error"})
    }
}

export const searchTv = async(req,res) => {
    const {query} = req.params
    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
        if(data.results.length === 0){
            return res.status(404).json({message: "No results found"})
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push : {
                searchHistory : {
                    id : data.results[0].id,
                    image : data.results[0].poster_path,
                    title : data.results[0].name,
                    searchType : "tv",
                    createdAt : new Date()
                }
            }
        })
        res.status(200).json({success:true, content : data.results})
    } catch (error) {
        console.log(`Error in searchTv ${error.message} `);
        res.status(400).json({success:false, message:"Internal server error"})
    }
}

export const getSearchHistory = async(req,res) => {
    try {
        res.status(200).json({success:true, content : req.user.searchHistory})
    } catch (error) {
        console.log(`Error in searchHistory ${error.message} `);
        res.status(400).json({success:false, message:"Internal server error"})
    }
}

export const removeHistory = async (req,res) => {
    const {id} = req.params
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull : {
                searchHistory : {id : Number(id)}
            }
        })
        res.status(200).json({ success: true, message: "Item removed from search history" });
    } catch (error) {
        console.log("Error in removeItemFromSearchHistory controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}