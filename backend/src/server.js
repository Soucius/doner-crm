import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import branchRoutes from "./routes/branch.routes.js";
import roleRoutes from "./routes/role.routes.js";
import permissionRoutes from "./routes/permission.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import ingredientRoutes from "./routes/ingredient.routes.js";
import unitRoutes from "./routes/unit.routes.js";
import saleRoutes from './routes/sale.routes.js';
import { connectDB } from "./config/db.js";

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use("/api/users", userRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/units", unitRoutes);
app.use('/api/sales', saleRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on: http://localhost:${PORT}`);
    });
});