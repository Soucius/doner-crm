import { ImageIcon } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <button
      onClick={() => onAddToCart(product)}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 p-2 flex flex-col items-center text-center focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <div className="w-full h-24 mb-2">
        {product.product_image ? (
          <img
            src={product.product_image}
            alt={product.product_name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
            <ImageIcon className="text-gray-400" />
          </div>
        )}
      </div>

      <h3 className="font-semibold text-sm text-gray-800 leading-tight">
        {product.product_name}
      </h3>
    </button>
  );
};

export default ProductCard;
