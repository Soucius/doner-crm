import { useState, useEffect } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";

const ProductEditPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProductData(response.data);
      } catch (error) {
        toast.error(error.message);

        navigate("/dashboard/products");
      }
    };
    fetchProduct();
  }, [productId, navigate]);

  const handleUpdateProduct = async (formData) => {
    setIsLoading(true);
    try {
      await api.put(`/products/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Ürün başarıyla güncellendi!");

      navigate("/dashboard/products");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!productData) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Ürünü Düzenle</h1>

      <ProductForm
        initialData={productData}
        onSubmit={handleUpdateProduct}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductEditPage;
