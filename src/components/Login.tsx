import { Link, useNavigate } from "react-router-dom";
import { VantaLogin } from "./helpers/vantaHead";
import { useEffect, useState, useCallback } from "react";
import { LoadingPage } from "./helpers/text";
import { isLoggedIn, loginUser } from "../function/firebaseFunctions";
import { validateEmail, validatePassword } from "../function/validations";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../function/firebase";

function Login() {
    const [loading, setLoading] = useState(true);
    const [width, setWidth] = useState(window.screen.width);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setWidth(window.screen.width);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        isLoggedIn().then(log => {
            if (log) {
                navigate('/');
            }
            setLoading(false);
        });
    }, [navigate]);



    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div className="flex w-full h-full scrollHidden">
            {width < 860 ? (
                <VantaLogin fullScreen={true} children={<LoginInput width={width} />} />
            ) : (
                <>
                    <VantaLogin fullScreen={false} />
                    <LoginInput width={width} />
                </>
            )}
        </div>
    );
}

function LoginInput({ width }: { width: number }) {
    const [loginData, setLoginData] = useState({ Email: "", Password: "" });
    const [error, setError] = useState("");
    const Navigate = useNavigate();


    const handleChange = useCallback((field: string, value: string) => {
        setLoginData(rest => ({ ...rest, [field]: value }));
        setError("");
    }, []);

    const handleLogin = () => {
        if (validateEmail(loginData.Email)) {
            if (validatePassword(loginData.Password)) {
                loginUser(loginData.Email,loginData.Password).then(()=>Navigate('/'))
            } else {
                setError("Enter a valid password")
            }
        } else {
            setError("Email is invalid")
        }
    }

    const googleSetup = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in: ", error);
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-5">
                <h2 className={`text-2xl font-bold text-center mb-5 ${width < 860 ? "text-white" : "text-black"}`}>Login</h2>
                <form className="w-full mx-auto">
                    {error && <p className="error mb-1">{error}</p>}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            value={loginData.Email}
                            name="floating_email"
                            onChange={(e) => handleChange("Email", e.target.value)}
                            id="floating_email"
                            className="block text-black py-2.5 px-0 w-full font-normal bg-transparent border-0 border-b-2 border-blue-500 outline-none ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium text-blue-500 peer-focus:text-blue-500 absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            value={loginData.Password}
                            onChange={(e) => handleChange("Password", e.target.value)}
                            name="floating_password"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-blue-500 outline-none ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_password"
                            className="peer-focus:font-medium text-blue-500 peer-focus:text-blue-500 absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                    </div>
                    <div className="flex">
                        <Link className="text-blue-600" to='/signup'>Don't have an account? Register</Link>
                        <button
                            type="button"
                            onClick={handleLogin}
                            className="border ml-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:ring-blue-800"
                        >
                            Submit
                        </button>
                    </div>
                    <div className="flex w-full"><span className="mx-auto">OR</span></div>
                    <button
                        type="button"
                        className="text-white mt-2 w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                    >
                        <div className="flex mx-auto" onClick={googleSetup}>
                            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                <path
                                    fillRule="evenodd"
                                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Sign in with Google
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
