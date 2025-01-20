import nodemailer from "nodemailer"
import dotenv from "dotenv"

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
            html: `
              <div>
                <h4>For activation click on link</h4>
                <a href="${activatedLink}">Click here !</a>
              </div>
            `
        })
    } catch (error) {
        console.error(error)
    }
}

export default sendActivationLink