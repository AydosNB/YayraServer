import {Schema, model} from "mongoose"

const UserSchema = new Schema({
    userName  : {type  :String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    isAdmin : {type : Boolean, default : false},
    isActive : {type : Boolean, default : false},
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }]
}, {timestamps : true})

export const userModel = model("User", UserSchema)