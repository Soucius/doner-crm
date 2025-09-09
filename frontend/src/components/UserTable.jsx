import { Edit, Trash2 } from "lucide-react";

const UserTable = ({ users, onEdit, onDelete }) => (
  <div className="bg-white shadow-md rounded-lg overflow-x-auto">
    <table className="w-full table-auto">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Ad Soyad</th>
          <th className="p-3 text-left">E-posta</th>
          <th className="p-3 text-left">Telefon</th>
          <th className="p-3 text-left">Rol</th>
          <th className="p-3 text-left">Şube</th>
          <th className="p-3 text-center">Eylemler</th>
        </tr>
      </thead>

      <tbody className="text-sm">
        {users.map((user) => (
          <tr key={user._id} className="border-b hover:bg-gray-50">
            <td className="p-3 align-middle font-medium">{user.user_name}</td>

            <td className="p-3 align-middle">{user.user_email}</td>

            <td className="p-3 align-middle">{user.user_phone}</td>

            <td className="p-3 align-middle">
              {user.role_id?.role_name || "N/A"}
            </td>

            <td className="p-3 align-middle">
              {user.branch_id?.branch_name || "N/A"}
            </td>

            <td className="p-3 align-middle">
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={20} />
                </button>

                <button
                  onClick={() => onDelete(user._id)}
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
);

export default UserTable;
