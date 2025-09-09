import Unit from '../models/Unit.js';

export async function getAllUnits(_, res) {
    try {
        const units = await Unit.find({}).sort({ name: 1 });

        res.status(200).json(units);
    } catch (error) {
        console.error("Error fetching units:", error);

        res.status(500).json({ message: "Sunucu Hatası" });
    }
}

export async function getUnitById(req, res) {
    try {
        const { id } = req.params;

        const unit = await Unit.findById(id);

        if (!unit) {
            return res.status(404).json({ message: "Unit bulunamadı." });
        }

        res.status(200).json(unit);
    } catch (error) {
        console.error("Error fetching unit by ID:", error);

        res.status(500).json({ message: "Sunucu Hatası" });
    }
}

export async function createUnit(req, res) {
    try {
        const { name, abbreviation } = req.body;

        if (!name || !abbreviation) {
            return res.status(400).json({ message: "Lütfen tüm alanları doldurun." });
        }

        const newUnit = new Unit({ name, abbreviation });
        const savedUnit = await newUnit.save();

        res.status(201).json(savedUnit);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Bu birim zaten mevcut." });
        }

        res.status(500).json({ message: "Sunucu Hatası" });
    }
}

export async function updateUnit(req, res) {
    try {
        const { id } = req.params;
        const updatedUnit = await Unit.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedUnit) return res.status(404).json({ message: "Birim bulunamadı." });
        res.status(200).json(updatedUnit);
    } catch (error) {
        res.status(500).json({ message: "Sunucu Hatası" });
    }
}

export async function deleteUnit(req, res) {
    try {
        const { id } = req.params;
        const deletedUnit = await Unit.findByIdAndDelete(id);

        if (!deletedUnit) return res.status(404).json({ message: "Birim bulunamadı." });

        res.status(200).json({ message: "Birim başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ message: "Sunucu Hatası" });
    }
}