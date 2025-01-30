import express from "express"
import productControllers from "../controllers/product.controller.js"
import upload from "../middlewares/multer.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { adminMiddleware } from "../middlewares/admin.middleware.js"
import { activeMiddleware } from "../middlewares/active.middleware.js"

const router = express.Router()

router.get("/get", productControllers.getAllProduct)
router.post("/add", authMiddleware, activeMiddleware, adminMiddleware, upload.single("image"), productControllers.createProduct)
router.put("/edit/:id", authMiddleware, activeMiddleware, adminMiddleware, upload.single("image"), productControllers.updateProduct)
router.delete("/delete/:id", authMiddleware, activeMiddleware, adminMiddleware, productControllers.deleteProduct)
router.get("/get-one/:id", productControllers.getOneProduct)


export const productRoutes = router