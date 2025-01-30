import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { htmlData } from "../config/sendHtml.js"

dotenv.config()

const transOptions = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
}

const transporter = nodemailer.createTransport(transOptions)

const sendActivationLink = async (email, activatedLink) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Account verification",
            html: htmlData(activatedLink)
        })
        console.log(transporter)
    } catch (error) {
        console.error(error)
    }
}

export default sendActivationLink