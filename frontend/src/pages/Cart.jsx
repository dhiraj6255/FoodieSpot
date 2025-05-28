import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { FaRegWindowClose } from 'react-icons/fa'
import { FaPlus, FaMinus } from 'react-icons/fa6'
import CartTotal from '../components/CartTotal'

const Cart = () => {

    const { foods, cartItems, currency, updateQuantity, navigate } = useContext(ShopContext)
    const [cartData, setCartData] = useState([])
    const [quantities, setQuantities] = useState({})

    useEffect(() => {
        if (foods.length > 0) {
            const tempData = []
            const initialQuantities = {}
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item]
                        })
                        initialQuantities[`${items}-${item}`] = cartItems[items][item]
                    }
                }
            }
            setCartData(tempData)
            setQuantities(initialQuantities)
        }
    }, [cartItems, foods])

    const increment = (id, size) => {
        const key = `${id}-${size}`
        const newValue = quantities[key] + 1;
        setQuantities(prev => ({ ...prev, [key]: newValue }))
        updateQuantity(id, size, newValue);
    }

    const decrement = (id, size) => {
        const key = `${id}-${size}`
        if (quantities[key] > 1) {
            const newValue = quantities[key] - 1;
            setQuantities(prev => ({ ...prev, [key]: newValue }))
            updateQuantity(id, size, newValue);
        }
    }

    return (
        <section className='max-padd-container mt-24'>
            <div className='pt-6'>
                {/* Title */}
                <Title title1={"Cart"} title2={"List"} titleStyles={"h3"} />
                {/* Container */}
                <div>
                    {cartData.map((item, i) => {
                        const productData = foods.find(product => product._id === item._id
                        )
                        const key = `${item._id}-${item.size}`
                        return (
                            <div key={i} className='p-2 rounded-xl bg-deep mt-2'>
                                <div className='flex items-center gap-x-3'>
                                    <div className='flex items-start gap-6 p-2 bg-light rounded-xl'>
                                        <img src={productData.image} alt={productData.name} className='w-16 sm:w-18' />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <div className='flexBetween'>
                                            <h5 className='h5 !my-0 line-clamp-1'>{productData.name}</h5>
                                            <FaRegWindowClose onClick={() => updateQuantity(item._id, item.size, 0)} className="cursor-pointer" />
                                        </div>
                                        <p className='bold-14 my-0.5'>{item.size}</p>
                                        <div className='flexBetween'>
                                            <div className='flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-primary'>
                                                <button onClick={() => decrement(item._id, item.size)} className='p-1.5 text-white bg-secondary rounded-full shadow-md'>
                                                    <FaMinus className='text-xs' />
                                                </button>
                                                <p className='px-2'>{quantities[key]}</p>
                                                <button onClick={() => increment(item._id, item.size)} className='p-1.5 text-white bg-secondary rounded-full shadow-md'>
                                                    <FaPlus className='text-xs' />
                                                </button>
                                            </div>
                                            <h4 className='h4'>{currency}{productData.price[item.size]}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* Cart Total */}
                <div className='flex my-20'>
                    <div className='w-full sm:w-[450px]'>
                        <CartTotal />
                        <button onClick={() => navigate('/place-order')} className='btn-secondary mt-7'>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Cart