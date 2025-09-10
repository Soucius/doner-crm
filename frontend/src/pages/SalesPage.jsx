import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      setIsLoading(true);

      try {
        const response = await api.get("/sales");

        setSales(response.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (isLoading) return <p>Yükleniyor...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Satış Geçmişi</h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Tarih</th>
              <th className="p-3 text-left">Fiş No</th>
              <th className="p-3 text-left">Kasiyer</th>
              <th className="p-3 text-left">Şube</th>
              <th className="p-3 text-right">Toplam Tutar</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {sales.map((sale) => (
              <tr key={sale._id} className="border-b hover:bg-gray-50">
                <td className="p-3 align-middle">
                  {new Date(sale.createdAt).toLocaleString("tr-TR")}
                </td>

                <td className="p-3 align-middle font-mono text-xs">
                  <Link
                    to={`/dashboard/sales/${sale._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {sale._id}
                  </Link>
                </td>

                <td className="p-3 align-middle">
                  {sale.cashier?.user_name || "N/A"}
                </td>

                <td className="p-3 align-middle">
                  {sale.branch?.branch_name || "N/A"}
                </td>

                <td className="p-3 align-middle text-right font-semibold">
                  {sale.total.toFixed(2)}TL
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SalesPage;
