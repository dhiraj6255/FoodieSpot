import express from "express";
import { allOrders, placeOrder, placeOrderStripe, updateStatus, userOrders, verifyStripe } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router()

// FOR ADMIN PANEL
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)
// FOR PAYMENT
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/verifystripe', authUser, verifyStripe)
// FOR FRONTEND
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter