import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import CartItem from "../components/CartItem";
import CheckoutModal from "../components/CheckoutModal";
import Receipt from "../components/Receipt";

const POSPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastSale, setLastSale] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);

      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("/products?pos=true"),
          api.get("/categories"),
        ]);
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);

    if (categoryId === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.categories.some((c) => c._id === categoryId))
      );
    }
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product === product._id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            product: product._id,
            product_name: product.product_name,
            quantity: 1,
            priceAtSale: product.product_price,
          },
        ];
      }
    });
  };

  const handleDecreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product === productId);

      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.product !== productId);
      } else {
        return prevCart.map((item) =>
          item.product === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product !== productId)
    );
  };

  useEffect(() => {
    const newSubtotal = cart.reduce(
      (acc, item) => acc + item.quantity * item.priceAtSale,
      0
    );

    setSubtotal(newSubtotal);
    setTotal(newSubtotal);
  }, [cart]);

  const handleCheckoutSubmit = async (checkoutData) => {
    const salePayload = {
      items: cart.map(({ product, quantity, priceAtSale }) => ({
        product,
        quantity,
        priceAtSale,
      })),
      subtotal,
      tip: checkoutData.tip,
      total: checkoutData.total,
      paymentMethod: checkoutData.paymentMethod,
    };

    const salePromise = api.post("/sales", salePayload);

    toast.promise(salePromise, {
      loading: "Satış kaydediliyor...",
      success: (res) => {
        setIsCheckoutOpen(false);
        setLastSale(res.data);

        return "Satış başarıyla tamamlandı!";
      },
      error: "Satış kaydedilirken bir hata oluştu.",
    });
  };

  const handleCloseReceipt = () => {
    setLastSale(null);
    setCart([]);
  };

  useEffect(() => {
    console.log("Sepet (cart) state'i güncellendi:", cart);
  }, [cart]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-theme(space.20))]">
      <div className="lg:col-span-2 flex flex-col">
        <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
          <h2 className="text-xl font-bold mb-2">Kategoriler</h2>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                selectedCategory === "all"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Tümü
            </button>

            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategoryFilter(cat._id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedCategory === cat._id
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {cat.category_name}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p>Ürünler Yükleniyor...</p>
        ) : (
          <div className="flex-grow bg-white rounded-lg shadow-sm p-4 overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
        <h2 className="text-2xl font-bold border-b pb-2">Sipariş</h2>

        <div className="flex-grow my-4 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 h-full flex items-center justify-center">
              Sepetiniz şu an boş.
            </p>
          ) : (
            <div>
              {cart.map((item) => (
                <CartItem
                  key={item.product}
                  item={item}
                  onIncrease={handleAddToCart}
                  onDecrease={handleDecreaseQuantity}
                  onRemove={handleRemoveFromCart}
                />
              ))}
            </div>
          )}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between font-semibold">
            <span>Ara Toplam</span>
            <span>{subtotal.toFixed(2)}TL</span>
          </div>

          <div className="flex justify-between font-bold text-xl">
            <span>TOPLAM</span>
            <span>{total.toFixed(2)}TL</span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            disabled={cart.length === 0}
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg mt-2 hover:bg-green-700"
          >
            Ödeme Yap
          </button>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        subtotal={subtotal}
        onCheckout={handleCheckoutSubmit}
      />

      {lastSale && <Receipt saleData={lastSale} onClose={handleCloseReceipt} />}
    </div>
  );
};
export default POSPage;
