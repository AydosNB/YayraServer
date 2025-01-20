import express from "express"
import userControllers from "../controllers/user.controller.js"
import OrderControllers from "../controllers/order.controller.js"
import { activeMiddleware } from "../middlewares/active.middleware.js"
import { adminMiddleware } from "../middlewares/admin.middleware.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()
router.get("/get", authMiddleware, adminMiddleware, userControllers.getAllUser)
router.post("/register", userControllers.registerUser)
router.post("/login", userControllers.loginUser)
router.get("/activate/:id", userControllers.activatedUser)
router.get("/:userId/get-orders", OrderControllers.getAllOrder)
router.post("/:userId/create-order", activeMiddleware, OrderControllers.createOrder)


export const userRoutes = router