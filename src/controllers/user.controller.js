import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { userModel } from "../models/user.model.js"
import { userDTO } from "../dtos/user.dto.js"
import sendActivationLink from "../services/mail.service.js"
import mongoose from "mongoose"


class UserControllers {

    async getAllUser(req, res) {
        try {
            const users = await userModel.find()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async getOneUser(req, res) {
        const id  = req.userId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        try {
            const user = await userModel.findById(id)
            if (!user) {
                return res.status(404).json({ message: 'User not fount' });
            }
            const userDto = userDTO(user)
            res.status(200).json(userDto)
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async registerUser(req, res) {
        const { userName, email, password } = req.body
        try {
            const userExists = await userModel.findOne({ email })
            if (userExists) return res.status(400).json({ message: "Email already exists" })

            const isAdmin = password === process.env.ADMIN_SECRET_KEY
            const hashPass = await bcrypt.hash(password, 10)

            const userData = await userModel.create({ userName, email, password: hashPass, isAdmin })
            const userDto = userDTO(userData)

            const activatedLink = `${process.env.API_URL}/api/users/activate/${userDto.id}`
            await sendActivationLink(userDto.email, activatedLink)

            res.status(201).json(userDto)
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async loginUser(req, res) {
        const { email, password } = req.body
        try {
            const userData = await userModel.findOne({ email })
            if (!userData) return res.status(404).json({ message: "Email not fount" })

            const isMatch = await bcrypt.compare(password, userData.password)
            if (!isMatch) return res.status(400).json({ message: "Invalid password" })

            const isAdmin = password === process.env.ADMIN_SECRET_KEY
            const token = jwt.sign({ id: userData._id, role: isAdmin ? "admin" : "user" }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

            const userDto = userDTO(userData)
            res.json({ user: userDto, token })
        } catch (error) {
            res.status(500).json({ message: "Server error:" })
        }
    }

    async activatedUser(req, res) {
        try {
            const userData = await userModel.findById(req.params.id)
            if (!userData) return res.status(404).json({ message: "User not fount" })

            userData.isActive = true
            await userData.save()

            res.redirect("https://click-shop-gamma.vercel.app/profile")
        } catch (error) {
            res.status(500).json({ message: "Server error:" })
        }
    }
}

export default new UserControllers