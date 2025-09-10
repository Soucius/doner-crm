import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const SaleDetailPage = () => {
  const { id } = useParams();
  const [sale, setSale] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSale = async () => {
      setIsLoading(true);

      try {
        const response = await api.get(`/sales/${id}`);
        setSale(response.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSale();
  }, [id]);

  if (isLoading) return <p>Yükleniyor...</p>;
  if (!sale) return <p>Satış bulunamadı.</p>;

  return (
    <div>
      <Link
        to="/dashboard/sales"
        className="flex items-center gap-2 text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft size={18} /> Geri Dön
      </Link>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Satış Detayı</h1>

          <p className="text-sm text-gray-500">Fiş No: {sale._id}</p>
        </div>

        <div className="border-t border-b py-2 text-sm">
          <p>
            <strong>Tarih:</strong>{" "}
            {new Date(sale.createdAt).toLocaleString("tr-TR")}
          </p>

          <p>
            <strong>Kasiyer:</strong> {sale.cashier?.user_name || "N/A"}
          </p>

          <p>
            <strong>Şube:</strong> {sale.branch?.branch_name || "N/A"}
          </p>
        </div>

        <div className="border-b py-2 space-y-2 mt-4">
          <h2 className="font-bold">Satılan Ürünler</h2>

          {sale.items.map((item) => (
            <div key={item._id} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.product?.product_name || "Silinmiş Ürün"}
              </span>

              <span>{(item.quantity * item.priceAtSale).toFixed(2)} TL</span>
            </div>
          ))}
        </div>

        <div className="py-2 space-y-1 mt-4">
          <div className="flex justify-between">
            <span>Ara Toplam:</span>

            <span>{sale.subtotal.toFixed(2)}TL</span>
          </div>

          <div className="flex justify-between">
            <span>Bahşiş:</span>

            <span>{sale.tip.toFixed(2)}TL</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>TOPLAM:</span>

            <span>{sale.total.toFixed(2)}TL</span>
          </div>

          <div className="flex justify-between">
            <span>Ödeme Yöntemi:</span>

            <span>{sale.paymentMethod}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SaleDetailPage;
