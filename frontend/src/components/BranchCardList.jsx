import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";

const BranchCardList = ({ branches, onEdit, onDelete }) => (
  <div className="space-y-4">
    {branches.map((branch) => (
      <div key={branch._id} className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">
              <Link
                to={`/dashboard/branches/${branch._id}`}
                className="hover:underline"
              >
                {branch.branch_name}
              </Link>
            </h3>

            <p className="text-sm text-gray-500">{branch.branch_address}</p>

            <p className="text-sm text-gray-600 mt-1">{branch.branch_phone}</p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => onEdit(branch)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit size={22} />
            </button>

            <button
              onClick={() => onDelete(branch._id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={22} />
            </button>
          </div>
        </div>

        <div className="mt-4">
          {branch.branch_is_active ? (
            <span className="px-2 py-0.5 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
              Aktif
            </span>
          ) : (
            <span className="px-2 py-0.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
              Pasif
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default BranchCardList;
