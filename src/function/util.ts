import axios from 'axios'


export interface User {
    Email: string,
    Password: string,
    firstName: string,
    lastName: string,
    Phone: string,
    uid?:string
}


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


export const services = [
    { redirect: "#passwordDescription", image: "/service_password.jpg", text: "Service Password" },
    { redirect: "#uniqueDiv", image: "/service_unique_generator.avif", text: "Unique Generator" },
    { redirect: "#shortnerDiv", image: "/services_url.jpeg", text: "URL Services" },
    { redirect: "#onlineNoteDiv", image: "/service_1note.jpeg", text: "Online Note Service" }
];

export const sections = [
    {
        heading: "Password Generator",
        id: "passwordDescription",
        description: `Welcome to our Password Generator! This tool is designed to help you create secure and random passwords with ease. You can customize your password by specifying the length and complexity, choosing to include uppercase letters, lowercase letters, numbers, and special characters. Whether you need a simple, medium, or strong password, our generator has you covered. Once your password is generated, it will be displayed on the screen and automatically copied to your clipboard for easy use. Ensure your online security with our reliable and user-friendly password generator.`,
        image: "/service_password.jpg",
        buttonText: "Generate Password"
    },
    {
        heading: "Unique id generator",
        id: "uniqueDiv",
        description: `Welcome to our Unique Key Generator! This tool is designed to help you create unique keys with ease. Simply provide a number between 0 and 256, and our generator will produce a unique identifier for you. Each key is crafted to ensure uniqueness and reliability, making it ideal for a variety of applications. Whether you need a unique ID for database entries, user sessions, or any other purpose, our generator has you covered. Once your key is generated, it will be displayed on the screen and ready for immediate use. Enhance your project with our efficient and user-friendly key generator.`,
        image: "/service_unique_generator.avif",
        buttonText: "Generate Unique id"
    },
    {
        heading: "Url shortner",
        id: "shortnerDiv",
        description: `Welcome to our URL Shortener! We have integrated Bitly to provide you with quick and easy URL shortening services. Simply enter your long URL, and our tool will generate a shortened link using Bitly. This helps you save space, manage links efficiently, and track your link’s performance. Once your URL is shortened, it will be displayed on the screen, and you can use it immediately. Simplify your URL management with our reliable and user-friendly URL shortener`,
        image: "/services_url.jpeg",
        buttonText: "Url short now"
    },
    {
        heading: "Online Note",
        id: "onlineNoteDiv",
        description: `Welcome to our Online Note Saver! This tool allows you to create, edit, save, and delete notes effortlessly. Keep your thoughts, tasks, and ideas organized with our intuitive interface. Each note can be easily edited or deleted, ensuring you have complete control over your content. Whether you need to jot down a quick reminder or store detailed information, our Online Note Saver has you covered. Your notes are securely saved and can be accessed anytime, making it a reliable companion for your daily needs. Experience the convenience of managing your notes with our user-friendly note-saving tool.`,
        image: "/service_1note.jpeg",
        buttonText: "Create a note"
    }
];
