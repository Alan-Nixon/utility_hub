import { memo, useEffect, useState } from 'react';
import { SimpleModal, LGModal, URLModal } from './helpers/Modal';
import { Box, Button, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { LoadingPage, TypingText } from './helpers/text';
import { useInView } from 'react-intersection-observer';
import Online from './Online';
import VantaHead from './helpers/vantaHead';
import { feedbackType, sections, services } from '../function/util';
import { onAuthChangeFunction } from '../function/firebaseFunctions';
import { validateDescription, validateEmail, validateName } from '../function/validations';
import { sendEmail } from '../function/EmailJs';
import { toast } from 'react-toast';

function Home() {
    const [open, setOpen] = useState<number | null>(null);
    const [user, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const [feedback, setFeed] = useState<feedbackType>({ Name: "", Email: "", Feedback: "" })
    const handleClose = () => setOpen(null);

    useEffect(() => {
        onAuthChangeFunction(setUserData).then(() => {
            setLoading(false);
        })
    }, [user])

    
    const { ref: servicesRef, inView: servicesInView } = useInView({ triggerOnce: true });
    const { ref: sectionRef, inView: sectionInView } = useInView({ triggerOnce: true });

    const handleInput = (feild: string, value: string) => {
        setFeed((rest) => ({ ...rest, [feild]: value }));
        setError("")
    }


    const submitReport = () => {
        if (validateName(feedback.Name)) {
            if (validateEmail(feedback.Email)) {
                if (validateDescription(feedback.Feedback)) {
                    sendEmail(feedback).then(() => {
                        toast.success("successfully sent the feedback", {})
                        setFeed({ Email: "", Feedback: "", Name: "" })
                    }).catch(() => {
                        toast.error("error occured while sending the feedback")
                    })
                } else {
                    setError("Enter a valid description, minimum 10 words")
                }
            } else {
                setError("Enter a valid email")
            }
        } else {
            setError("Enter a valid name")
        }
    }

    if (loading) { return <LoadingPage /> }

    return (
        <>
            <VantaHead user={user} />

            <div className="m-3">
                <p className='text-2xl font-bold'><TypingText text='Welcome to Utility Hub' /></p>
                <p className="mt-3"> <TypingText text={`Utility Hub offers a suite of essential and convenient services designed to make your online experience smoother and more efficient. Whether you need to generate a secure password, create a unique identifier, shorten a long URL, check the weather, or take notes online, Utility Hub has got you covered. This all-in-one static website is designed for easy access over the internet, providing a seamless user experience with a variety of utilities in a single platform. Our goal is to simplify your digital life by offering tools that are not only effective but also easy to use. Each utility is crafted to meet your everyday needs with precision and reliability, ensuring that you can focus on what truly matters. With Utility Hub, you have a trusted companion that helps you navigate the digital world effortlessly.`} /></p>

                <div className="mt-5">
                    <p className='text-2xl font-bold justify-center items-center'>Services</p>

                    <motion.div
                        className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 justify-items-center"
                        initial="hidden"
                        animate={servicesInView ? "visible" : "hidden"}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        transition={{ duration: 1.0 }}
                        ref={servicesRef}
                    >
                        {services.map((item, index) => (
                            <motion.a
                                href={item.redirect}
                                key={index}
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                initial="hidden"
                                animate={servicesInView ? "visible" : "hidden"}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex flex-col cursor-pointer items-center">
                                    <img
                                        src={item.image}
                                        alt={item.text}
                                        className="w-40 hover:scale-105 transition-transform h-40 md:w-52 md:h-52 rounded-full object-cover"
                                    />
                                    <p className="mt-2 text-center font-semibold">{item.text}</p>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
                <div className="w-auto h-auto" ref={sectionRef} >

                    {sections.map((item, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
                            animate={sectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
                            transition={{ duration: 0.3 }}
                            className="mt-14 ml-5 mr-5"
                            id={item.id}
                        >
                            <p className="text-xl font-bold">{item.heading}</p>
                            <div className="flex flex-col md:flex-row mt-3">
                                <div className="w-full md:w-[40%] flex justify-center">
                                    <img src={item.image} alt={item.heading} className="w-80 h-80 md:w-96 md:h-96 rounded-full object-cover mx-auto" />
                                </div>
                                <div className="w-full md:w-[50%] md:ml-5">
                                    <p className='mt-5 md:mt-20 text-center md:text-left'> <TypingText text={item.description} /></p>
                                    <div className="flex justify-center md:justify-end">
                                        {!user && index === 3 &&
                                            <div className="flex mr-auto mt-5 items-center p-2 mb-4 text-smrounded-lg text-blue-400" role="alert">
                                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                                </svg>
                                                <span className="sr-only">Info</span>
                                                <div>
                                                    <span className="font-medium">Please Login to add Note</span>
                                                </div>
                                            </div>
                                        }
                                        <button type="button" onClick={() => setOpen(index)} className="text-white mt-3 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">{item.buttonText}</button>
                                    </div>
                                </div>
                            </div>
                            {user && open === 3 && index === 3 && <Online handleClose={handleClose} />}
                            <div className='bg-black w-full mt-5 h-[2px]' />
                        </motion.div>
                    ))}
                </div>

                {open === 0 && <LGModal handleClose={handleClose} />}
                {open === 1 && <SimpleModal handleClose={handleClose} />}
                {open === 2 && <URLModal handleClose={handleClose} />}


                <div className="w-full mt-8">
                    <h1 className="text-center text-2xl font-bold">Feedback</h1>
                    <div className="flex w-full mt-8">
                        <div className="mx-auto w-full px-4 md:w-3/4 lg:w-3/4">
                            {error && <p className='error mb-2' >{error}</p>}
                            <Box sx={{ width: '100%' }}>
                                <TextField fullWidth onChange={(e) => handleInput("Name", e.target.value)} label="Name" id="fullWidth" />
                            </Box>
                            <Box sx={{ width: '100%', marginTop: '2%' }}>
                                <TextField fullWidth onChange={(e) => handleInput("Email", e.target.value)} label="Email" id="fullWidth" />
                            </Box>
                            <Box sx={{ width: '100%', marginTop: '2%' }}>
                                <TextField fullWidth onChange={(e) => handleInput("Feedback", e.target.value)} multiline rows={4} label="Feedback" id="fullWidth" />
                            </Box>
                            <div className="flex">
                                <div className="ml-auto mt-3">
                                    <Button autoFocus variant='contained' onClick={submitReport} >Submit Now</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="pb-3 rounded-lg shadow bg-gray-900 bottom-0">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src="/LogoAV.jpg" className="h-12 rounded-full" alt="Av Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Utility Hub</span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
                            <li> <a href="#" className="hover:underline me-4 md:me-6">About</a> </li>
                            <li> <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a> </li>
                            <li> <a href="#" className="hover:underline me-4 md:me-6">Licensing</a> </li>
                            <li> <a href="#" className="hover:underline">Contact</a> </li>
                        </ul>
                    </div>
                    <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
                    <span className="block text-sm sm:text-center text-gray-400">© 2023. All Rights Reserved.</span>
                </div>
            </footer>
        </>
    );
}

export default memo(Home);
