import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const AddUserToBranchModal = ({ isOpen, onClose, branchId, onUserAdded }) => {
  const [unassignedUsers, setUnassignedUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      api
        .get("/users?unassigned=true")
        .then((res) => setUnassignedUsers(res.data))
        .catch(() => toast.error("Boştaki kullanıcılar yüklenemedi."));
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUserId) {
      toast.error("Lütfen bir kullanıcı seçin.");
      return;
    }

    setIsLoading(true);

    try {
      await api.put(`/users/${selectedUserId}/branch`, { branchId });

      toast.success("Kullanıcı şubeye eklendi.");

      onUserAdded();
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Şubeye Kullanıcı Ekle</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="" disabled>
              Bir kullanıcı seçin...
            </option>

            {unassignedUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.user_name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose}>
              İptal
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              {isLoading ? "Ekleniyor..." : "Ekle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserToBranchModal;
