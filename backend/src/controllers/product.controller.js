import Product from "../models/Product.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function getAllProducts(req, res) {
    try {
        const { search, category, pos } = req.query;

        const filter = {};

        if (search) {
            filter.product_name = { $regex: search, $options: "i"  };
        }

        if (category) {
            filter.categories = category;
        }

        if (pos === 'true') {
            filter.product_is_active = true;
            filter.product_stock = { $gt: 0 };
        }

        const products = await Product.find(filter).sort({ createdAt: -1 }).populate("categories");

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products: ", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id).populate("categories").populate({
            path: "ingredients.ingredient",
            model: "Ingredient"            
        }).populate({
            path: "ingredients.unit",
            model: "Unit"
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product: ", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function createProduct(req, res) {
    try {
        if (req.body.ingredients) {
            const ingredientsData = Array.isArray(req.body.ingredients) ? req.body.ingredients[0] : req.body.ingredients;

            req.body.ingredients = JSON.parse(ingredientsData);
        }

        let imageUrl = "";

        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const result = await cloudinary.v2.uploader.upload(dataURI, {
                folder: "products"
            });
            imageUrl =  result.secure_url;
        }

        const newProduct = new Product({
            ...req.body,
            product_image: imageUrl
        });

        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error creating product: ", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function updateProduct(req, res) {
    try {
        const updateData = { ...req.body };

        if (updateData.ingredients) {
            const ingredientsData = Array.isArray(updateData.ingredients) ? updateData.ingredients[0] : updateData.ingredients;

            updateData.ingredients = JSON.parse(ingredientsData);
        }

        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const result = await cloudinary.v2.uploader.upload(dataURI, {
                folder: "products"
            });
            updateData.product_image = result.secure_url;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product: ", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function deleteProduct(req, res) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product: ", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function deleteMultipleProducts(req, res) {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Lütfen silinecek ürün ID'lerini sağlayın." });
        }

        const result = await Product.deleteMany({ _id: { $in: ids } });

        res.status(200).json({ message: `${result.deletedCount} ürün başarıyla silindi.` });
    } catch (error) {
        console.error("Error deleting multiple products: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}