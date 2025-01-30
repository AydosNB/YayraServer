import mongoose from "mongoose";
import { orderModel } from "../models/order.model.js";
import { userModel } from "../models/user.model.js";

class OrderControllers {
    async getAllOrder(req, res) {
        const userId = req.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        try {
            const users = await userModel.findById(userId).populate({
                path: "orders",
            });

            if (!users) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(users.orders);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async getAllOrderAdmin(req, res) {
        try {
            const orders = await orderModel.find()
        
            if (!orders) {
                return res.status(404).json({ message: "Order not found" });
            }

            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async createOrder(req, res) {
        const userId = req.userId;
        const { products } = req.body
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        try {
            const order = await orderModel.create({ userId, products })
            const user = await userModel.findById(userId);
            user.orders.push(order._id);
            await user.save();
            res.status(201).json({ message: "Order created successfully", order });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async clearOrderHistory(req, res) {
        const userId = req.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        try {
            const users = await userModel.findById(userId)
            if (!users) {
                return res.status(404).json({ message: "User not found" });
            }
            users.orders.splice(0, users.orders.length)
            users.save()
            res.status(200).json(users.orders);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }
}

export default new OrderControllers