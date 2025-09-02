import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_phone: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    },
    branch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch"
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;