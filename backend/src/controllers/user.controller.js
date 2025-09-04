import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";

export async function getAllUsers(_, res) {
    try {
        const users = await User.find().sort({ createdAt: -1 }).populate("branch_id").populate({
            path: "role_id",
            populate: {
                path: "permissions"
            }
        });

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id).populate("branch_id");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user: ", error);
        
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createUser(req, res) {
    try {
        const { user_name, user_email, user_phone, user_password, branch_id } = req.body;

        const defaultRole = await Role.findOne({ role_name: "user" });

        if (!defaultRole) {
            return res.status(500).json({ message: "Default role not found" });
        }

        const newUser = new User({
            user_name,
            user_email,
            user_phone,
            user_password,
            branch_id,
            role_id: defaultRole._id
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error creating user: ", error);
        
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateUser(req, res) {
    try {
        const { user_name, user_email, user_phone, user_password, user_role, branch_id } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { user_name, user_email, user_phone, user_password, user_role, branch_id },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user: ", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteUser(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user: ", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function loginUser(req, res) {
    try {
        const { user_email, user_password } = req.body;

        const user = await User.findOne({ user_email });

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        const isMatch = await bcrypt.compare(user_password, user.user_password);

        if (!isMatch) {
            return res.status(400).json({ message: "Geçersiz şifre." });
        }

        res.status(200).json({
            _id: user._id,
            user_name: user.user_name,
            user_email: user.user_email
        });

    } catch (error) {
        console.error("Error logging in user:", error);
        
        res.status(500).json({ message: "Internal Server Error" });
    }
}