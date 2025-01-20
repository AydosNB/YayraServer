import express from "express"
import categoryControllers from "../controllers/category.controller.js"
import upload from "../middlewares/multer.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { adminMiddleware } from "../middlewares/admin.middleware.js"

const router = express.Router()

router.get("/get", categoryControllers.getAllCategory)
router.post("/add", authMiddleware, adminMiddleware, upload.single("image"), categoryControllers.createCategory)
router.put("/edit/:id",authMiddleware, adminMiddleware, upload.single("image"), categoryControllers.updateCategory)
router.delete("/delete/:id", authMiddleware, adminMiddleware, categoryControllers.deleteCategory)
router.get("/get-one/:id", categoryControllers.getOneCategory)


export const categoryRoutes = router