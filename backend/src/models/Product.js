import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_description: {
        type: String,
        required: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    product_stock: {
        type: Number,
        default: 0
    },
    product_image: {
        type: String,
        required: true,
    },
    product_is_active: {
        type: Boolean,
        default: false
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }]
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;