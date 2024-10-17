import { useEffect, useState } from "react"
import { useContentStore } from "../../store/content"
import axios from "axios"


const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null)
    const {contentType} = useContentStore()

    useEffect(() => {
        const fetchTrendingContent = async () => {
            const res = await axios.get(`/api/${contentType}/trending`)
            setTrendingContent(res.data.content)
        }
        fetchTrendingContent()
    },[contentType])
    return {trendingContent}
}

export default useGetTrendingContent