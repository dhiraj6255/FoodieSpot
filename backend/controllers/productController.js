import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// Function for adding product
const addProduct = async (req, res) => {
    try {
        const { name, description, category, prices, popular } = req.body

        // Extracting the image if provided
        const image = req.file;

        // upload the image to cloudinary or use a default image if no image is provided
        let imageUrl;
        if (image) {
            const result = await cloudinary.uploader
                .upload(image.path, { resource_type: "image" })
            imageUrl = result.secure_url
        } else {
            // Default image URL if no image is provided
            imageUrl = "https://via.placeholder.com/150"
        }

        const parsedPrices = JSON.parse(prices)
        const price = parsedPrices.reduce((acc, curr) => {
            acc[curr.size] = Number(curr.price)
            return acc
        }, {})

        const sizes = parsedPrices.map((item) => item.size)

        const productData = {
            name,
            description,
            category,
            price,
            popular: popular === "true",
            sizes,
            image: imageUrl,
            date: Date.now()
        }

        console.log("Product Data :", productData)
        const product = new productModel(productData)
        await product.save()

        res.json({ success: true, message: "Food Added", product })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// Function for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// Function for list product
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// Function for getting single product information
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export { addProduct, removeProduct, listProduct, singleProduct }