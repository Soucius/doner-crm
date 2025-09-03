import Category from "../models/Category.js";

export async function getAllCategories(_, res) {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "categories",
                    as: "products"
                }
            }
        ];

        const categories = await Category.aggregate(pipeline).sort({ createdAt: -1 });

        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories: ", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getCategoryById(req, res) {
    try {
        const pipeline = [
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "categories",
                    as: "products"
                }
            }
        ];

        const category = await Category.aggregate(pipeline);

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json(category[0]);
    } catch (error) {
        console.error("Error fetching category: ", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function createCategory(req, res) {
    try {
        const { category_name, category_description } = req.body;

        const newCategory = new Category({
            category_name,
            category_description
        });

        const savedCategory = await newCategory.save();

        res.status(201).json(savedCategory);
    } catch (error) {
        console.error("Error creating category: ", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function updateCategory(req, res) {
    try {
        const { category_name, category_description } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                category_name,
                category_description
            },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error("Error updating category: ", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function deleteCategory(req, res) {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category: ", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
}