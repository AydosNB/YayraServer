import mongoose from "mongoose"
import { categoryDTO } from "../dtos/category.dto.js"
import { categoryModel } from "../models/category.model.js"
import cloudinary from "../config/cloudinary.js"
import { productModel } from "../models/product.model.js"

class CategoryCantrollers {
    async getAllCategory(req, res) {
        try {
            const categories = await categoryModel.find()
            res.status(200).json(categories)
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }
    async createCategory(req, res) {
        const { name, description } = req.body;

        try {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'user_images',
            });
            const imageUrl = uploadResult.secure_url;

            const category = await categoryModel.create({
                name,
                description,
                image: imageUrl,
            });

            const categoryDto = categoryDTO(category);
            res.status(201).json(categoryDto);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }


    async updateCategory(req, res) {
        const { id } = req.params


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        try {
            const category = await categoryModel.findById(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not fount' });
            }
            const reqData = req.body
            if (req.file?.path) {
                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'user_images',
                });
                const imageUrl = uploadResult.secure_url;
                const categories = await categoryModel.findByIdAndUpdate(id, { ...reqData, image : imageUrl }, { new: true })
                const categoryDto = categoryDTO(categories)
                res.status(200).json(categoryDto)
            } else {
                const categories = await categoryModel.findByIdAndUpdate(id, reqData, { new: true })
                const categoryDto = categoryDTO(categories)
                res.status(200).json(categoryDto)
            }
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async deleteCategory(req, res) {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        try {
            const category = await categoryModel.findById(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not fount' });
            }
            const categories = await categoryModel.findByIdAndDelete(id)
            await productModel.deleteMany({ categoryId: id });
            const categoryDto = categoryDTO(categories)
            res.status(200).json(categoryDto)
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async getOneCategory(req, res) {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        try {
            const category = await categoryModel.findById(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not fount' });
            }

            const categoryDto = categoryDTO(category)
            res.status(200).json(categoryDto)
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }
}

export default new CategoryCantrollers