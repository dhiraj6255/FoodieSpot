import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import { RiShoppingCartFill, RiUserLine } from "react-icons/ri";
import { TbUserCircle, TbArrowRight } from 'react-icons/tb'
import { CgMenuLeft } from 'react-icons/cg'
import { ShopContext } from '../context/ShopContext';

const Header = () => {

    const { getCartCount, navigate, token, setToken } = useContext(ShopContext)
    const [menuOpened, setMenuOpened] = useState(false)

    const toggleMenu = () => {
        setMenuOpened((prev) => !prev)
    }

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
    }

    return (
        <header className='py-3 w-full absolute top-0 left-0 right-0 z-50 bg-light'>
            <div className='max-padd-container flexBetween'>

                {/* Logo */}
                <Link to={"/"} className='bold-24 flex-1 flex'>
                    <span className='inline-flex'>
                        <span className='inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-white -rotate-[31deg] rounded-full'>F</span>oodie
                    </span>Spot
                </Link>

                {/* Navbar */}
                <div className='flex-1'>
                    <Navbar toggLeMenu={toggleMenu} menuOpened={menuOpened} containerStyles={`${menuOpened ? "flex flex-col gap-y-12 h-screen w-[222px] absolute left-0 top-0 bg-white z-50 px-10 py-4 shadow-xl" : "hidden xl:flex gap-x-5 xl:gap-x-8 medium-15 rounded-full px-2 py-1"}`} />
                </div>

                {/* Right side */}
                <div className='flex-1 flex items-center justify-end gap-x-3 sm:gap-x-10'>
                    {!menuOpened && (
                        <CgMenuLeft onClick={toggleMenu} className='text-2xl xl:hidden cursor-pointer' />
                    )}
                    <Link to={"/cart"} className='flex relative'>
                        <RiShoppingCartFill className='text-2xl' />
                        <span className='bg-secondary text-white medium-14 absolute left-3.5 -top-2.5 flexCenter w-4 h-4 rounded-full shadow-inner'>{getCartCount()}</span>
                    </Link>
                    <div className='group relative'>
                        <div onClick={() => navigate('/login')}>

                            {
                                token ?
                                    <div className='my-[9px]'>
                                        <TbUserCircle className='text-[29px] cursor-pointer' />
                                    </div>
                                    :
                                    <button
                                        className='btn-outline !border-none flexCenter gap-x-2 !py-3'>Login <RiUserLine className='text-xl' />
                                    </button>
                            }
                        </div>

                        {token && (
                            <>
                                <ul className='bg-white shadow-sm p-2 w-32 ring-1 ring-slate-900/10 rounded absolute right-0 top-10 hidden group-hover:flex flex-col'>
                                    <li onClick={() => navigate('/orders')} className='flexBetween cursor-pointer'>
                                        <p>Orders</p>
                                        <TbArrowRight className='opacity-50 text-[19px]' />
                                    </li>
                                    <hr className='my-2' />
                                    <li onClick={logout} className='flexBetween cursor-pointer'>
                                        <p>Logout</p>
                                        <TbArrowRight className='opacity-50 text-[19px]' />
                                    </li>
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header