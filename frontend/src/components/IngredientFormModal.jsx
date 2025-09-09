import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const IngredientFormModal = ({ isOpen, onClose, itemToEdit, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    ingredient_name: "",
    ingredient_unit: "",
  });
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (isOpen) {
      api
        .get("/units")
        .then((res) => setUnits(res.data))
        .catch(() => toast.error("Birimler yüklenemedi."));
    }
  }, [isOpen]);

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        ingredient_name: itemToEdit.ingredient_name || "",
        ingredient_unit: itemToEdit.ingredient_unit._id || "",
      });
    } else {
      setFormData({ ingredient_name: "", ingredient_unit: "" });
    }
  }, [itemToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onFormSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {itemToEdit ? "Malzemeyi Düzenle" : "Yeni Malzeme Ekle"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Malzeme Adı</label>

            <input
              type="text"
              name="ingredient_name"
              value={formData.ingredient_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Örn: Domates"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Varsayılan Birim</label>

            <select
              name="ingredient_unit"
              value={formData.ingredient_unit}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white"
              required
            >
              <option value="" disabled>
                Birim Seçin
              </option>

              {units.map((unit) => (
                <option key={unit._id} value={unit._id}>
                  {unit.name} ({unit.abbreviation})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              İptal
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IngredientFormModal;
