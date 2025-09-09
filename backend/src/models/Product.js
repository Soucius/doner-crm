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
        default: ""
    },
    product_is_active: {
        type: Boolean,
        default: false
    },

    ingredients: [{
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient',
            required: true,
        },
        amount: {
            type: Number,
            required: true
        },
        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Unit',
            required: true,
        }
    }],

    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }]
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;