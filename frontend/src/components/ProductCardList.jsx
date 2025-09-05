import { Edit, ImageIcon, Trash2 } from "lucide-react";
import { Link } from "react-router";

const ProductCardList = ({
  products,
  onDelete,
  selectedProducts,
  onSelectProduct,
}) => (
  <div className="space-y-4">
    {products.map((product) => (
      <div
        key={product._id}
        className={`bg-white shadow-md rounded-lg p-4 flex items-center gap-4 transition-all ${
          selectedProducts.includes(product._id) ? "ring-2 ring-blue-500" : ""
        }`}
      >
        <div className="flex-shrink-0">
          <input
            type="checkbox"
            className="h-5 w-5 rounded"
            checked={selectedProducts.includes(product._id)}
            onChange={() => onSelectProduct(product._id)}
          />
        </div>

        <div className="flex-shrink-0">
          <Link to={`/dashboard/products/edit/${product._id}`}>
            {product.product_image ? (
              <img
                src={product.product_image}
                alt={product.product_name}
                className="h-20 w-24 object-cover rounded-md"
              />
            ) : (
              <div className="h-20 w-24 bg-gray-200 flex items-center justify-center rounded-md">
                <ImageIcon className="text-gray-400" />
              </div>
            )}
          </Link>
        </div>

        <div className="flex-grow space-y-1">
          <Link
            to={`/dashboard/products/edit/${product._id}`}
            className="hover:underline"
          >
            <h3 className="font-bold text-lg">{product.product_name}</h3>
          </Link>

          <p className="text-sm text-gray-500">
            {product.categories.map((cat) => cat.category_name).join(", ")}
          </p>

          <div className="flex items-center gap-4 text-sm">
            <span className="font-semibold">{product.product_price} TL</span>

            <span className="text-gray-600">Stok: {product.product_stock}</span>
          </div>

          <div>
            {product.product_is_active ? (
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

        <div className="flex flex-col gap-2">
          <Link
            to={`/dashboard/products/edit/${product._id}`}
            className="text-blue-600 hover:text-blue-800 p-1"
          >
            <Edit size={22} />
          </Link>

          <button
            onClick={() => onDelete(product._id)}
            className="text-red-600 hover:text-red-800 p-1"
          >
            <Trash2 size={22} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default ProductCardList;
