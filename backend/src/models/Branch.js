import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    branch_name: {
        type: String,
        required: true,
        unique: true
    },
    branch_address: {
        type: String,
        required: true
    },
    branch_phone: {
        type: String,
        required: true
    },
    branch_is_active: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;