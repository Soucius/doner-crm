import { useState, useEffect } from "react";

const BranchFormModal = ({ isOpen, onClose, branchToEdit, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    branch_name: "",
    branch_address: "",
    branch_phone: "",
    branch_is_active: false,
  });

  useEffect(() => {
    if (branchToEdit) {
      setFormData({
        branch_name: branchToEdit.branch_name || "",
        branch_address: branchToEdit.branch_address || "",
        branch_phone: branchToEdit.branch_phone || "",
        branch_is_active: branchToEdit.branch_is_active || false,
      });
    } else {
      setFormData({
        branch_name: "",
        branch_address: "",
        branch_phone: "",
        branch_is_active: false,
      });
    }
  }, [branchToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
          {branchToEdit ? "Şubeyi Düzenle" : "Yeni Şube Ekle"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Şube Adı</label>

            <input
              type="text"
              name="branch_name"
              value={formData.branch_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Adres</label>

            <input
              type="text"
              name="branch_address"
              value={formData.branch_address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Telefon</label>

            <input
              type="tel"
              name="branch_phone"
              value={formData.branch_phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              name="branch_is_active"
              checked={formData.branch_is_active}
              onChange={handleChange}
              id="branch_is_active"
              className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />

            <label htmlFor="branch_is_active" className="text-gray-700">
              Şube Aktif mi?
            </label>
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

export default BranchFormModal;
