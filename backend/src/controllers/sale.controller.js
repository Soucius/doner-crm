import Sale from '../models/Sale.js';
import Product from '../models/Product.js';

export async function createSale(req, res) {
    try {
        const { items, subtotal, tip, total, paymentMethod } = req.body;
        const cashierId = req.user._id;
        const branchId = req.user.branch_id;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Satış için en az bir ürün olmalıdır." });
        }

        const newSale = new Sale({
            cashier: cashierId,
            branch: branchId,
            items,
            subtotal,
            tip,
            total,
            paymentMethod
        });

        const savedSale = await newSale.save();

        for (const item of items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { product_stock: -item.quantity }
            });
        }

        const populatedSale = await Sale.findById(savedSale._id)
            .populate('cashier', 'user_name')
            .populate('branch', 'branch_name')
            .populate('items.product', 'product_name');
        
        res.status(201).json(populatedSale);
    } catch (error) {
        console.error("Error creating sale:", error);

        res.status(500).json({ message: "Satış oluşturulurken bir sunucu hatası oluştu." });
    }
}