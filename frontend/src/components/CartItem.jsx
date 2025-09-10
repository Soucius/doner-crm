import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b">
      <div className="flex-grow">
        <p className="font-semibold text-sm">{item.product_name}</p>

        <p className="text-xs text-gray-600">{item.priceAtSale.toFixed(2)}TL</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onDecrease(item.product)}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <Minus size={16} />
        </button>

        <span className="w-8 text-center font-bold">{item.quantity}</span>

        <button
          onClick={() => onIncrease(item.product)}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="w-20 text-right font-bold">
        {(item.quantity * item.priceAtSale).toFixed(2)}TL
      </div>

      <button
        onClick={() => onRemove(item.product)}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default CartItem;
