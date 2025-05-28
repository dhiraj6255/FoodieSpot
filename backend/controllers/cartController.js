import userModel from "../models/userModel.js"

// ADDING PRODUCT TO THE CART
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body

        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Added to Cart" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// UPDATING USER CART DATA
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body

        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Updated the Cart" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// GETTING USER CART
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData

        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addToCart, updateCart, getUserCart }