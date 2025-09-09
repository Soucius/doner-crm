import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import UserFormModal from "../components/UserFormModal";
import { useMediaQuery } from "../hooks/useMediaQuery";
import UserTable from "../components/UserTable";
import UserCardList from "../components/UserCardList";

const UsersPage = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [roles, setRoles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);

    try {
      const params = {
        search: searchTerm,
        role: selectedRole,
        branch: selectedBranch,
      };

      const response = await api.get("/users", { params });

      setUsers(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedRole, selectedBranch]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [rolesRes, branchesRes, usersRes] = await Promise.all([
          api.get("/roles"),
          api.get("/branches"),
          api.get("/users"),
        ]);

        setRoles(rolesRes.data);
        setBranches(branchesRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!isLoading) fetchUsers();
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, selectedRole, selectedBranch, fetchUsers]);

  const handleAdd = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleDelete = (userId) => {
    toast((t) => (
      <div>
        <span>Bu kullanıcıyı silmek istediğinizden emin misiniz?</span>

        <div className="flex gap-4 mt-2 justify-center">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={() => {
              api
                .delete(`/users/${userId}`)
                .then(() => {
                  toast.success("Kullanıcı başarıyla silindi.");

                  fetchUsers();
                })
                .catch(() => toast.error("Kullanıcı silinirken hata oluştu."))
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
    if (userToEdit && !formData.user_password) {
      delete formData.user_password;
    }

    const promise = userToEdit
      ? api.put(`/users/${userToEdit._id}`, formData)
      : api.post("/users", formData);

    await toast.promise(promise, {
      loading: "Kaydediliyor...",
      success: `Kullanıcı başarıyla ${userToEdit ? "güncellendi" : "eklendi"}.`,
      error: `Hata: Kullanıcı ${userToEdit ? "güncellenemedi" : "eklenemedi"}.`,
    });

    setIsModalOpen(false);
    fetchUsers();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          <Plus size={20} /> Yeni Kullanıcı Ekle
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="İsim veya e-postada ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded h-10"
        />

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full p-2 border rounded bg-white h-10"
        >
          <option value="">Tüm Roller</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.role_name}
            </option>
          ))}
        </select>

        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="w-full p-2 border rounded bg-white h-10"
        >
          <option value="">Tüm Şubeler</option>
          {branches.map((branch) => (
            <option key={branch._id} value={branch._id}>
              {branch.branch_name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : users.length > 0 ? (
        isDesktop ? (
          <UserTable
            users={users}
            onEdit={(user) => {
              setUserToEdit(user);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        ) : (
          <UserCardList
            users={users}
            onEdit={(user) => {
              setUserToEdit(user);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        )
      ) : (
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          Kullanıcı bulunamadı.
        </div>
      )}

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userToEdit={userToEdit}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default UsersPage;
