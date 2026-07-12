import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-7xl sm:text-9xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold text-textdark mt-2"
      >
        Oops! Page not found
      </motion.p>
      <p className="text-sm text-gray-400 mt-1 mb-6 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-medium px-8 py-3 rounded-full hover:shadow-lg active:scale-95 transition-all"
      >
        <FiHome /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;