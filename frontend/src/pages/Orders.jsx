import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Title from '../components/Title'
import Footer from '../components/Footer'

const Orders = () => {

    const { backendUrl, token, currency } = useContext(ShopContext)

    const [orderData, setOrderData] = useState([])

    const loadOrderData = async () => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
            if (response.data.success) {
                let allOrdersItem = []

                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })
                setOrderData(allOrdersItem.reverse())
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        loadOrderData()
    }, [token])

    return (
        <div className='max-padd-container mt-24'>
            <div className='pt-6 pb-20'>
                {/* TITLE */}
                <Title title1={'Orders '} title2={'List'} titleStyles={'h3'} />
                {/* CONTAINER */}
                {
                    orderData.map((item, i) => (
                        <div key={i} className='p-2 rounded-xl bg-deep mt-2'>
                            <div className='text-gray-700 flex flex-col gap-4'>
                                <div className='flex gap-x-3 w-full'>
                                    <div className='flexCenter p-2 bg-light rounded-lg'>
                                        <img src={item.image} alt="food_img" className='w-16' />
                                    </div>
                                    {/* ORDER INFO */}
                                    <div className='block w-full'>
                                        <h5 className='h5 capitalize line-clamp-1'>{item.name}</h5>
                                        <div className='flex gap-x-2 flex-col sm:flex-row sm:justify-between'>
                                            {/* price quantity size date payment */}
                                            <div className='text-xs'>
                                                <div className='flex items-center gap-x-2 sm:gap-x-3'>
                                                    <div className='flexCenter gap-x-2'>
                                                        <h5 className='medium-14'>Price:</h5>
                                                        <p>{currency}{item.price[item.size]}</p>
                                                    </div>
                                                    <div className='flexCenter gap-x-2'>
                                                        <h5 className='medium-14'>Quantity:</h5>
                                                        <p>{item.quantity}</p>
                                                    </div>
                                                    <div className='flexCenter gap-x-2'>
                                                        <h5 className='medium-14'>Size:</h5>
                                                        <p>{item.size}</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-x-2'>
                                                    <h5 className='medium-14'>Date:</h5>
                                                    <p className="text-gray-400">{new Date(item.date).toDateString()}</p>
                                                </div>
                                                <div className='flex items-center gap-x-2'>
                                                    <h5 className='medium-14'>Payment:</h5>
                                                    <p className="text-gray-400">{item.paymentMethod}</p>
                                                </div>
                                            </div>
                                            {/* status and button */}
                                            <div className="flex flex-col gap-2 sm:pr-4">
                                                <div className="flex items-center gap-2">
                                                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                                    <p className="max-sm:text-xs">{item.status}</p>
                                                </div>
                                                <button onClick={loadOrderData} className="btn-secondary !p-1 !px-3 !text-xs">
                                                    Track Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default Orders