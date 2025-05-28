import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import CartTotal from '../components/CartTotal'

const PlaceOrder = () => {
    const { navigate, backendUrl, cartItems, getCartAmount, delivery_charges, foods, token, setCartItems } = useContext(ShopContext)
    const [method, setMethod] = useState('cod')
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "",
        street: "", city: "", country: "", state: "",
        zipcode: "", phone: "",
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            let orderItems = []
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(foods.find(food => food._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_charges
            }

            if (method === 'cod') {
                const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                if (response.data.success) {
                    toast.success("Order placed successfully!")
                    setCartItems({})
                    navigate('/orders')
                } else {
                    toast.error(response.data.message)
                }
            } else if (method === 'stripe') {
                const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
                if (responseStripe.data.success) {
                    window.location.replace(responseStripe.data.session_url)
                } else {
                    toast.error(responseStripe.data.message)
                }
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='max-padd-container mt-24'>
            <form onSubmit={onSubmitHandler} className="py-6">
                <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
                    {/* Left side delivery information */}
                    <div className="flex flex-1 flex-col gap-3 text-[95%]">
                        <Title title1={'Delivery '} title2={'Information'} titleStyles={'h3'} />
                        <div className="flex gap-3">
                            <input required name='firstName' value={formData.firstName} onChange={onChangeHandler} disabled={loading} placeholder='First Name' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none' />
                            <input required name='lastName' value={formData.lastName} onChange={onChangeHandler} disabled={loading} placeholder='Last Name' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none' />
                        </div>
                        <input required name='email' value={formData.email} onChange={onChangeHandler} disabled={loading} placeholder='Email' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none' />
                        <input required name='phone' value={formData.phone} onChange={onChangeHandler} disabled={loading} placeholder='Phone' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none' />
                        <input required name='street' value={formData.street} onChange={onChangeHandler} disabled={loading} placeholder='Street' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none' />
                        <div className="flex gap-3">
                            <input required name='city' value={formData.city} onChange={onChangeHandler} disabled={loading} placeholder='City' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none' />
                            <input required name='state' value={formData.state} onChange={onChangeHandler} disabled={loading} placeholder='State' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none' />
                        </div>
                        <div className="flex gap-3">
                            <input required name='zipcode' value={formData.zipcode} onChange={onChangeHandler} disabled={loading} placeholder='Zip Code' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none' />
                            <input required name='country' value={formData.country} onChange={onChangeHandler} disabled={loading} placeholder='Country' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none' />
                        </div>
                    </div>

                    {/* Right side Cart total */}
                    <div className="flex flex-1 flex-col">
                        <CartTotal />
                        <div className="my-6">
                            <h3 className="bold-20 mb-5">Payment <span className="text-secondary">Method</span></h3>
                            <div className="flex gap-3">
                                <div onClick={() => setMethod('stripe')} className={`${method === 'stripe' ? 'btn-secondary' : 'btn-outline'} !py-1 text-xs cursor-pointer`}>Stripe</div>
                                <div onClick={() => setMethod('cod')} className={`${method === 'cod' ? 'btn-secondary' : 'btn-outline'} !py-1 !px-3 text-xs cursor-pointer`}>Cash on Delivery</div>
                            </div>
                        </div>
                        <div>
                            <button type='submit' className="btn-dark !rounded" disabled={loading}>
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </section>
    )
}

export default PlaceOrder
