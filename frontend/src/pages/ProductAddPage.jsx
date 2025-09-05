import { useState } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

const ProductAddPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddProduct = async (formData) => {
    setIsLoading(true);

    try {
      await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Ürün başarıyla oluşturuldu!");

      navigate("/dashboard/products");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Yeni Ürün Ekle</h1>

      <ProductForm onSubmit={handleAddProduct} isLoading={isLoading} />
    </div>
  );
};

export default ProductAddPage;
