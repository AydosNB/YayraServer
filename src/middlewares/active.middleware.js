import { userModel } from "../models/user.model.js";

export const activeMiddleware = async (req, res, next) => {
    try {
        const  userId  = req.userId
        const user = await userModel.findById(userId)
        if (user.isActive) {
            next()
        } else {
            return res.status(403).json({ message: "Account not verified" })
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}