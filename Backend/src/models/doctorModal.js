import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    image: { type: String, require: true },
    speciality: { type: String, require: true },
    degree: { type: String, require: true },
    experience: { type: String, require: true },
    about: { type: String, require: true },
    availabal: { type: Boolean, default: true },
    fees: { type: Number, require: true },
    address: { type: Object, require: true },
    date: { type: Number, require: true },
    slots_booked: { type: Object, default: {} },

}, { minimize: false });

const doctorModal = mongoose.model.doctor || mongoose.model('doctor', doctorSchema)
export default doctorModal;