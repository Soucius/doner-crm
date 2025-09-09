import Ingredient from '../models/Ingredient.js';

export async function getAllIngredients(_, res) {
    try {
        const ingredients = await Ingredient.find({}).sort({ createdAt: -1 }).populate("ingredient_unit");

        res.status(200).json(ingredients);
    } catch (error) {
        console.error("Error fetching ingredients:", error);

        res.status(500).json({ message: "Sunucu Hatası" });
    }
}

export async function createIngredient(req, res) {
    try {
        const { ingredient_name, ingredient_unit } = req.body;

        if (!ingredient_name || !ingredient_unit) {
            return res.status(400).json({ message: "Lütfen tüm alanları doldurun." });
        }

        const ingredientExists = await Ingredient.findOne({ ingredient_name });

        if (ingredientExists) {
            return res.status(400).json({ message: "Bu malzeme zaten mevcut." });
        }

        const newIngredient = new Ingredient({
            ingredient_name,
            ingredient_unit,
        });

        const savedIngredient = await newIngredient.save();

        res.status(201).json(savedIngredient);
    } catch (error) {
        console.error("Error creating ingredient:", error);

        res.status(500).json({ message: "Sunucu Hatası" });
    }
}

export async function updateIngredient(req, res) {
    try {
        const { id } = req.params;

        const updatedIngredient = await Ingredient.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedIngredient) {
            return res.status(404).json({ message: "Malzeme bulunamadı." });
        }

        res.status(200).json(updatedIngredient);
    } catch (error) {
        console.error("Error updating ingredient:", error);

        res.status(500).json({ message: "Sunucu Hatası" });
    }
}

export async function deleteIngredient(req, res) {
    try {
        const { id } = req.params;
        const deletedIngredient = await Ingredient.findByIdAndDelete(id);

        if (!deletedIngredient) {
            return res.status(404).json({ message: "Malzeme bulunamadı." });
        }

        res.status(200).json({ message: "Malzeme başarıyla silindi." });
    } catch (error) {
        console.error("Error deleting ingredient:", error);

        res.status(500).json({ message: "Sunucu Hatası" });
    }
}

export async function getIngredientById(req, res) {
    try {
        const { id } = req.params;
        const ingredient = await Ingredient.findById(id);

        if (!ingredient) {
            return res.status(404).json({ message: "Malzeme bulunamadı." });
        }

        res.status(200).json(ingredient);
    } catch (error) {
        console.error("Error fetching ingredient by ID:", error);

        res.status(500).json({ message: "Sunucu Hatası" });
    }
}