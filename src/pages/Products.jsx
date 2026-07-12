import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import Breadcrumb from "../components/common/Breadcrumb";
import FilterSidebar from "../components/product/FilterSidebar";
import ProductCard from "../components/product/ProductCard";
import Pagination from "../components/common/Pagination";
import { ProductGridSkeleton } from "../components/common/LoadingSkeleton";
import { products } from "../data/products";

const PAGE_SIZE = 8;

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  const [filters, setFilters] = useState({
    category: categoryQuery,
    brands: [],
    maxPrice: 25000,
    minRating: 0,
  });
  const [sortBy, setSortBy] = useState("popularity");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }
    result = result.filter((p) => p.price <= filters.maxPrice);
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "discount") result.sort((a, b) => b.discount - a.discount);

    return result;
  }, [filters, sortBy, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div>
      <Breadcrumb items={[{ label: "Products" }]} />

      <div className="max-w-7xl mx-auto px-4 pb-16 flex gap-6">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          isMobileOpen={mobileFilterOpen}
          onMobileClose={() => setMobileFilterOpen(false)}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-textdark">
                {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
              </h1>
              <p className="text-xs text-gray-400">{filteredProducts.length} products found</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                <FiFilter /> Filters
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none border border-gray-200 rounded-full pl-4 pr-9 py-2 text-sm font-medium outline-none hover:border-primary transition-colors cursor-pointer"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Best Discount</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm" />
              </div>
            </div>
          </div>

          {paginatedProducts.length === 0 ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400">No products found matching your filters.</p>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;