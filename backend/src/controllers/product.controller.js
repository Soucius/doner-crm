import Product from "../models/Product.js";

export async function getAllProducts(_, res) {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).populate("categories");

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products: ", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id).populate("categories");

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
        const { product_name, product_description, product_price, product_stock, product_image, product_is_active, categories } = req.body;

        const newProduct = new Product({
            product_name,
            product_description,
            product_price,
            product_stock,
            product_image,
            product_is_active,
            categories
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
        const { product_name, product_description, product_price, product_stock, product_image, product_is_active } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                product_name,
                product_description,
                product_price,
                product_stock,
                product_image,
                product_is_active
            },
            { new: true }
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