import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCreditCard, FiTruck, FiCheckCircle, FiMapPin } from "react-icons/fi";
import Breadcrumb from "../components/common/Breadcrumb";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placing, setPlacing] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    street: "",
    city: "",
    state: "",
  });

  const deliveryFee = totalPrice > 999 ? 0 : 49;
  const grandTotal = totalPrice + deliveryFee;

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      const order = {
        id: "ORD" + Date.now(),
        items: cartItems,
        address,
        paymentMethod,
        total: grandTotal,
        date: new Date().toISOString(),
        status: "Confirmed",
      };
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([order, ...existingOrders]));
      clearCart();
      setPlacing(false);
      navigate("/my-orders");
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-textdark mb-2">Your cart is empty</h2>
        <p className="text-sm text-gray-400">Add items to proceed to checkout.</p>
      </div>
    );
  }

  const steps = [
    { id: 1, label: "Address", icon: <FiMapPin /> },
    { id: 2, label: "Payment", icon: <FiCreditCard /> },
    { id: 3, label: "Review", icon: <FiCheckCircle /> },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: "Cart", link: "/cart" }, { label: "Checkout" }]} />

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 sm:gap-4">
              <div
                className={`flex items-center gap-2 ${
                  step >= s.id ? "text-primary" : "text-gray-300"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                    step >= s.id ? "border-primary bg-primary/10" : "border-gray-200"
                  }`}
                >
                  {s.icon}
                </div>
                <span className="text-sm font-medium hidden sm:block">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 ${step > s.id ? "bg-primary" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6"
              >
                <h2 className="font-bold text-textdark mb-4">Delivery Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={address.name}
                    onChange={handleAddressChange}
                    placeholder="Full Name"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                  />
                  <input
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    placeholder="Phone Number"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                  />
                  <input
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    placeholder="Pincode"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                  />
                  <input
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    placeholder="City"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                  />
                  <input
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    placeholder="State"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                  />
                  <input
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    placeholder="Street Address"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors sm:col-span-2"
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!address.name || !address.phone || !address.pincode}
                  className="mt-5 w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white font-medium px-8 py-3 rounded-full hover:shadow-lg disabled:opacity-40 transition-all"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6"
              >
                <h2 className="font-bold text-textdark mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: "cod", label: "Cash on Delivery" },
                    { id: "card", label: "Credit / Debit Card" },
                    { id: "upi", label: "UPI Payment" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="accent-primary"
                      />
                      <span className="text-sm font-medium">{method.label}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setStep(1)}
                    className="border border-gray-200 text-textdark font-medium px-6 py-3 rounded-full hover:border-primary transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white font-medium py-3 rounded-full hover:shadow-lg transition-all"
                  >
                    Review Order
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6"
              >
                <h2 className="font-bold text-textdark mb-4">Review Your Order</h2>

                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <FiMapPin /> Delivering to
                  </p>
                  <p className="text-sm font-medium text-textdark">
                    {address.name}, {address.street}, {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-sm text-gray-500">{address.phone}</p>
                </div>

                <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-textdark truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                      </div>
                      <span className="text-sm font-semibold">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="border border-gray-200 text-textdark font-medium px-6 py-3 rounded-full hover:border-primary transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white font-medium py-3 rounded-full hover:shadow-lg transition-all disabled:opacity-60"
                  >
                    {placing ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-fit sticky top-24">
            <h2 className="font-bold text-textdark mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-textdark">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
              <FiTruck /> Estimated delivery in 3-5 business days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;