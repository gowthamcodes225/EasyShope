import { motion } from "framer-motion";
import ProductCard from "../product/ProductCard";

const ProductGrid = ({ title, products, viewAllLink, columns = "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4" }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-lg sm:text-2xl font-bold text-textdark"
        >
          {title}
        </motion.h2>
        {viewAllLink && (
          <a href={viewAllLink} className="text-primary text-sm font-medium hover:underline">
            View All
          </a>
        )}
      </div>

      <div className={`grid ${columns} gap-4 sm:gap-5`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;