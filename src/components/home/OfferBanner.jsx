import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OfferBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-fuchsia-600 to-secondary px-6 sm:px-12 py-10 sm:py-14 text-center"
      >
        {/* animated blobs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 7 }}
          className="absolute -bottom-10 -right-10 w-52 h-52 bg-white/10 rounded-full blur-2xl"
        />

        <h2 className="relative text-2xl sm:text-4xl font-extrabold text-white mb-2">
          Flat 50% OFF Storewide
        </h2>
        <p className="relative text-white/90 text-sm sm:text-base mb-6">
          Limited time offer. Grab your favorites before it's gone!
        </p>
        <Link
          to="/products"
          className="relative inline-block bg-white text-primary font-semibold px-8 py-3 rounded-full hover:scale-105 hover:shadow-xl transition-all"
        >
          Shop Now
        </Link>
      </motion.div>
    </section>
  );
};

export default OfferBanner;