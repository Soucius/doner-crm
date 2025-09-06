import { useState, useEffect } from "react";

const CategoryFormModal = ({
  isOpen,
  onClose,
  categoryToEdit,
  onFormSubmit,
}) => {
  const [formData, setFormData] = useState({
    category_name: "",
    category_description: "",
  });

  useEffect(() => {
    if (categoryToEdit) {
      setFormData({
        category_name: categoryToEdit.category_name,
        category_description: categoryToEdit.category_description,
      });
    } else {
      setFormData({ category_name: "", category_description: "" });
    }
  }, [categoryToEdit, isOpen]);

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
          {categoryToEdit ? "Kategoriyi Düzenle" : "Yeni Kategori Ekle"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Kategori Adı</label>

            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Açıklama</label>

            <textarea
              name="category_description"
              value={formData.category_description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
              required
            ></textarea>
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

export default CategoryFormModal;
