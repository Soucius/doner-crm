import Branch from "../models/Branch.js";
import mongoose from "mongoose";

export async function getAllBranches(_, res) {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "branch_id",
                    as: "users"
                }
            },
            {
                $addFields: {
                    userCount: { $size: "$users" }
                }
            }
        ];

        const branches = await Branch.aggregate(pipeline);

        res.status(200).json(branches);
    } catch (error) {
        console.error("Error fetching branches: ", error);
        
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getBranchById(req, res) {
    try {
        const branchId = req.params.id;

        const pipeline = [
            { $match: { _id: new mongoose.Types.ObjectId(branchId) } },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'branch_id',
                    as: 'users'
                }
            }
        ];

        const result = await Branch.aggregate(pipeline);

        if (result.length === 0) {
            return res.status(404).json({ message: "Branch not found" });
        }
        
        res.status(200).json(result[0]);
    } catch (error) {
        console.error("Error fetching branch: ", error);
        
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createBranch(req, res) {
    try {
        const { branch_name, branch_address, branch_phone, branch_is_active } = req.body;

        const newBranch = new Branch({
            branch_name,
            branch_address,
            branch_phone,
            branch_is_active
        });

        const savedBranch = await newBranch.save();

        res.status(201).json(savedBranch);
    } catch (error) {
        console.error("Error creating branch: ", error);
        
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateBranch(req, res) {
    try {
        const { branch_name, branch_address, branch_phone, branch_is_active } = req.body;

        const updatedBranch = await Branch.findByIdAndUpdate(
            req.params.id,
            { branch_name, branch_address, branch_phone, branch_is_active },
            { new: true }
        );

        if (!updatedBranch) {
            return res.status(404).json({ message: "Branch not found" });
        }

        res.status(200).json(updatedBranch);
    } catch (error) {
        console.error("Error updating branch: ", error);
        
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteBranch(req, res) {
    try {
        const deletedBranch = await Branch.findByIdAndDelete(req.params.id);

        if (!deletedBranch) {
            return res.status(404).json({ message: "Branch not found" });
        }

        res.status(200).json({ message: "Branch deleted successfully" });
    } catch (error) {
        console.error("Error deleting branch: ", error);
        
        res.status(500).json({ message: "Internal Server Error" });
    }
}