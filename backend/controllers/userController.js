import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

// Creating a Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' }) // or '1h', '30m'
}

// User register route
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // Check if user already exists or not
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }
        // Checking email format and password atrength
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email address" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // Hashing user password using bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create a new user using hashed password
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, message: "Account created successfully", token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// User login route
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, message: "Login successfully", token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Admin login route
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, message: "Login successfully", token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, adminLogin }