import { memo } from 'react'

function Home() {
    return (<>
        <div className="relative w-full h-[550px] overflow-hidden">
            <img
                src="/bg.jpg"
                alt="Background Image"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />
        </div>
        <div className="m-3">
            <p className='text-2xl font-bold'>Welcome to Utility Hub</p>
            <p className="mt-3">
                Utility Hub offers a suite of essential and convenient services designed to make your online experience smoother and more efficient. Whether you need to generate a secure password, create a unique identifier, shorten a long URL, check the weather, or take notes online, Utility Hub has got you covered. This all-in-one static website is designed for easy access over the internet, providing a seamless user experience with a variety of utilities in a single platform.
                Our goal is to simplify your digital life by offering tools that are not only effective but also easy to use. Each utility is crafted to meet your everyday needs with precision and reliability, ensuring that you can focus on what truly matters. With Utility Hub, you have a trusted companion that helps you navigate the digital world effortlessly.
            </p>

            <div className="mt-5">
                <p className='text-2xl font-bold justify-center items-center'>Services</p>
               
                <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 justify-items-center">
                    <div className="flex flex-col cursor-pointer items-center">
                        <img src="/service_password.jpg" alt="Service Password" className="w-40 hover:scale-105 transition-transform h-40 md:w-52 md:h-52 rounded-full object-cover" />
                        <p className="mt-2 text-center font-semibold">Service Password</p>
                    </div>
                    <div className="flex flex-col cursor-pointer items-center">
                        <img src="/service_unique_generator.avif" alt="Unique Generator" className="w-40 hover:scale-105 transition-transform h-40 md:w-52 md:h-52 rounded-full object-cover" />
                        <p className="mt-2 text-center">Unique Generator</p>
                    </div>
                    <div className="flex flex-col cursor-pointer items-center">
                        <img src="/services_url.jpeg" alt="URL Services" className="w-40 hover:scale-105 transition-transform h-40 md:w-52 md:h-52 rounded-full object-cover" />
                        <p className="mt-2 text-center">URL Services</p>
                    </div>
                    <div className="flex flex-col cursor-pointer items-center">
                        <img src="/service_1note.jpeg" alt="1Note Service" className="w-40 hover:scale-105 transition-transform h-40 md:w-52 md:h-52 rounded-full object-cover" />
                        <p className="mt-2 text-center">Online Note Service</p>
                    </div>
                </div>


            </div>

        </div>
    </>)
}

export default memo(Home)
