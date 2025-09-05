import { useState, useEffect } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { Link } from "react-router";

const initialFormState = {
  product_name: "",
  product_description: "",
  product_price: 0,
  product_stock: 0,
  product_image: null,
  product_is_active: false,
  categories: [],
};

const ProductForm = ({ initialData = null, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [allCategories, setAllCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setAllCategories(res.data))
      .catch((err) => toast.error(err.message));
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        categories: initialData.categories.map((category) => category._id),
        product_image: null,
      });

      setImagePreview(initialData.product_image || "");
    } else {
      setFormData(initialFormState);
      setImagePreview("");
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];

      if (file) {
        setFormData((prev) => ({ ...prev, [name]: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleCategoryCheckboxChange = (categoryId) => {
    setFormData((prev) => {
      const currentCategories = prev.categories;

      if (currentCategories.includes(categoryId)) {
        return {
          ...prev,
          categories: currentCategories.filter((id) => id !== categoryId),
        };
      } else {
        return { ...prev, categories: [...currentCategories, categoryId] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("product_name", formData.product_name);
    data.append("product_description", formData.product_description);
    data.append("product_price", formData.product_price);
    data.append("product_stock", formData.product_stock);
    data.append("product_is_active", formData.product_is_active);

    formData.categories.forEach((catId) => {
      data.append("categories", catId);
    });

    if (formData.product_image) {
      data.append("product_image", formData.product_image);
    }

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <div>
        <label className="block text-gray-700 font-medium">Ürün Adı</label>

        <input
          type="text"
          name="product_name"
          placeholder="Ürün Adı Giriniz..."
          value={formData.product_name}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Açıklama</label>

        <textarea
          name="product_description"
          placeholder="Ürün Açıklaması Giriniz..."
          value={formData.product_description}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          rows="3"
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium">Fiyat (TL)</label>

          <input
            type="number"
            name="product_price"
            value={formData.product_price}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Stok Adedi</label>

          <input
            type="number"
            name="product_stock"
            value={formData.product_stock}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Ürün Resmi</label>

        <input
          type="file"
          name="product_image"
          onChange={handleChange}
          accept="image/*"
          className="w-full p-2 border rounded mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
        />

        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">Önizleme:</p>

            <img
              src={imagePreview}
              alt="Ürün Önizlemesi"
              className="h-24 w-auto mt-2 rounded-md shadow-sm"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="product_is_active"
          checked={formData.product_is_active}
          onChange={handleChange}
          id="product_is_active"
          className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
        />

        <label
          htmlFor="product_is_active"
          className="text-gray-700 font-medium"
        >
          Ürün Aktif mi?
        </label>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Kategoriler
        </label>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-lg max-h-48 overflow-y-auto">
          {allCategories.map((cat) => (
            <div key={cat._id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${cat._id}`}
                value={cat._id}
                checked={formData.categories.includes(cat._id)}
                onChange={() => handleCategoryCheckboxChange(cat._id)}
                className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />

              <label
                htmlFor={`category-${cat._id}`}
                className="ml-2 text-gray-700"
              >
                {cat.category_name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Link
          to="/dashboard/products"
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          İptal
        </Link>

        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
        >
          {isLoading ? "Kaydediliyor..." : initialData ? "Güncelle" : "Oluştur"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
