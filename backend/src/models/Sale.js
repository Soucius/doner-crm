import mongoose from "mongoose";

const saleItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    priceAtSale: {
        type: Number,
        required: true,
    }
});

const saleSchema = new mongoose.Schema({
    cashier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
    },
    items: [saleItemSchema],
    subtotal: {
        type: Number,
        required: true,
    },
    tip: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Nakit', 'Kart'],
    }
}, { timestamps: true });

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;