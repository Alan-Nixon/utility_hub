import axios from 'axios'


export const shortUrl = async (URL: string) => {
    try {
        const apiKey = import.meta.env.VITE_APP_BITLY
        const url = import.meta.env.VITE_APP_URL
        const { data } = await axios.post(url, { long_url: URL }, { headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' } });
        return { error: false, link: data.link }
    } catch (err: any) {
        console.log(err.message)
        return { error: true, link: err.message ?? "Internal error" }
    }
}

export const urlPattern = /^(https?:\/\/)(?!localhost|(?:\d{1,3}\.){3}\d{1,3})([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;


export const xKeyGenerator = (length: string | number): string => {
    try {
        let KEY = "";
        length = Number(length);
        if (length < 1 || isNaN(length)) { return "Invalid Length" }
        for (let i = 0; i < length; i++) { KEY += String.fromCharCode(getRandomAsciiValue()); }
        return KEY;
    } catch (error: any) {
        console.log(error?.message ?? "Error while generating key generator");
        return "Invalid Length";
    }
}


// helpers

const getRandomAsciiValue = () => {
    const min = 33; const max = 122;
    const bannedNums = [34, 39, 40, 41, 42, 44, 46, 47, 58, 59, 60, 62, 91, 92, 93, 94, 96, 126];
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!bannedNums.includes(value)) { return value; }
    return getRandomAsciiValue();
}

