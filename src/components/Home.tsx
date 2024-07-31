import { memo, useState } from 'react'
import Modal from './helpers/Modal'
// import { shortUrl } from '../function/short_url' 
import { Box, Button, TextField } from '@mui/material'
import { motion } from 'framer-motion';
import { TypingText } from './helpers/text';

// shortUrl("https://d3pzf4oy2y3tt.cloudfront.net")

function Home() {

    const [open, setOpen] = useState(false)


    const services = [{
        redirect: "#passwordDescription",
        image: "/service_password.jpg",
        text: "Service Password"
    }, {
        redirect: "#uniqueDiv",
        image: "/service_unique_generator.avif",
        text: "Unique Generator"
    }, {
        redirect: "#shortnerDiv",
        image: "/services_url.jpeg",
        text: "URL Services"
    }, {
        redirect: "#",
        image: "/service_1note.jpeg",
        text: "Online Note Service"
    }]

    const Section = [{
        heading: "Password Generator",
        id: "passwordDescription",
        description: `Welcome to our Password Generator! This tool is designed to help you create secure and random passwords with ease. You can customize your password by specifying the length and complexity, choosing to include uppercase letters, lowercase letters, numbers, and special characters. Whether you need a simple, medium, or strong password, our generator has you covered. Once your password is generated, it will be displayed on the screen and automatically copied to your clipboard for easy use. Ensure your online security with our reliable and user-friendly password generator.`,
        image: "/service_password.jpg",
        onclick: () => setOpen(true),
        buttonText: "Generate Password"
    }, {
        heading: "Unique id generator",
        id: "uniqueDiv",
        description: `Welcome to our Unique Key Generator! This tool is designed to help you create unique keys with ease. Simply provide a number between 0 and 256, and our generator will produce a unique identifier for you. Each key is crafted to ensure uniqueness and reliability, making it ideal for a variety of applications. Whether you need a unique ID for database entries, user sessions, or any other purpose, our generator has you covered. Once your key is generated, it will be displayed on the screen and ready for immediate use. Enhance your project with our efficient and user-friendly key generator.`,
        image: "/service_unique_generator.avif",
        onclick: () => { },
        buttonText: "Generate Unique id"
    }, {
        heading: "Url shortner",
        id: "shortnerDiv",
        description: `Welcome to our URL Shortener! We have integrated Bitly to provide you with quick and easy URL shortening services. Simply enter your long URL, and our tool will generate a shortened link using Bitly. This helps you save space, manage links efficiently, and track your link’s performance. Once your URL is shortened, it will be displayed on the screen, and you can use it immediately. Simplify your URL management with our reliable and user-friendly URL shortener`,
        image: "/services_url.jpeg",
        onclick: () => { },
        buttonText: "Url short now"
    }]



    return (<>
        <div className="relative w-full h-[550px] overflow-hidden">
            <img
                src="/bg.jpg"
                alt="Background Image"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />
        </div>
        <div className="m-3">
            <p className='text-2xl font-bold'><TypingText text='Welcome to Utility Hub' /></p>
            <p className="mt-3">
                <TypingText text={`Utility Hub offers a suite of essential and convenient services designed to make your online experience smoother and more efficient. Whether you need to generate a secure password, create a unique identifier, shorten a long URL, check the weather, or take notes online, Utility Hub has got you covered. This all-in-one static website is designed for easy access over the internet, providing a seamless user experience with a variety of utilities in a single platform. Our goal is to simplify your digital life by offering tools that are not only effective but also easy to use. Each utility is crafted to meet your everyday needs with precision and reliability, ensuring that you can focus on what truly matters. With Utility Hub, you have a trusted companion that helps you navigate the digital world effortlessly.`} />
            </p>

            <div className="mt-5">
                <p className='text-2xl font-bold justify-center items-center'>Services</p>

                <motion.div
                    className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 justify-items-center"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                    transition={{ duration: 1.0 }}
                >
                    {services.map((item, index) => (
                        <motion.a
                            href={item.redirect}
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }} // Stagger items
                        >
                            <div className="flex flex-col cursor-pointer items-center">
                                <img
                                    src={item.image}
                                    alt="Service"
                                    className="w-40 hover:scale-105 transition-transform h-40 md:w-52 md:h-52 rounded-full object-cover"
                                />
                                <p className="mt-2 text-center font-semibold">{item.text}</p>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>


            </div>
            {Section.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.0 }}
                    className="mt-14 ml-5"
                    id={item.id}
                >
                    <p className="text-xl font-bold">{item.heading}</p>
                    <div className="flex flex-col md:flex-row mt-3">
                        <div className="w-full md:w-[40%] flex justify-center">
                            <img src={item.image} alt="Service Password" className="w-80 h-80 md:w-96 md:h-96 rounded-full object-cover mx-auto" />
                        </div>
                        <div className="w-full md:w-[50%] md:ml-5">
                            <p className='mt-5 md:mt-20 text-center md:text-left'>{item.description}</p>
                            <div className="flex justify-center md:justify-end">
                                <button type="button" onClick={item.onclick} className="text-white mt-3 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">{item.buttonText}</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}

            {open && <Modal handleClose={() => setOpen(false)} />}

            <div className="w-full mt-8">
                <h1 className="text-center text-2xl font-bold">Feedback</h1>
                <div className="flex w-full mt-8">
                    <div className="mx-auto w-full px-4 md:w-3/4 lg:w-3/4">
                        <Box sx={{ width: '100%' }}>
                            <TextField fullWidth label="Name" id="fullWidth" />
                        </Box>
                        <Box sx={{ width: '100%', marginTop: '2%' }}>
                            <TextField fullWidth label="Email" id="fullWidth" />
                        </Box>
                        <Box sx={{ width: '100%', marginTop: '2%' }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Feedback"
                                id="fullWidth"
                            />
                        </Box>
                        <div className="flex">
                            <div className="ml-auto mt-3">
                                <Button autoFocus variant='contained' >Submit Now</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </>)
}

export default memo(Home)
