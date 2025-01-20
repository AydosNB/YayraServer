import mongoose from "mongoose"
import { productDTO } from "../dtos/product.dto.js"
import cloudinary from "../config/cloudinary.js"
import { productModel } from "../models/product.model.js"

class ProductCantrollers {
    async getAllProduct(req, res) {
        try {
            const products = await productModel.find()
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }
    async createProduct(req, res) {
        const { name, description, price, countIn, categoryId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: 'Invalid ID format categoryId' });
        }
        try {
            const uploadResult = await cloudinary.uploader.upload(req.file?.path, {
                folder: 'user_images',
            });
            const imageUrl = uploadResult.secure_url;

            const product = await productModel.create({
                name,
                description,
                image: imageUrl,
                price,
                countIn,
                categoryId
            });

            const productDto = productDTO(product);
            res.status(201).json(productDto);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        try {
            const product = await productModel.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not fount' });
            }
            const reqData = req.body
            if (req.file?.path) {
                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'user_images',
                });
                const imageUrl = uploadResult.secure_url;
                const products = await productModel.findByIdAndUpdate(id, { ...reqData, image: imageUrl }, { new: true })
                const productDto = productDTO(products)
                res.status(200).json(productDto)
            } else {
                const products = await productModel.findByIdAndUpdate(id, reqData, { new: true })
                const productDto = productDTO(products)
                res.status(200).json(productDto)
            }
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        try {
            const product = await productModel.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not fount' });
            }
            const products = await productModel.findByIdAndDelete(id)
            const productDto = productDTO(products)
            res.status(200).json(productDto)
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async getOneProduct(req, res) {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        try {
            const product = await productModel.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not fount' });
            }

            const productDto = productDTO(product)
            res.status(200).json(productDto)
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }
}

export default new ProductCantrollers