import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    ingredient_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    
    ingredient_unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true,
    }
}, { timestamps: true });

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

export default Ingredient;