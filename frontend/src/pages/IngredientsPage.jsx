import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import IngredientFormModal from "../components/IngredientFormModal";

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredientToEdit, setIngredientToEdit] = useState(null);

  const fetchIngredients = async () => {
    setIsLoading(true);

    try {
      const response = await api.get("/ingredients");

      setIngredients(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleAdd = () => {
    setIngredientToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (ingredient) => {
    setIngredientToEdit(ingredient);
    setIsModalOpen(true);
  };

  const handleDelete = (ingredientId) => {
    toast((t) => (
      <div>
        <span>Bu malzemeyi silmek istediğinizden emin misiniz?</span>

        <div className="flex gap-4 mt-2 justify-center">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={() => {
              api
                .delete(`/ingredients/${ingredientId}`)
                .then(() => {
                  toast.success("Malzeme başarıyla silindi.");
                  fetchIngredients();
                })
                .catch(() => toast.error("Malzeme silinirken hata oluştu."))
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
    const promise = ingredientToEdit
      ? api.put(`/ingredients/${ingredientToEdit._id}`, formData)
      : api.post("/ingredients", formData);

    await toast.promise(promise, {
      loading: "Kaydediliyor...",
      success: `Malzeme başarıyla ${
        ingredientToEdit ? "güncellendi" : "eklendi"
      }.`,
      error: (err) =>
        err.response?.data?.message ||
        `Hata: Malzeme ${ingredientToEdit ? "güncellenemedi" : "eklenemedi"}.`,
    });

    setIsModalOpen(false);
    fetchIngredients();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Malzeme Yönetimi</h1>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Plus size={20} />
          Yeni Malzeme Ekle
        </button>
      </div>

      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Malzeme Adı</th>
                <th className="p-3 text-left">Varsayılan Birim</th>
                <th className="p-3 text-center">Eylemler</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {ingredients.map((ingredient) => (
                <tr key={ingredient._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 align-middle font-medium">
                    {ingredient.ingredient_name}
                  </td>

                  <td className="p-3 align-middle">
                    {ingredient.ingredient_unit?.name || "N/A"}
                  </td>

                  <td className="p-3 align-middle">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        onClick={() => handleEdit(ingredient)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={20} />
                      </button>

                      <button
                        onClick={() => handleDelete(ingredient._id)}
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

      <IngredientFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemToEdit={ingredientToEdit}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default IngredientsPage;
