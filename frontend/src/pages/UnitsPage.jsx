import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import UnitFormModal from "../components/UnitFormModal";

const UnitsPage = () => {
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unitToEdit, setUnitToEdit] = useState(null);

  const fetchUnits = async () => {
    setIsLoading(true);

    try {
      const response = await api.get("/units");

      setUnits(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleAdd = () => {
    setUnitToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (unit) => {
    setUnitToEdit(unit);
    setIsModalOpen(true);
  };

  const handleDelete = (unitId) => {
    toast((t) => (
      <div>
        <p className="text-center mb-2">
          Bu birimi silmek istediğinizden emin misiniz?
        </p>

        <div className="flex gap-4 mt-2 justify-center">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={() => {
              api
                .delete(`/units/${unitId}`)
                .then(() => {
                  toast.success("Birim başarıyla silindi.");
                  fetchUnits();
                })
                .catch(() => toast.error("Birim silinirken hata oluştu."))
                .finally(() => toast.dismiss(t.id));
            }}
          >
            Evet, Sil
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
    const promise = unitToEdit
      ? api.put(`/units/${unitToEdit._id}`, formData)
      : api.post("/units", formData);

    await toast.promise(promise, {
      loading: "Kaydediliyor...",
      success: `Birim başarıyla ${unitToEdit ? "güncellendi" : "eklendi"}.`,
      error: (err) =>
        err.response?.data?.message ||
        `Hata: Birim ${unitToEdit ? "güncellenemedi" : "eklenemedi"}.`,
    });

    setIsModalOpen(false);
    fetchUnits();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Birim Yönetimi</h1>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Plus size={20} /> Yeni Birim Ekle
        </button>
      </div>

      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Birim Adı</th>
                <th className="p-3 text-left">Kısaltma</th>
                <th className="p-3 text-center">Eylemler</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {units.map((unit) => (
                <tr key={unit._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 align-middle font-medium">{unit.name}</td>

                  <td className="p-3 align-middle">{unit.abbreviation}</td>

                  <td className="p-3 align-middle">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        onClick={() => handleEdit(unit)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={20} />
                      </button>

                      <button
                        onClick={() => handleDelete(unit._id)}
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

      <UnitFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        unitToEdit={unitToEdit}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default UnitsPage;
