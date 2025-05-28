import React from 'react'
import Title from './Title'
import { FaCheck, FaStar } from 'react-icons/fa6'
import user1 from '../assets/testimonials/user1.png'
import user2 from '../assets/testimonials/user2.png'
import food1 from '../assets/food_1.png'
import food2 from '../assets/food_2.png'
import food12 from '../assets/food_12.png'
import food44 from '../assets/food_44.png'

const Testimonials = () => {
    return (
        <div>
            <div className='py-16'>
                <Title
                    title1={"DELICIOUS"}
                    title2={" REVIEWS"}
                    titleStyles={"text-center !pb-16"}
                    paraStyles={"!block"}
                />
                <div className='max-padd-container'>
                    {/* Container */}
                    <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-20 mb-16 rounded-2xl'>
                        {/* Left Side */}
                        <div className='hidden sm:flex items-start justify-between flex-col gap-10'>
                            <Title
                                title1={"What People"}
                                title2={" Says"}
                                title1Styles={"pb-10"}
                                paraStyles={"!block"}
                            />
                            <div className='flex flex-col gap-1 bg-deep p-2 rounded'>
                                <div className='flex text-secondary gap-2'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div>
                                <div className='medium-14'>more than <b>+25,000 reviews</b></div>
                            </div>
                        </div>
                        {/* Right Side Reviews */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-7'>
                            {/* Review Card */}
                            <div className='flex flex-col gap-1 rounded-lg p-4 bg-deep'>
                                <div className='flexBetween'>
                                    <div className='flexBetween gap-x-2'>
                                        <img src={user1} alt="" height={44} width={44} className='rounded-full' />
                                        <h5 className='bold-14'>John Doe</h5>
                                    </div>
                                    <div className='bg-secondary text-white rounded-full flexCenter gap-x-2 p-1 px-2 text-xs font-semibold'>
                                        <FaCheck />Verified
                                    </div>
                                </div>
                                <hr className='h-[1px] w-full my-2' />
                                <div className='flex gap-x-1 text-secondary mt-5 mb-1 text-xs'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div>
                                <h4 className='h4'>High Quality</h4>
                                <p>I recently placed an order, and I must say, it was a great experience! and the packaging was neat and secure, keeping everything fresh and intact.</p>
                                <div className='flex mt-5'>
                                    <img src={food1} alt="foodimg" height={44} width={44} className='rounded aspect-square object-cover' />
                                    <img src={food2} alt="foodimg" height={44} width={44} className='rounded aspect-square object-cover' />
                                </div>
                            </div>
                            {/* Review Card */}
                            <div className='flex flex-col gap-1 rounded-lg p-4 bg-deep'>
                                <div className='flexBetween'>
                                    <div className='flexBetween gap-x-2'>
                                        <img src={user2} alt="" height={44} width={44} className='rounded-full' />
                                        <h5 className='bold-14'>Izabell Stress</h5>
                                    </div>
                                    <div className='bg-secondary text-white rounded-full flexCenter gap-x-2 p-1 px-2 text-xs font-semibold'>
                                        <FaCheck />Verified
                                    </div>
                                </div>
                                <hr className='h-[1px] w-full my-2' />
                                <div className='flex gap-x-1 text-secondary mt-5 mb-1 text-xs'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div>
                                <h4 className='h4'>Tasty Flavour</h4>
                                <p>I recently placed an order, and it was an excellent experience! The packaging was secure and well-organized, keeping everything fresh and in perfect condition.</p>
                                <div className='flex mt-5'>
                                    <img src={food1} alt="foodimg" height={44} width={44} className='rounded aspect-square object-cover' />
                                    <img src={food2} alt="foodimg" height={44} width={44} className='rounded aspect-square object-cover' />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials