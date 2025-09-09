import { Edit, Trash2, Building, Mail, Phone, User } from "lucide-react";

const UserCardList = ({ users, onEdit, onDelete }) => (
  <div className="space-y-4">
    {users.map((user) => (
      <div
        key={user._id}
        className="bg-white shadow-md rounded-lg p-4 space-y-3"
      >
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <h3 className="font-bold text-lg">{user.user_name}</h3>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Mail size={14} />

              <span>{user.user_email}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Phone size={14} />

              <span>{user.user_phone}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-shrink-0 ml-4">
            <button
              onClick={() => onEdit(user)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit size={22} />
            </button>

            <button
              onClick={() => onDelete(user._id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={22} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
            <User size={12} />

            {user.role_id?.role_name || "N/A"}
          </span>

          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
            <Building size={12} />

            {user.branch_id?.branch_name || "N/A"}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default UserCardList;
