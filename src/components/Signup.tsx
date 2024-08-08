import { Link, useNavigate } from "react-router-dom"
import { VantaLogin } from "./helpers/vantaHead"
import { useEffect, useState } from "react"
import { validateEmail, validateName, validatePhone, validatePassword } from "../function/validations"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../function/firebase"
import { User } from "../function/util"
import { addDocument, isLoggedIn } from "../function/firebaseFunctions"
import { LoadingPage } from "./helpers/text"



function Signup() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const [signupData, setSignupData] = useState<User>({ Email: "", Password: "", firstName: "", lastName: "", Phone: "" })
    const Navigate = useNavigate();


    useEffect(() => {
        isLoggedIn().then(log => {
            if (log) { Navigate('/') }
            setLoading(false)
        })
    }, [])


    const googleSetup = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in: ", error);
        }
    };



    const submitRegister = () => {
        if (validateName(signupData.firstName)) {
            if (validateName(signupData.lastName)) {
                if (validateEmail(signupData.Email)) {
                    if (validatePhone(signupData.Phone)) {
                        if (validatePassword(signupData.Password)) {
                            addDocument(signupData).then(({ status, message }) => {
                                if (!status) { setError(message); }
                                else { Navigate('/login') }
                            })
                            setImmediate(() => (Navigate('/')))
                        } else {
                            setError("Enter a valid password")
                        }
                    } else {
                        setError("Enter a valid phone number")
                    }
                } else {
                    setError("Enter a valid email")
                }
            } else {
                setError("Enter a valid last name")
            }
        } else {
            setError("Enter a valid first name")
        }
    }

    const insertVal = (name: string, value: string) => {
        setSignupData(rest => ({ ...rest, [name]: value }))
        setError("")
    }

    if (loading) { return <LoadingPage /> }

    return (
        <div className="flex w-full h-full scrollHidden">
            <VantaLogin />
            <div className="w-full h-screen flex items-center justify-center">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-5 text-black">Register</h2>
                    <form className="w-full mx-auto">

                        {error && <p className="error">{error}</p>}
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    onChange={e => insertVal("firstName", e.target.value)}
                                    id="floating_first_name"
                                    className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-blue-500 outline-none ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >First Name</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_last_name"
                                    onChange={e => insertVal("lastName", e.target.value)}
                                    id="floating_last_name"
                                    className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-blue-500 outline-none ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Last Name</label>
                            </div>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="email" onChange={e => insertVal("Email", e.target.value)} name="floating_email" id="floating_email" className="block text-black py-2.5 px-0 w-full font-normal  bg-transparent border-0 border-b-2 border-blue-500 outline-none ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium  text-blue-500 peer-focus:text-blue-500 absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="number" onChange={e => insertVal("Phone", e.target.value)} name="floating_number" id="floating_number" className="block text-black py-2.5 px-0 w-full font-normal  bg-transparent border-0 border-b-2 border-blue-500 outline-none ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_number" className="peer-focus:font-medium  text-blue-500 peer-focus:text-blue-500 absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="password" onChange={e => insertVal("Password", e.target.value)} name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-blue-500 outline-none ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_password" className="peer-focus:font-medium text-blue-500 peer-focus:text-blue-500 absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                        <div className="flex">
                            <Link className="text-blue-600" to='/login'>Don't have an account ? login</Link>
                            <button type="button" onClick={submitRegister} className="border ml-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:ring-blue-800">Submit</button>
                        </div>
                        <div className="flex w-full"><span className="mx-auto">OR</span></div>
                        <button onClick={googleSetup} type="button" className="text-white mt-2 w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                            <div className="flex mx-auto">
                                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                    <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                                </svg>
                                Sign in with Google
                            </div>
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup
