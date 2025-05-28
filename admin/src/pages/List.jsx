import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { TbTrash } from 'react-icons/tb'

const List = ({ token }) => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchList = async () => {
        setLoading(true)
        try {
            const response = await axios.get(backendUrl + "/api/product/list")
            if (response.data.success) {
                setList(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const removeProduct = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this product?")
        if (!confirm) return

        try {
            const response = await axios.post(
                backendUrl + "/api/product/remove",
                { id },
                { headers: { token } }
            )
            if (response.data.success) {
                toast.success(response.data.message)
                fetchList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div className='px-2 sm:px-8 py-12 h-screen overflow-auto hide-scrollbar'>
            <div className='flex flex-col gap-2'>
                <div className='grid grid-cols-[2fr_2fr_2fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-light bold-14 sm:bold-15 mb-3 rounded'>
                    <h5>Image</h5>
                    <h5>Name</h5>
                    <h5>Category</h5>
                    <h5>Price</h5>
                    <h5>Remove</h5>
                </div>

                {loading ? (
                    <p className="text-center py-8 text-gray-500">Loading products...</p>
                ) : list.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No products found.</p>
                ) : (
                    list.map((item) => (
                        <div
                            key={item._id}
                            className='grid grid-cols-[2fr_2fr_2fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 p-1 bg-light rounded-xl'
                        >
                            <img src={item.image} alt="food" className='w-12 h-12 object-cover rounded-lg' />
                            <h5 className='text-sm font-semibold'>{item.name}</h5>
                            <p className='font-semibold'>{item.category}</p>

                            {/* Show first price if exists */}
                            <div className='text-sm font-semibold'>
                                <select
                                    className='bg-light px-2 py-1 rounded border border-gray-300 text-sm'
                                    onChange={(e) => console.log(`Selected ${e.target.value} for ${item.name}`)}
                                >
                                    {item.sizes?.map(size => (
                                        <option key={size} value={size}>
                                            {size}: {currency}{item.price[size]}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <TbTrash
                                    onClick={() => removeProduct(item._id)}
                                    className='cursor-pointer text-lg text-red-500'
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default List
