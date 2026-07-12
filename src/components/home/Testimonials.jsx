import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { testimonials } from "../../data/testimonials";

const Testimonials = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-lg sm:text-2xl font-bold text-textdark mb-6 text-center">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6"
          >
            <div className="flex text-amber-400 mb-3">
              {[...Array(t.rating)].map((_, idx) => (
                <FaStar key={idx} />
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-4">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <img
                src={t.photo}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
                loading="lazy"
              />
              <span className="font-semibold text-sm text-textdark">{t.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;