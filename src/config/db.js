import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected : " + connect.connection.host)
    } catch (error) {
        console.error(`MongoDB connect error`)
    }
}