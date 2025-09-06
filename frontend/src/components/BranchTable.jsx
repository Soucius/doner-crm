import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";

const BranchTable = ({ branches, onEdit, onDelete }) => (
  <div className="bg-white shadow-md rounded-lg overflow-x-auto">
    <table className="w-full table-auto">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Şube Adı</th>
          <th className="p-3 text-left">Adres</th>
          <th className="p-3 text-left">Telefon</th>
          <th className="p-3 text-left">Durum</th>
          <th className="p-3 text-center">Eylemler</th>
        </tr>
      </thead>

      <tbody className="text-sm">
        {branches.map((branch) => (
          <tr key={branch._id} className="border-b hover:bg-gray-50">
            <td className="p-3 align-middle font-medium">
              <Link
                to={`/dashboard/branches/${branch._id}`}
                className="hover:underline"
              >
                {branch.branch_name}
              </Link>
            </td>

            <td className="p-3 align-middle">{branch.branch_address}</td>

            <td className="p-3 align-middle">{branch.branch_phone}</td>

            <td className="p-3 align-middle">
              {branch.branch_is_active ? (
                <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                  Aktif
                </span>
              ) : (
                <span className="px-2 py-1 text-xs font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">
                  Pasif
                </span>
              )}
            </td>

            <td className="p-3 align-middle">
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => onEdit(branch)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={20} />
                </button>

                <button
                  onClick={() => onDelete(branch._id)}
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

export default BranchTable;
