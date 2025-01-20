import express from "express"
import dotenv from "dotenv"
import { connectMongoDB } from "./src/config/db.js"
import cors from "cors"
import { userRoutes } from "./src/routes/user.route.js"
import { categoryRoutes } from "./src/routes/category.route.js"
import multer from "multer"
import { productRoutes } from "./src/routes/product.route.js"
import { documentApi } from "./src/config/document.js"

dotenv.config()
connectMongoDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/users", userRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/products", productRoutes)




app.get("/", (req, res) => {
    try {
        res.status(200).send(documentApi)
    } catch (error) {
        console.warn(error.message)
    }
})

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Fayl xatosi: ${err.message}` });
    }
    if (err.message) {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Serverda xatolik yuz berdi!' });
  });

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running : http://localhost:${PORT}`))