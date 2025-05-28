import React, { useContext, useState } from 'react'
import { FaStar, FaStarHalfStroke } from 'react-icons/fa6'
import { TbShoppingBagPlus } from 'react-icons/tb'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Item = ({ food }) => {
    const { currency, addToCart } = useContext(ShopContext)
    const [size, setSize] = useState(food.sizes[0]) // Default size

    const handleAddToCart = () => {
        addToCart(food._id, size)
        toast.success(`${food.name} (${size}) added to cart!`)
    }

    return (
        <div>
            <div className='flex rounded-xl bg-deep relative'>
                {/* photo */}
                <div className='flexCenter m-6 rounded-full absolute top-0 bottom-0 -left-[88px]'>
                    <img src={food.image} alt="food_image" height={155} width={155} className='object-contain aspect-square rounded-xl' />
                </div>
                {/* Info */}
                <div className='mx-4 pl-20'>
                    {/* Title and description */}
                    <div className='py-3'>
                        <h4 className='bold-16 line-clamp-1 mb-1'>{food.name}</h4>
                        <div className='flex items-center justify-between pb-2'>
                            <h5 className='medium-14'>{food.category}</h5>
                            <div className='flex items-center justify-start gap-x-1 text-secondary bold-14'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalfStroke />
                            </div>
                        </div>
                        <p className='line-clamp-2'>{food.description}</p>
                    </div>
                    {/* Food Sizes */}
                    <div className='flexBetween mb-2'>
                        <div className='flex gap-1'>
                            {[...food.sizes].sort((a, b) => {
                                const order = ["H", "F", "S", "M", "L", "XL"]
                                return order.indexOf(a) - order.indexOf(b)
                            }).map((item, i) => (
                                <button onClick={() => setSize(item)} key={i} className={`${item === size ? "ring-1 ring-slate-900/10" : ""} h-6 w-6 bg-light text-xs font-semibold rounded-sm`}>
                                    {item}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className='flexCenter gap-x-1 text-[18px] bg-secondary text-white rounded-sm p-[3px]'>
                            <TbShoppingBagPlus />
                        </button>
                    </div>
                    {/* Order info */}
                    <div className='flexBetween rounded-xl pb-3 text-[13px] font-semibold'>
                        <div className='flexBetween gap-1'>
                            <h5>Prep:</h5>
                            <p className='text-xs relative top-[1px]'>20m</p>
                        </div>
                        <hr className='h-4 w-[1px] bg-tertiary/10 border-none' />
                        <div className='flexCenter gap-1'>
                            <h5>Price:</h5>
                            <p className='text-xs text-secondary relative top-[1px]'>
                                {currency}{food.price[size]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item
