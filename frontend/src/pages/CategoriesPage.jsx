import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import CategoryFormModal from "../components/CategoryFormModal";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);

    try {
      const response = await api.get("/categories");

      setCategories(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  const handleDelete = (categoryId) => {
    toast((t) => (
      <div>
        <span>Bu kategoriyi silmek istediğinizden emin misiniz?</span>

        <div className="flex gap-4 mt-2 justify-center">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={() => {
              api
                .delete(`/categories/${categoryId}`)
                .then(() => {
                  toast.success("Kategori başarıyla silindi.");
                  fetchCategories();
                })
                .catch(() => toast.error("Kategori silinirken hata oluştu."))
                .finally(() => toast.dismiss(t.id));
            }}
          >
            Evet
          </button>

          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Hayır
          </button>
        </div>
      </div>
    ));
  };

  const handleFormSubmit = async (formData) => {
    const promise = categoryToEdit
      ? api.put(`/categories/${categoryToEdit._id}`, formData)
      : api.post("/categories", formData);

    await toast.promise(promise, {
      loading: "Kaydediliyor...",
      success: `Kategori başarıyla ${
        categoryToEdit ? "güncellendi" : "eklendi"
      }.`,
      error: `Hata: Kategori ${
        categoryToEdit ? "güncellenemedi" : "eklenemedi"
      }.`,
    });

    setIsModalOpen(false);
    fetchCategories();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kategori Yönetimi</h1>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Plus size={20} />
          Yeni Kategori Ekle
        </button>
      </div>

      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Kategori Adı</th>
                <th className="p-3 text-left">Açıklama</th>
                <th className="p-3 text-center">Eylemler</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {categories.map((cat) => (
                <tr key={cat._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 align-middle font-medium">
                    {cat.category_name}
                  </td>

                  <td className="p-3 align-middle">
                    {cat.category_description}
                  </td>

                  <td className="p-3 align-middle">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={20} />
                      </button>

                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoryToEdit={categoryToEdit}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default CategoriesPage;
