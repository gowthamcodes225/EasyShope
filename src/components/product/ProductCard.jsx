import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiEye, FiShoppingCart } from "react-icons/fi";
import RatingStars from "../common/RatingStars";
import Badge from "../common/Badge";
import Modal from "../common/Modal";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const [quickView, setQuickView] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
      >
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute top-2 left-2">
              <Badge color="danger">{product.discount}% OFF</Badge>
            </div>

            <button
              onClick={handleWishlist}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            >
              <FiHeart
                className={`text-base ${
                  wishlisted ? "fill-primary text-primary" : "text-gray-500"
                }`}
              />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                setQuickView(true);
              }}
              className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs font-medium py-2 flex items-center justify-center gap-1 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            >
              <FiEye /> Quick View
            </button>
          </div>

          <div className="p-3">
            <p className="text-[11px] text-gray-400 font-medium uppercase">
              {product.brand}
            </p>
            <h3 className="text-sm font-semibold text-textdark truncate mb-1">
              {product.name}
            </h3>
            <RatingStars rating={product.rating} reviews={product.reviews} />
            <div className="flex items-center gap-2 mt-1.5">
              <span className="font-bold text-textdark">₹{product.price}</span>
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            </div>
          </div>
        </Link>

        <div className="px-3 pb-3">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium py-2 rounded-full hover:shadow-lg active:scale-95 transition-all"
          >
            <FiShoppingCart /> Add to Cart
          </button>
        </div>
      </motion.div>

      <Modal isOpen={quickView} onClose={() => setQuickView(false)} title={product.name}>
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full sm:w-40 h-40 object-cover rounded-xl"
          />
          <div className="flex-1">
            <p className="text-xs text-gray-400 uppercase">{product.brand}</p>
            <RatingStars rating={product.rating} reviews={product.reviews} />
            <div className="flex items-center gap-2 my-2">
              <span className="font-bold text-lg text-textdark">₹{product.price}</span>
              <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
              <Badge color="danger">{product.discount}% OFF</Badge>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium py-2.5 rounded-full mt-2 hover:shadow-lg transition-shadow"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;