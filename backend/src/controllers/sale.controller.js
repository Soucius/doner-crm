import Sale from '../models/Sale.js';
import Product from '../models/Product.js';

export async function createSale(req, res) {
    try {
        const { items, subtotal, tip, total, paymentMethod } = req.body;
        const cashierId = req.user._id;
        const branchId = req.user.branch_id;

        if (!branchId) {
            return res.status(400).json({ message: "Satışı yapan kasiyerin atanmış bir şubesi bulunmuyor." });
        }

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Satış için en az bir ürün olmalıdır." });
        }

        const lowStockAlerts = [];

        for (const item of items) {
            const updatedProduct = await Product.findByIdAndUpdate(
                item.product,
                { $inc: { product_stock: -item.quantity } },
                { new: true }
            );

            if (updatedProduct.product_stock <= 0) {
                updatedProduct.product_is_active = false;
                await updatedProduct.save();
            } else if (updatedProduct.product_stock < 5) {
                lowStockAlerts.push(updatedProduct.product_name);
            }
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

        // for (const item of items) {
        //     await Product.findByIdAndUpdate(item.product, {
        //         $inc: { product_stock: -item.quantity }
        //     });
        // }

        const populatedSale = await Sale.findById(savedSale._id)
            .populate('cashier', 'user_name')
            .populate('branch', 'branch_name')
            .populate('items.product', 'product_name');
        
        res.status(201).json({sale: populatedSale, lowStockAlerts: lowStockAlerts});
    } catch (error) {
        console.error("Error creating sale:", error);

        res.status(500).json({ message: "Satış oluşturulurken bir sunucu hatası oluştu." });
    }
}

export async function getAllSales(_, res) {
    try {
        const sales = await Sale.find({})
            .populate('cashier', 'user_name')
            .populate('branch', 'branch_name')
            .sort({ createdAt: -1 });

        res.status(200).json(sales);
    } catch (error) {
        console.error("Error fetching sales:", error);

        res.status(500).json({ message: "Satışlar getirilirken bir sunucu hatası oluştu." });
    }
}

export async function getSaleById(req, res) {
    try {
        const sale = await Sale.findById(req.params.id)
            .populate('cashier', 'user_name')
            .populate('branch', 'branch_name')
            .populate({
                path: 'items.product',
                model: 'Product'
            });

        if (!sale) {
            return res.status(404).json({ message: "Satış bulunamadı." });
        }

        res.status(200).json(sale);
    } catch (error) {
        console.error("Error fetching sale by ID:", error);

        res.status(500).json({ message: "Satış getirilirken bir sunucu hatası oluştu." });
    }
}