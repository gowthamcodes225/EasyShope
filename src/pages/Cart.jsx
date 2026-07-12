import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import Breadcrumb from "../components/common/Breadcrumb";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, totalPrice, totalItems } = useCart();

  const deliveryFee = totalPrice > 999 || totalPrice === 0 ? 0 : 49;
  const grandTotal = totalPrice + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div>
        <Breadcrumb items={[{ label: "Cart" }]} />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FiShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-textdark mb-2">Your cart is empty</h2>
            <p className="text-sm text-gray-400 mb-6">
              Looks like you haven't added anything yet.
            </p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-primary to-secondary text-white font-medium px-8 py-3 rounded-full hover:shadow-lg transition-shadow"
            >
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={[{ label: "Cart" }]} />

      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-lg sm:text-xl font-bold text-textdark mb-5">
            My Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </h1>

          <div className="space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
                >
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl"
                      loading="lazy"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-gray-400 uppercase font-medium">{item.brand}</p>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-sm font-semibold text-textdark truncate hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-textdark">₹{item.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-full">
                        <button
                          onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                          className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                        >
                          <FiMinus className="text-xs" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                        >
                          <FiPlus className="text-xs" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-fit sticky top-24"
        >
          <h2 className="font-bold text-textdark mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal ({totalItems} items)</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery Fee</span>
              <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </span>
            </div>
            {deliveryFee > 0 && (
              <p className="text-xs text-gray-400">
                Add ₹{999 - totalPrice} more for free delivery
              </p>
            )}
            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-textdark">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-medium py-3 rounded-full hover:shadow-lg active:scale-95 transition-all"
          >
            Proceed to Checkout <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;