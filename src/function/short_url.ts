import axios from 'axios'


export const shortUrl = async (url: string) => {
    try {
        const apiKey = import.meta.env.VITE_APP_BITLY
        const url = import.meta.env.VITE_APP_URL
        const { data } = await axios.post(url, { long_url: url }, { headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' } });
        return data 
    } catch (err) {
        console.log(err)
    }
}