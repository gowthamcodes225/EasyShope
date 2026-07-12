import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { categories } from "../../data/categories";

const brandsList = ["Nike", "Adidas", "Puma", "Apple", "Samsung", "Sony", "Boat", "OnePlus", "Levis", "Zara"];

const FilterSidebar = ({
  filters,
  setFilters,
  isMobileOpen,
  onMobileClose,
}) => {
  const toggleCategory = (slug) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === slug ? "" : slug,
    }));
  };

  const toggleBrand = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const content = (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-textdark mb-3">Category</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 text-sm cursor-pointer group">
              <input
                type="radio"
                checked={filters.category === cat.slug}
                onChange={() => toggleCategory(cat.slug)}
                className="accent-primary"
              />
              <span className="group-hover:text-primary transition-colors">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-textdark mb-3">Brand</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {brandsList.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="accent-primary"
              />
              <span className="group-hover:text-primary transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-textdark mb-3">Max Price: ₹{filters.maxPrice}</h3>
        <input
          type="range"
          min="200"
          max="25000"
          step="100"
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-primary"
        />
      </div>

      <div>
        <h3 className="font-semibold text-textdark mb-3">Minimum Rating</h3>
        <div className="flex gap-2">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() =>
                setFilters((prev) => ({ ...prev, minRating: prev.minRating === r ? 0 : r }))
              }
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                filters.minRating === r
                  ? "bg-primary text-white border-primary"
                  : "border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {r}★ & up
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() =>
          setFilters({ category: "", brands: [], maxPrice: 25000, minRating: 0 })
        }
        className="w-full text-sm font-medium text-primary border border-primary rounded-full py-2 hover:bg-primary hover:text-white transition-all"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-fit sticky top-24">
        {content}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-5 max-h-[85vh] overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={onMobileClose} className="text-xl active:scale-90 transition-transform">
                  <FiX />
                </button>
              </div>
              {content}
              <button
                onClick={onMobileClose}
                className="w-full mt-4 bg-gradient-to-r from-primary to-secondary text-white font-medium py-3 rounded-full"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;