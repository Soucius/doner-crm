import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useMediaQuery } from "../hooks/useMediaQuery.js";
import ProductFilters from "../components/ProductFilters.jsx";
import ProductTable from "../components/ProductTable.jsx";
import ProductCardList from "../components/ProductCardList.jsx";

const ProductsPage = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchProductsAndCategories = useCallback(
    async (isInitialLoad = false) => {
      setIsLoading(true);

      try {
        const productParams = {
          search: searchTerm,
          category: selectedCategory,
        };

        if (isInitialLoad) {
          const [productsRes, categoriesRes] = await Promise.all([
            api.get("products", { params: productParams }),
            api.get("/categories"),
          ]);

          setProducts(productsRes.data);
          setCategories(categoriesRes.data);
        } else {
          const productsRes = await api.get("products", {
            params: productParams,
          });

          setProducts(productsRes.data);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [searchTerm, selectedCategory]
  );

  useEffect(() => {
    fetchProductsAndCategories(true);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProductsAndCategories(false);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory]);

  const handleDeleteProduct = (productId) => {
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-2">
          <span>Bu ürünü silmek istediğinizden emin misiniz?</span>

          <div className="flex gap-4">
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => {
                api
                  .delete(`/products/${productId}`)
                  .then(() => {
                    toast.success("Ürün başarıyla silindi.");
                    fetchProductsAndCategories(false);
                  })
                  .catch(() => toast.error("Ürün silinirken hata oluştu."))
                  .finally(() => toast.dismiss(t.id));
              }}
            >
              Evet
            </button>
            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Hayır
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p) => p._id));
    }
  };

  const handleBulkDelete = () => {
    toast(
      (t) => (
        <div>
          <span>
            {selectedProducts.length} ürünü silmek istediğinizden emin misiniz?
          </span>

          <div className="flex gap-4 mt-2 justify-center">
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => {
                api
                  .post("/products/bulk-delete", { ids: selectedProducts })
                  .then(() => {
                    toast.success("Ürünler başarıyla silindi.");
                    fetchProductsAndCategories(false);
                    setSelectedProducts([]);
                  })
                  .catch(() => toast.error("Ürünler silinirken hata oluştu."))
                  .finally(() => toast.dismiss(t.id));
              }}
            >
              Evet
            </button>

            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Hayır
            </button>
          </div>
        </div>
      ),
      { duration: 4000 }
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Ürün Yönetimi</h1>

        <Link
          to="/dashboard/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition w-full md:w-auto"
        >
          <Plus size={20} />

          <span className="md:inline">Yeni Ürün Ekle</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 md:items-start">
        <ProductFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        {selectedProducts.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-red-800 text-white rounded-lg hover:bg-red-900 transition text-sm font-medium"
          >
            <Trash2 size={18} />({selectedProducts.length}) Öğeyi Sil
          </button>
        )}
      </div>

      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : products.length > 0 ? (
        isDesktop ? (
          <ProductTable
            products={products}
            onDelete={handleDeleteProduct}
            selectedProducts={selectedProducts}
            onSelectProduct={handleSelectProduct}
            onSelectAll={handleSelectAll}
          />
        ) : (
          <ProductCardList
            products={products}
            onDelete={handleDeleteProduct}
            selectedProducts={selectedProducts}
            onSelectProduct={handleSelectProduct}
          />
        )
      ) : (
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          Filtreye uygun ürün bulunamadı.
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
