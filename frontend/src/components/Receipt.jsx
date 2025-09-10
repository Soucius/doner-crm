import { useEffect, useRef } from "react";
import { X, Printer } from "lucide-react";

const Receipt = ({ saleData, onClose }) => {
  const receiptRef = useRef(null);

  useEffect(() => {
    window.print();
  }, []);

  if (!saleData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div
        className="bg-white p-6 rounded-lg w-full max-w-sm relative"
        ref={receiptRef}
      >
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">DönerCRM Fiş</h2>

          <p className="text-sm">
            {new Date(saleData.createdAt).toLocaleString("tr-TR")}
          </p>

          <p className="text-sm">
            Kasiyer: {saleData.cashier?.user_name || "N/A"}
          </p>

          <p className="text-sm">
            Şube: {saleData.branch?.branch_name || "N/A"}
          </p>
        </div>

        <div className="border-t border-b border-dashed py-2 space-y-1">
          {saleData.items.map((item) => (
            <div key={item._id} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.product?.product_name || "Ürün"}
              </span>

              <span>{(item.quantity * item.priceAtSale).toFixed(2)}TL</span>
            </div>
          ))}
        </div>

        <div className="py-2 space-y-1">
          <div className="flex justify-between font-semibold">
            <span>Ara Toplam:</span>

            <span>{saleData.subtotal.toFixed(2)}TL</span>
          </div>

          <div className="flex justify-between">
            <span>Bahşiş:</span>

            <span>{saleData.tip.toFixed(2)}TL</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>TOPLAM:</span>

            <span>{saleData.total.toFixed(2)}TL</span>
          </div>
        </div>

        <p className="text-center text-xs mt-4">Teşekkür Ederiz!</p>

        <div className="absolute top-2 right-2 print:hidden flex gap-2">
          <button
            onClick={() => window.print()}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <Printer size={20} />
          </button>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Receipt;
