import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiMinus, FiPlus, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import Breadcrumb from "../components/common/Breadcrumb";
import RatingStars from "../components/common/RatingStars";
import Badge from "../components/common/Badge";
import ProductGallery from "../components/product/ProductGallery";
import ReviewCard from "../components/product/ReviewCard";
import ProductGrid from "../components/home/ProductGrid";
import { products } from "../data/products";
import { reviews } from "../data/reviews";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (!product) {
    return (
      <div className="text-center py-24">
        <h2 className="text-xl font-bold text-textdark">Product not found</h2>
        <Link to="/products" className="text-primary hover:underline mt-2 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const galleryImages = [product.image, product.image, product.image];
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Products", link: "/products" },
          { label: product.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <ProductGallery images={galleryImages} name={product.name} />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <p className="text-xs text-gray-400 uppercase font-medium">{product.brand}</p>
          <h1 className="text-xl sm:text-2xl font-bold text-textdark mt-1 mb-2">
            {product.name}
          </h1>
          <RatingStars rating={product.rating} reviews={product.reviews} size="text-base" />

          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl sm:text-3xl font-bold text-textdark">₹{product.price}</span>
            <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
            <Badge color="danger">{product.discount}% OFF</Badge>
          </div>
          <p className="text-xs text-green-600 font-medium mt-1">Inclusive of all taxes</p>

          <p className="text-sm text-gray-600 mt-5 leading-relaxed">
            Premium quality {product.name.toLowerCase()} from {product.brand}. Designed for comfort,
            durability, and style — perfect for everyday use. Trusted by {product.reviews}+ happy customers.
          </p>

          <div className="flex items-center gap-4 mt-6">
            <span className="text-sm font-medium text-textdark">Quantity</span>
            <div className="flex items-center border border-gray-200 rounded-full">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center hover:text-primary transition-colors"
              >
                <FiMinus />
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 flex items-center justify-center hover:text-primary transition-colors"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => addToCart(product, qty)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-medium py-3 rounded-full hover:shadow-lg active:scale-95 transition-all"
            >
              <FiShoppingCart /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                wishlisted ? "border-primary bg-primary/10" : "border-gray-200 hover:border-primary"
              }`}
            >
              <FiHeart className={wishlisted ? "fill-primary text-primary" : "text-gray-500"} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col items-center text-center gap-1.5">
              <FiTruck className="text-xl text-primary" />
              <span className="text-xs text-gray-500">Free Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <FiRefreshCw className="text-xl text-primary" />
              <span className="text-xs text-gray-500">7-Day Return</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <FiShield className="text-xl text-primary" />
              <span className="text-xs text-gray-500">Secure Payment</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-lg sm:text-xl font-bold text-textdark mb-5">Customer Reviews</h2>
        {productReviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productReviews.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No reviews yet for this product.</p>
        )}
      </div>

      {relatedProducts.length > 0 && (
        <ProductGrid title="Related Products" products={relatedProducts} />
      )}
    </div>
  );
};

export default ProductDetails;