import React from 'react'
import Title from './Title'
import shipping from '../assets/shipping-fast.svg'
import hot from '../assets/hot-food.svg'
import fresh from '../assets/fresh-food.svg'
import hat from '../assets/hat-chef.svg'

const Features = () => {
    return (
        <section className='max-padd-container py-16 xl:py-28 !pb-12'>
            <Title title1={"WHY CHOOSE"} title2={" US?"} titleStyles={"text-center !pb-16"} paraStyles={"!block"} />
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-12'>

                <div className='flexCenter flex-col gap-3 bg-deep p-4 py-8 rounded-xl'>
                    <img src={shipping} alt="shipping" height={44} width={44} />
                    <div className='flexCenter flex-col'>
                        <h5 className='h5'>Fast delivery</h5>
                        <hr className='w-8 bg-secondary h-1 rounded-full border-none' />
                    </div>
                    <p className='text-center'>Get your order quickly with our reliable and efficient service</p>
                </div>
                <div className='flexCenter flex-col gap-3 bg-deep p-4 py-8 rounded-xl'>
                    <img src={hot} alt="shipping" height={44} width={44} />
                    <div className='flexCenter flex-col'>
                        <h5 className='h5'>Hot Foods</h5>
                        <hr className='w-8 bg-secondary h-1 rounded-full border-none' />
                    </div>
                    <p className='text-center'>Savor freshly prepared, steaming hot meals delivered straight to you</p>
                </div>
                <div className='flexCenter flex-col gap-3 bg-deep p-4 py-8 rounded-xl'>
                    <img src={fresh} alt="shipping" height={44} width={44} />
                    <div className='flexCenter flex-col'>
                        <h5 className='h5'>Fresh Foods</h5>
                        <hr className='w-8 bg-secondary h-1 rounded-full border-none' />
                    </div>
                    <p className='text-center'>We serve meals made from the freshest and finest ingredients daily</p>
                </div>
                <div className='flexCenter flex-col gap-3 bg-deep p-4 py-8 rounded-xl'>
                    <img src={hat} alt="shipping" height={44} width={44} />
                    <div className='flexCenter flex-col'>
                        <h5 className='h5'>Expert Chefs</h5>
                        <hr className='w-8 bg-secondary h-1 rounded-full border-none' />
                    </div>
                    <p className='text-center'>Our skilled chefs craft every dish with pession and precision</p>
                </div>

            </div>
        </section>
    )
}

export default Features