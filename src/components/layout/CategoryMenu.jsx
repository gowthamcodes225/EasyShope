import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { motion } from "framer-motion";

const CategoryMenu = () => {
  return (
    <div className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto hide-scrollbar py-3 snap-x snap-mandatory">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="snap-start shrink-0"
            >
              <Link
                to={`/categories/${cat.slug}`}
                className="flex flex-col items-center gap-1 group"
              >
                <span className="text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1">
                  {cat.icon}
                </span>
                <span className="text-xs font-medium text-gray-600 whitespace-nowrap group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;