import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import BranchFormModal from "../components/BranchFormModal";
import BranchTable from "../components/BranchTable";
import BranchCardList from "../components/BranchCardList";

const BranchesPage = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [branchToEdit, setBranchToEdit] = useState(null);

  const fetchBranches = async () => {
    setIsLoading(true);

    try {
      const response = await api.get("/branches");

      setBranches(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleAdd = () => {
    setBranchToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (branch) => {
    setBranchToEdit(branch);
    setIsModalOpen(true);
  };

  const handleDelete = (branchId) => {
    toast((t) => (
      <div>
        <span>Bu şubeyi silmek istediğinizden emin misiniz?</span>

        <div className="flex gap-4 mt-2 justify-center">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={() => {
              api
                .delete(`/branches/${branchId}`)
                .then(() => {
                  toast.success("Şube başarıyla silindi.");
                  fetchBranches();
                })
                .catch(() => toast.error("Şube silinirken hata oluştu."))
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
    const promise = branchToEdit
      ? api.put(`/branches/${branchToEdit._id}`, formData)
      : api.post("/branches", formData);

    await toast.promise(promise, {
      loading: "Kaydediliyor...",
      success: `Şube başarıyla ${branchToEdit ? "güncellendi" : "eklendi"}.`,
      error: `Hata: Şube ${branchToEdit ? "güncellenemedi" : "eklenemedi"}.`,
    });

    setIsModalOpen(false);
    fetchBranches();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Şube Yönetimi</h1>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Plus size={20} />
          Yeni Şube Ekle
        </button>
      </div>

      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : isDesktop ? (
        <BranchTable
          branches={branches}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <BranchCardList
          branches={branches}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <BranchFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        branchToEdit={branchToEdit}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default BranchesPage;
