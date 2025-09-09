import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};

export async function getAllUsers(req, res) {
    try {
        const { search, role, branch } = req.query;

        const filter = {};

        if (search) {
            const regex = new RegExp(search, 'i');

            filter.$or = [
                { user_name: regex },
                { user_email: regex }
            ];
        }

        if (role) {
            filter.role_id = role;
        }

        if (branch) {
            filter.branch_id = branch;
        }

        const users = await User.find(filter)
            .populate('role_id', 'role_name')
            .populate('branch_id', 'branch_name')
            .select('-user_password')
            .sort({ createdAt: -1 });

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

        if (!branch_id) {
            return res.status(400).json({ message: "Lütfen geçerli bir şube seçin." });
        }

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
        const token = generateToken(savedUser._id);

        res.status(201).json({ token, user: savedUser });
    } catch (error) {
        console.error("Error creating user: ", error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        
        if (error.code === 11000) {
            return res.status(400).json({ message: "Bu e-posta veya telefon numarası zaten kayıtlı."})
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        if (updateData.user_password && updateData.user_password !== '') {
            const salt = await bcrypt.genSalt(10);
            updateData.user_password = await bcrypt.hash(updateData.user_password, salt);
        } else {
            delete updateData.user_password;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-user_password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user: ", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateUserBranch(req, res) {
    try {
        const { userId } = req.params;
        const { branchId } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { branch_id: branchId }, 
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user branch: ", error);

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

        const token = generateToken(user._id);

        res.status(200).json({token, user: {
            _id: user._id,
            user_name: user.user_name,
            user_email: user.user_email
        }});

    } catch (error) {
        console.error("Error logging in user:", error);
        
        res.status(500).json({ message: "Internal Server Error" });
    }
}