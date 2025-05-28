import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import Item from './Item'

import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

const PopularFoods = () => {
    const { foods } = useContext(ShopContext)
    const [popularFoods, setPopularFoods] = useState([])

    // Extract top 6 popular items when foods change
    useEffect(() => {
        if (foods?.length) {
            const data = foods.filter(item => item.popular === true)
            setPopularFoods(data.slice(0, 6))
        }
    }, [foods])

    return (
        <section className='max-padd-container pt-16'>
            <Title
                title1="POPULAR"
                title2=" FOODS"
                titleStyles="text-center !pb-16"
                paraStyles="!block"
            />

            {/* Swiper Container */}
            <Swiper
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    700: { slidesPerView: 2, spaceBetween: 25 },
                    1050: { slidesPerView: 3, spaceBetween: 25 },
                    1400: { slidesPerView: 4, spaceBetween: 25 },
                }}
                modules={[Autoplay, Pagination]}
                className="h-[255px]"
            >
                {popularFoods.length > 0 ? (
                    popularFoods.map(food => (
                        <SwiperSlide key={food._id} className='pl-16'>
                            <Item food={food} />
                        </SwiperSlide>
                    ))
                ) : (
                    <div className="text-center col-span-full">No popular items found.</div>
                )}
            </Swiper>
        </section>
    )
}

export default PopularFoods
