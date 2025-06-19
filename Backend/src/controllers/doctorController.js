import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModal from '../models/doctorModal.js'
import jwt from 'jsonwebtoken'








//api for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { email, password, name, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file
        // console.log(imageFile, email)

        //check for all data
        if (!email || !password || !name || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({
                success: false,
                message: "Missing details"
            })
        }
        //validatting email format
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "please enter email"
            })
        }
        //validattig password
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "please enter a strong password"
            })
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        //up load image to cloudi
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }
        const newDoctor = new doctorModal(doctorData)
        await newDoctor.save();
        return res.json({
            success: true,
            message: "adding doctor"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error
        })
    }
}

//api for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password)
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SERECT);
            res.json({
                success: true,
                token
            })
        } else {
            return res.json({
                success: false,
                message: 'Invalid credentials'
            })
        }

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error
        })
    }
}
export { addDoctor, loginAdmin }