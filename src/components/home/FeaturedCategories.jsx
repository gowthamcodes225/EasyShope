import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { featuredCategories } from "../../data/featuredCategories";

const FeaturedCategories = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-textdark">
          Featured Categories
        </h2>
        <Link to="/categories" className="text-primary text-sm font-medium hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {featuredCategories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            whileHover={{ y: -6 }}
          >
            <Link
              to={`/products?category=${cat.name.toLowerCase()}`}
              className="group block relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 h-36 sm:h-44"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white font-semibold text-sm sm:text-base drop-shadow">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;