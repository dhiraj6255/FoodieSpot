import React from 'react'
import { Link } from 'react-router-dom'
import bg from '../assets/bg.png'
import { TbTruckDelivery } from 'react-icons/tb'
import { IoPeopleCircleOutline } from 'react-icons/io5'
import { IoMdRestaurant } from 'react-icons/io'
import { AiFillShop } from 'react-icons/ai'
import { PiChefHatFill } from 'react-icons/pi'

const Hero = () => {
    return (
        <section className='max-padd-container py-20 xl:py-36 bg-deep'>
            <div className='flexCenter gap-6 flex-col xl:flex-row'>

                {/* Left Side */}
                <div className='flex flex-1 flex-col pt-12 xl:pt-32'>
                    <h1 className='h1 max-w-[46rem]'>Grab Exclusive <span className='inline-flex'>
                        <span className='inline-flex items-center justify-center p-5 h-16 w-16 bg-secondary text-white -rotate-[31deg] rounded-full'>F</span>ood
                    </span> Discounts Now!</h1>
                    <p>FoodieSpot a world of flavors, freshness and delight. Discover dishes that satisfy your cravings, excite your taste buds, and bring people together. From classic favorites to modern delights, find the perfect meal for every moment.</p>
                    <div className='mt-6'>
                        <Link to={'/menu'} className='btn-secondary'>Explore Now</Link>
                    </div>
                </div>

                {/* Right Side */}
                <div className='flex flex-1 relative z-10 top-12'>
                    <div className='relative'>
                        <img src={bg} alt="bg" height={666} width={666} />

                        {/* Badge */}
                        <div className='hidden sm:block absolute top-8 right-14 max-w-48 bg-white pl-2 py-2 rounded-xl'>
                            <div className='flex gap-2'>
                                <TbTruckDelivery size={31} className='text-secondary' />
                                <h5 className='h5 relative top-1'>Fast Delivery</h5>
                            </div>
                            <p className='text-xs'>
                                Fresh, hot meals at your doorstep.
                            </p>
                        </div>
                        {/* Badge */}
                        <div className='hidden sm:block absolute top-52 right-6 max-w-60 bg-white py-2 rounded-xl'>
                            <div className='flex gap-2'>
                                <IoMdRestaurant size={26} className='text-secondary' />
                                <h5 className='h5'>99+ Dishes</h5>
                            </div>
                        </div>
                        {/* Badge */}
                        <div className='hidden sm:block absolute top-3/4 right-12 max-w-48 bg-white pl-2 py-2 rounded-xl'>
                            <div className='flex gap-2'>
                                <AiFillShop size={23} className='text-secondary' />
                                <h5 className='h5'>200+ Branches</h5>
                            </div>
                            <p className='text-xs'>
                                Bringing great food closer to you.
                            </p>
                        </div>
                        {/* Badge */}
                        <div className='hidden sm:block absolute top-28 left-3 max-w-48 bg-white pl-2 py-2 rounded-xl'>
                            <div className='flex gap-2'>
                                <IoPeopleCircleOutline size={31} className='text-secondary' />
                                <h5 className='h5 relative top-1'>Happy Customers</h5>
                            </div>
                            <p className='text-xs'>
                                Serving smiles with every delicious bite.
                            </p>
                        </div>
                        {/* Badge */}
                        <div className='hidden sm:block absolute top-72 left-3 max-w-60 bg-white p-2 rounded-xl'>
                            <div className='flex gap-2'>
                                <PiChefHatFill size={26} className='text-secondary' />
                                <h5 className='h5 relative top-1'>Expert Cooks</h5>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero