import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    products: [
        {
            name : {type : String, required : true},
            image : {type : String, required : true},
            price : {type : Number, required : true},
            quantity: {type : Number, required : true},
        }
    ]
}, { timestamps: true });

export const orderModel = model("Order", orderSchema);
