import express from "express"
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express(); // Initialize Express application
const port = process.env.PORT || 4000;

connectDB() // Establish  connection to the database
connectCloudinary() // Set up Cloudinary for image storage

// Middleware setup
app.use(express.json()) // Enables JSON request body parsing
app.use(cors()) // Allows cross-origin requests

// Define API routes
app.use('/api/user', userRouter) // Routes for user-related operations
app.use('/api/product', productRouter) // Routes for product management
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Root endpoints to check api status
app.get('/', (req, res) => {
    res.send('API successfully connected!')
})

// Start the server
app.listen(port, () => console.log(`Server is running on PORT: ${port}`))