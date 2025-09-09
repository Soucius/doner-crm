import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    abbreviation: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true });

const Unit = mongoose.model("Unit", unitSchema);

export default Unit;