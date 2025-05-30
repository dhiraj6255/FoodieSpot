import React from 'react'
import { TbHomeFilled } from 'react-icons/tb'
import { IoMdListBox } from 'react-icons/io'
import { IoMailOpen } from 'react-icons/io5'
import { FaRegWindowClose } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'

const Navbar = ({ containerStyles, toggleMenu, menuOpened }) => {
    const navItems = [
        { to: '/', label: 'Home', icon: <TbHomeFilled /> },
        { to: '/menu', label: 'Menu', icon: <IoMdListBox /> },
        { to: '/contact', label: 'Contact', icon: <IoMailOpen /> },
    ]

    return (
        <nav className={containerStyles}>
            {menuOpened && (
                <>
                    <button onClick={toggleMenu} className='self-end relative left-8'>
                        <FaRegWindowClose className='text-xl cursor-pointer' />
                    </button>
                    <Link to='/' className='bold-24 mb-10'>
                        <h4 className='text-secondary'>FoodieSpot</h4>
                    </Link>
                </>
            )}
            {navItems.map(({ to, label, icon }) => (
                <div key={to} className='inline-flex'>
                    <NavLink
                        to={to}
                        className={({ isActive }) =>
                            `flexCenter gap-x-2 ${isActive ? 'active-link' : ''}`
                        }
                    >
                        <span className='text-xl'>{icon}</span>
                        <span className='medium-16'>{label}</span>
                    </NavLink>
                </div>
            ))}
        </nav>
    )
}

export default Navbar
