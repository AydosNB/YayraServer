import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" }, // Buyurtma qaysi foydalanuvchiga tegishli
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "Product" },
            quantity: Number,
        }
    ],
}, { timestamps: true });

export const orderModel = model("Order", orderSchema);
