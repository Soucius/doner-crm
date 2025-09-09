import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const UserFormModal = ({ isOpen, onClose, userToEdit, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_password: "",
    role_id: "",
    branch_id: "",
  });

  const [roles, setRoles] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    if (isOpen) {
      Promise.all([api.get("/roles"), api.get("/branches")])
        .then(([rolesRes, branchesRes]) => {
          setRoles(rolesRes.data);
          setBranches(branchesRes.data);
        })
        .catch(() => toast.error("Form verileri yüklenemedi."));
    }
  }, [isOpen]);

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        user_name: userToEdit.user_name || "",
        user_email: userToEdit.user_email || "",
        user_phone: userToEdit.user_phone || "",
        user_password: "",
        role_id: userToEdit.role_id?._id || "",
        branch_id: userToEdit.branch_id?._id || "",
      });
    } else {
      setFormData({
        user_name: "",
        user_email: "",
        user_phone: "",
        user_password: "",
        role_id: "",
        branch_id: "",
      });
    }
  }, [userToEdit, isOpen]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          {userToEdit ? "Kullanıcıyı Düzenle" : "Yeni Kullanıcı Ekle"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            placeholder="Ad Soyad"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            placeholder="E-posta"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="tel"
            name="user_phone"
            value={formData.user_phone}
            onChange={handleChange}
            placeholder="Telefon"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            name="user_password"
            value={formData.user_password}
            onChange={handleChange}
            placeholder={
              userToEdit
                ? "Yeni Şifre (Değiştirmek istemiyorsanız boş bırakın)"
                : "Şifre"
            }
            className="w-full p-2 border rounded"
            required={!userToEdit}
          />

          <select
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white"
            required
          >
            <option value="" disabled>
              Bir Rol Seçin
            </option>
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.role_name}
              </option>
            ))}
          </select>

          <select
            name="branch_id"
            value={formData.branch_id}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white"
            required
          >
            <option value="" disabled>
              Bir Şube Seçin
            </option>
            {branches.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.branch_name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose}>
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
export default UserFormModal;
