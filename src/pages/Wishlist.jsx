import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import Breadcrumb from "../components/common/Breadcrumb";
import RatingStars from "../components/common/RatingStars";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div>
        <Breadcrumb items={[{ label: "Wishlist" }]} />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <FiHeart className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-textdark mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-gray-400 mb-6">Save items you love for later.</p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-primary to-secondary text-white font-medium px-8 py-3 rounded-full hover:shadow-lg transition-shadow"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={[{ label: "Wishlist" }]} />

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <h1 className="text-lg sm:text-xl font-bold text-textdark mb-5">
          My Wishlist ({wishlist.length})
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          <AnimatePresence>
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
              >
                <Link to={`/product/${item.id}`} className="block relative h-40 sm:h-48 overflow-hidden bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>

                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                >
                  <FiTrash2 className="text-sm text-red-500" />
                </button>

                <div className="p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-medium">{item.brand}</p>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-sm font-semibold text-textdark truncate hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <RatingStars rating={item.rating} reviews={item.reviews} />
                  <div className="flex items-center gap-2 mt-1.5 mb-3">
                    <span className="font-bold text-textdark">₹{item.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium py-2 rounded-full hover:shadow-lg active:scale-95 transition-all"
                  >
                    <FiShoppingCart /> Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;