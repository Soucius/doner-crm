import { useState, useEffect } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

const initialFormState = {
  product_name: "",
  product_description: "",
  product_price: 0,
  product_stock: 0,
  product_image: null,
  product_is_active: false,
  categories: [],
  ingredients: [],
};

const ProductForm = ({ initialData = null, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [allCategories, setAllCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  const [allUnits, setAllUnits] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [categoriesRes, ingredientsRes, unitsRes] = await Promise.all([
          api.get("/categories"),
          api.get("/ingredients"),
          api.get("/units"),
        ]);

        setAllCategories(categoriesRes.data);
        setAllIngredients(ingredientsRes.data);
        setAllUnits(unitsRes.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        product_name: initialData.product_name || "",
        product_description: initialData.product_description || "",
        product_price: initialData.product_price || 0,
        product_stock: initialData.product_stock || 0,
        product_image: null,
        product_is_active: initialData.product_is_active || false,
        categories: initialData.categories.map(
          (category) => category._id || category
        ),
        ingredients: initialData.ingredients.map((ing) => ({
          ingredient: ing.ingredient?._id || "",
          amount: ing.amount || 0,
          unit: ing.unit?._id || "",
        })),
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

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = formData.ingredients.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing
    );

    setFormData((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { ingredient: "", amount: 0, unit: "" },
      ],
    }));
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    const validIngredients = formData.ingredients.filter(
      (ing) => ing.ingredient && ing.unit && Number(ing.amount) > 0
    );

    Object.keys(formData).forEach((key) => {
      if (key === "categories") {
        formData.categories.forEach((catId) =>
          data.append("categories", catId)
        );
      } else if (key === "ingredients") {
        if (validIngredients.length > 0) {
          data.append("ingredients", JSON.stringify(validIngredients));
        }
      } else if (key === "product_image" && formData.product_image) {
        data.append("product_image", formData.product_image);
      } else if (key !== "product_image") {
        data.append(key, formData[key]);
      }
    });

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
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

      <div className="pt-4 border-t">
        <label className="block text-gray-700 font-medium mb-2">
          Ürün İçerikleri
        </label>
        <div className="space-y-3">
          {formData.ingredients.map((ing, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr,auto,auto,auto] gap-2 items-center"
            >
              <select
                value={ing.ingredient}
                onChange={(e) =>
                  handleIngredientChange(index, "ingredient", e.target.value)
                }
                className="w-full p-2 border rounded bg-white"
              >
                <option value="" disabled>
                  Malzeme Seçin
                </option>

                {allIngredients.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.ingredient_name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Miktar"
                value={ing.amount}
                onChange={(e) =>
                  handleIngredientChange(index, "amount", e.target.value)
                }
                className="w-24 py-1.5 px-2 border rounded"
              />

              <select
                value={ing.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
                className="w-28 p-2 border rounded bg-white"
              >
                <option value="" disabled>
                  Birim
                </option>

                {allUnits.map((unit) => (
                  <option key={unit._id} value={unit._id}>
                    {unit.abbreviation}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addIngredient}
          className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> İçerik Ekle
        </button>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-gray-100 rounded"
        >
          İptal
        </button>

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
