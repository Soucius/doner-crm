import { Edit, ImageIcon, Trash2 } from "lucide-react";
import { Link } from "react-router";

const ProductTable = ({
  products,
  onDelete,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
}) => (
  <div className="bg-white shadow-md rounded-lg overflow-x-auto">
    <table className="w-full table-auto">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 w-4">
            <input
              type="checkbox"
              checked={
                selectedProducts.length === products.length &&
                products.length > 0
              }
              onChange={onSelectAll}
            />
          </th>
          <th className="p-3 text-left w-20">Resim</th>
          <th className="p-3 text-left">Ürün Adı</th>
          <th className="p-3 text-left">Kategoriler</th>
          <th className="p-3 text-left">Fiyat</th>
          <th className="p-3 text-left">Stok</th>
          <th className="p-3 text-left">Durum</th>
          <th className="p-3 text-center">Eylemler</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {products.map((product) => (
          <tr
            key={product._id}
            className={`border-b hover:bg-gray-50 ${
              selectedProducts.includes(product._id) ? "bg-blue-50" : ""
            }`}
          >
            <td className="p-3">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product._id)}
                onChange={() => onSelectProduct(product._id)}
              />
            </td>
            <td className="p-2 md:p-3 align-middle">
              <Link to={`/dashboard/products/edit/${product._id}`}>
                {product.product_image ? (
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="h-12 w-16 object-cover rounded-md"
                  />
                ) : (
                  <div className="h-12 w-16 bg-gray-200 flex items-center justify-center rounded-md">
                    <ImageIcon className="text-gray-400" />
                  </div>
                )}
              </Link>
            </td>

            <td className="p-2 md:p-3 align-middle font-medium">
              <Link to={`/dashboard/products/edit/${product._id}`}>
                {product.product_name}
              </Link>
            </td>

            <td className="p-2 md:p-3 align-middle">
              {product.categories.map((cat) => cat.category_name).join(", ")}
            </td>

            <td className="p-2 md:p-3 align-middle">
              {product.product_price}TL
            </td>

            <td className="p-2 md:p-3 align-middle">{product.product_stock}</td>

            <td className="p-2 md:p-3 align-middle">
              {product.product_is_active ? (
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
                <Link
                  to={`/dashboard/products/edit/${product._id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={20} />
                </Link>

                <button
                  onClick={() => onDelete(product._id)}
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

export default ProductTable;
