import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "İsim alanı zorunludur."],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "E-posta alanı zorunludur."],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Lütfen geçerli bir e-posta adresi girin.']
    },
    message: {
        type: String,
        required: [true, "Mesaj alanı zorunludur."],
        trim: true,
    }
}, { timestamps: true });

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;