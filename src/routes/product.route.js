import express from "express"
import productControllers from "../controllers/product.controller.js"
import upload from "../middlewares/multer.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { adminMiddleware } from "../middlewares/admin.middleware.js"

const router = express.Router()

router.get("/get", productControllers.getAllProduct)
router.post("/add", authMiddleware, adminMiddleware, upload.single("image"), productControllers.createProduct)
router.put("/edit/:id", authMiddleware, adminMiddleware, upload.single("image"), productControllers.updateProduct)
router.delete("/delete/:id", authMiddleware, adminMiddleware, productControllers.deleteProduct)
router.get("/get-one/:id", productControllers.getOneProduct)


export const productRoutes = router