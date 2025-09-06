import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowBigLeft, Plus, Trash2 } from "lucide-react";
import AddUserToBranchModal from "../components/AddUserToBranchModal";

const BranchDetailPage = () => {
  const { branchId } = useParams();
  const [branch, setBranch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBranchDetails = async () => {
    setIsLoading(true);

    try {
      const response = await api.get(`/branches/${branchId}`);

      setBranch(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranchDetails();
  }, [branchId]);

  const handleRemoveUser = async (userId) => {
    toast.promise(api.put(`/users/${userId}/branch`, { branchId: null }), {
      loading: "Kullanıcı şubeden kaldırılıyor...",
      success: () => {
        fetchBranchDetails();

        return "Kullanıcı başarıyla kaldırıldı.";
      },
      error: "İşlem sırasında bir hata oluştu.",
    });
  };

  if (isLoading) return <p>Yükleniyor...</p>;
  if (!branch) return <p>Şube bulunamadı.</p>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{branch.branch_name}</h1>

        <p className="text-gray-600">
          {branch.branch_address} | {branch.branch_phone}
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center text-2xl font-semibold">
          <Link
            to="/dashboard/branches"
            className="mr-2 text-red-600 hover:text-red-800"
          >
            <ArrowBigLeft />
          </Link>
          Şube Kullanıcıları
        </h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          <Plus size={20} />
          Kullanıcı Ekle
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        {branch.users && branch.users.length > 0 ? (
          <ul>
            {branch.users.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center p-3 border-b last:border-b-0"
              >
                <span>
                  {user.user_name} ({user.user_email})
                </span>

                <button
                  onClick={() => handleRemoveUser(user._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>Bu şubede henüz bir kullanıcı yok.</p>
          </div>
        )}
      </div>

      <AddUserToBranchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        branchId={branchId}
        onUserAdded={fetchBranchDetails}
      />
    </div>
  );
};

export default BranchDetailPage;
