import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Delivery_Charges = 10;
const currency = 'usd';

// PLACE ORDER USING COD
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// PLACE ORDER USING STRIPE
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const order = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        });

        await order.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency,
                product_data: { name: item.name },
                unit_amount: Math.round(item.price[item.size] * 100),
            },
            quantity: item.quantity
        }));

        // Add Delivery Charges
        line_items.push({
            price_data: {
                currency,
                product_data: { name: 'Delivery Charges' },
                unit_amount: Math.round(Delivery_Charges * 100)
            },
            quantity: 1
        });

        const totalInCents = line_items.reduce((sum, item) => sum + (item.price_data.unit_amount * item.quantity), 0);

        if (totalInCents < 50) {
            return res.json({
                success: false,
                message: 'Minimum order amount must be at least $0.50.'
            });
        }

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${order._id}&userId=${userId}`,
            cancel_url: `${origin}/verify?success=false&orderId=${order._id}&userId=${userId}`,
            line_items,
            mode: 'payment'
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// VERIFY STRIPE PAYMENT (TEMPORARY)
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: 'Payment not completed.' });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// ADMIN & USER ORDER FUNCTIONS
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    placeOrder,
    placeOrderStripe,
    verifyStripe,
    allOrders,
    userOrders,
    updateStatus
};