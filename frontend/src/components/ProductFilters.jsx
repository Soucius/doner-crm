const ProductFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Ürün adında ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-2 border rounded bg-white"
      >
        <option value="">Tüm Kategoriler</option>

        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.category_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilters;
