import axios from "axios";
import { ENV_VARS } from "../config/envVariables.js";

export const fetchTMDB = async (url) => {
    try {
        
        const options = {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`
            }
          };

          const response = await axios.get(url, options)
          if(response.status !== 200){
            throw new error(`failed to fetch data`)
          }
          return response.data
    } catch (error) {
        console.log(`Error in fetchData from TMDB`);
        res.status(500).json({success:false, message:`Error in fetchTmdb ${error.message}`})
    }
}