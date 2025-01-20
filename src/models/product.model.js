import { Schema, model } from "mongoose"

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image : {type : String, required : true},
    price : {type : Number, required : true},
    countIn : {type : Number, required : true},
    categoryId  : {type : Schema.Types.ObjectId, required : true, ref : "Category"}
}, {timestamps : true})

export const productModel = model("Product", ProductSchema)