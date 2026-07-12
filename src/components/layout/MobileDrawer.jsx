import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiX, FiUser, FiHeart, FiShoppingBag, FiHome, FiGrid, FiPhoneCall, FiInfo } from "react-icons/fi";

const links = [
  { to: "/", label: "Home", icon: <FiHome /> },
  { to: "/products", label: "Products", icon: <FiGrid /> },
  { to: "/profile", label: "Profile", icon: <FiUser /> },
  { to: "/wishlist", label: "Wishlist", icon: <FiHeart /> },
  { to: "/cart", label: "Cart", icon: <FiShoppingBag /> },
  { to: "/about", label: "About", icon: <FiInfo /> },
  { to: "/contact", label: "Contact", icon: <FiPhoneCall /> },
];

const MobileDrawer = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-[78%] max-w-xs bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-primary to-secondary">
              <span className="text-white font-bold text-lg">ShopEase</span>
              <button
                onClick={onClose}
                className="text-white text-2xl active:scale-90 transition-transform"
              >
                <FiX />
              </button>
            </div>

            <div className="flex flex-col p-4 gap-1 overflow-y-auto">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-textdark font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <span className="text-lg text-primary">{link.icon}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto p-4 border-t border-gray-100">
              <Link
                to="/login"
                onClick={onClose}
                className="block text-center bg-gradient-to-r from-primary to-secondary text-white font-medium py-2.5 rounded-full"
              >
                Login / Register
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;