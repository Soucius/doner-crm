import { useState, useEffect } from "react";

const UnitFormModal = ({ isOpen, onClose, unitToEdit, onFormSubmit }) => {
  const [formData, setFormData] = useState({ name: "", abbreviation: "" });

  useEffect(() => {
    if (unitToEdit) {
      setFormData({
        name: unitToEdit.name,
        abbreviation: unitToEdit.abbreviation,
      });
    } else {
      setFormData({ name: "", abbreviation: "" });
    }
  }, [unitToEdit, isOpen]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {unitToEdit ? "Birimi Düzenle" : "Yeni Birim Ekle"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Birim Adı (Örn: Gram)"
            className="w-full p-2 border rounded mb-4"
            required
          />

          <input
            type="text"
            name="abbreviation"
            value={formData.abbreviation}
            onChange={handleChange}
            placeholder="Kısaltma (Örn: gr)"
            className="w-full p-2 border rounded mb-4"
            required
          />

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              İptal
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UnitFormModal;
