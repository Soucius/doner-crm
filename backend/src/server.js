import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import branchRoutes from "./routes/branch.routes.js";
import roleRoutes from "./routes/role.routes.js";
import permissionRoutes from "./routes/permission.routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on: http://localhost:${PORT}`);
    });
});