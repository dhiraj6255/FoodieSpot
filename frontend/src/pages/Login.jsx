import React, { useContext, useEffect, useState } from 'react'
import loginImg from '../assets/login.png'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const Login = () => {

    const [currState, setCurrState] = useState("Login")
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { token, setToken, navigate, backendUrl, getUserCart } = useContext(ShopContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (loading) return
        setLoading(true)
        try {
            if (currState === "Sign Up") {
                const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
                if (response.data.success) {
                    toast.success(response.data.message)
                    setToken(response.data.token)
                    localStorage.setItem("token", response.data.token)
                } else {
                    toast.error(response.data.message)
                }
            } else {
                const response = await axios.post(backendUrl + '/api/user/login', { email, password })
                if (response.data.success) {
                    toast.success(response.data.message)
                    setToken(response.data.token)
                    localStorage.setItem("token", response.data.token)
                    // FETCH USER CART IMMEDIATELY AFTER LOGIN
                    await getUserCart(response.data.token)
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    return (
        <section className='absolute top-0 left-0 h-full w-full z-50 bg-white'>
            {/* container */}
            <div className='flex h-full w-full'>
                {/* IMAGE SIDE */}
                <div className='w-1/2 hidden sm:block'>
                    <img
                        src={loginImg}
                        alt="login-img"
                        className='object-cover h-full w-full'
                    />
                </div>
                {/* FORM SIDE */}
                <div className='flexCenter w-full sm:w-1/2'>
                    <form
                        onSubmit={onSubmitHandler}
                        className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800'
                    >
                        <div className='w-full mb-4'>
                            <h3 className='bold-32'>{currState}</h3>
                        </div>
                        {currState === "Sign Up" && (
                            <div className='w-full'>
                                <label htmlFor="Email" className='medium-15'>
                                    Name
                                </label>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    type="text"
                                    placeholder='Name'
                                    className='w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1'
                                />
                            </div>
                        )}
                        <div className='w-full'>
                            <label htmlFor="Email" className='medium-15'>
                                Email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder='Email'
                                className='w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1'
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="password" className='medium-15'>
                                Password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder='Password'
                                className='w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1'
                            />
                        </div>
                        <button
                            type='submit'
                            className='btn-dark w-full mt-5 !py-[7px] !rounded'
                            disabled={loading}
                        >
                            {loading ? 'Please wait...' : (currState === "Sign Up" ? "Sign Up" : "Login")}
                        </button>
                        <div className="w-full flex flex-col gap-y-3 medium-14">
                            {currState === "Login" ? (
                                <>
                                    <div className="underline">Forgot your password?</div>
                                    <div className="underline">
                                        Don't have an account?
                                        <span
                                            onClick={() => setCurrState("Sign Up")}
                                            className='cursor-pointer'
                                        >
                                            {" "}
                                            Create account
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="underline">
                                    Already have an account?
                                    <span
                                        onClick={() => setCurrState("Login")}
                                        className='cursor-pointer'
                                    >
                                        {" "}
                                        Login
                                    </span>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login