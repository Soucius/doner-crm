import { useState } from "react";
import { X } from "lucide-react";

const CheckoutModal = ({ isOpen, onClose, subtotal, onCheckout }) => {
  const [tip, setTip] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Nakit");
  const finalTotal = subtotal + Number(tip);

  const handleCheckout = () => {
    onCheckout({
      tip: Number(tip),
      total: finalTotal,
      paymentMethod,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Ödeme</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-lg">
            <span>Ara Toplam:</span>
            <span className="font-semibold">{subtotal.toFixed(2)}TL</span>
          </div>

          <div>
            <label className="block text-gray-700">Bahşiş (Opsiyonel)</label>

            <input
              type="number"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Ödeme Yöntemi</label>

            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMethod("Nakit")}
                className={`flex-1 p-3 rounded ${
                  paymentMethod === "Nakit"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Nakit
              </button>

              <button
                onClick={() => setPaymentMethod("Kart")}
                className={`flex-1 p-3 rounded ${
                  paymentMethod === "Kart"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Kart
              </button>
            </div>
          </div>

          <div className="border-t pt-4 mt-4 flex justify-between text-2xl font-bold">
            <span>GENEL TOPLAM:</span>

            <span className="text-green-600">{finalTotal.toFixed(2)}TL</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg mt-2 text-lg"
          >
            Satışı Tamamla
          </button>
        </div>
      </div>
    </div>
  );
};
export default CheckoutModal;
