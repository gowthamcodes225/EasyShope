import { motion } from "framer-motion";
import { brands } from "../../data/brands";

const BrandSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-lg sm:text-2xl font-bold text-textdark mb-6">
        Popular Brands
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
        {brands.map((brand, i) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.08, y: -4 }}
            className="flex items-center justify-center bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-4 h-20 sm:h-24 border border-gray-50"
          >
            <span className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors text-center">
              {brand.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BrandSection;