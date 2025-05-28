import React, { useState } from 'react'
import upload_icon from '../assets/upload_icon.png'
import { TbTrash } from 'react-icons/tb'
import { FaPlus } from 'react-icons/fa'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [prices, setPrices] = useState([]) // Store size-price pairs dynamically
    const [category, setCategory] = useState('Curry')
    const [popular, setPopular] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }

    const addSizePrice = () => {
        setPrices([...prices, { size: "", price: "" }]) // Add a new size-price pair
    }

    const removesizePrice = (index) => {
        setPrices(prices.filter((_, i) => i !== index)) // Remove size price pair
    }

    const handleSizePriceChange = (index, field, value) => {
        const updatePrices = prices.map((item, i) =>
            i === index ? { ...item, [field]: field === "size" ? value.toUpperCase() : value } : item
        )
        setPrices(updatePrices)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()

            formData.append("name", name)
            formData.append("description", description)
            formData.append("prices", JSON.stringify(prices))
            formData.append("category", category)
            formData.append("popular", popular)
            formData.append("image", image)

            const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                setName("")
                setDescription("")
                setPrices([])
                setImage(null)
                setPopular(false)
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

    return (
        <div className='px-2 sm:px-8 py-12 h-screen'>
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-y-3 medium-14  lg:w-[777px]'>
                <div className='w-full'>
                    <h5 className='h5'>Product Name</h5>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        placeholder='Write here...'
                        className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-light mt-1 w-full max-w-lg'
                    />
                </div>
                <div className='w-full'>
                    <h5 className='h5'>Product Description</h5>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        rows={5}
                        placeholder='Write here...'
                        className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-light mt-1 w-full max-w-lg'
                    />
                </div>
                <div className='flex items-end gap-x-6'>
                    {/* CATEGORIES */}
                    <div>
                        <h5 className='h5'>Category</h5>
                        <select onChange={(e) => setCategory(e.target.value)} value={category} className='px-3 py-2 ring-1 ring-slate-900/10 rounded bg-light mt-1 sm:w-full text-gray-30'>
                            <option value="Curry">Curry</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Rice">Rice</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Fruits">Fruits</option>
                        </select>
                    </div>
                    <div className='flex gap-2 pt-2'>
                        <label htmlFor="image">
                            <img
                                src={image ? URL.createObjectURL(image) : upload_icon}
                                alt="upload-icon"
                                className='w-14 h-14 aspect-square object-cover ring-1 ring-slate-900/5 bg-light rounded-lg cursor-pointer'
                            />
                            <input
                                onChange={handleImageChange}
                                type="file"
                                name='image'
                                id='image'
                                hidden
                            />
                        </label>
                    </div>
                </div>
                {/* SIZES */}
                <div>
                    <h5 className='h5'>Size and Pricing</h5>
                    {prices.map((item, index) => (
                        <div key={index} className='flex items-end gap-4 mt-2'>
                            <input
                                onChange={(e) => handleSizePriceChange(index, "size", e.target.value)}
                                value={item.size}
                                type="text"
                                placeholder='(S,M,L)'
                                className='px-3 py-2 ring-1 ring-slate-900/10 rounded bg-light w-20'
                            />
                            <input
                                onChange={(e) => handleSizePriceChange(index, "price", e.target.value)}
                                value={item.price}
                                type="number"
                                placeholder='Price'
                                min={0}
                                className='px-3 py-2 ring-1 ring-slate-900/10 rounded bg-light w-20'
                            />
                            <button type='button' className='text-red-500 !p-2 text-xl'>
                                <TbTrash onClick={() => removesizePrice(index)} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addSizePrice}
                        type='button'
                        className='btn-secondary !rounded !text-xs flexCenter gap-x-2 mt-4 !px-3 !py-1'
                    >
                        <FaPlus /> Add Sizing
                    </button>
                </div>
                <div className='flexStart gap-2 my-2'>
                    <input onChange={() => setPopular(prev => !prev)} type="checkbox" checked={popular} id='popular' />
                    <label htmlFor="popular" className='cursor-pointer'>
                        Add to popular
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={loading || !name || !image}
                    className='btn-dark !rounded mt-3 max-w-44 sm:w-full disabled:opacity-50'>
                    {loading ? "Adding..." : "Add Product"}
                </button>

            </form>
        </div>
    )
}

export default Add