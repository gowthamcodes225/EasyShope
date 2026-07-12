import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPackage, FiChevronRight } from "react-icons/fi";
import Breadcrumb from "../components/common/Breadcrumb";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(saved);
  }, []);

  if (orders.length === 0) {
    return (
      <div>
        <Breadcrumb items={[{ label: "My Orders" }]} />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <FiPackage className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-textdark mb-2">No orders yet</h2>
          <p className="text-sm text-gray-400 mb-6">
            You haven't placed any orders. Start exploring!
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-primary to-secondary text-white font-medium px-8 py-3 rounded-full hover:shadow-lg transition-shadow"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={[{ label: "My Orders" }]} />

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <h1 className="text-lg sm:text-xl font-bold text-textdark mb-5">
          My Orders ({orders.length})
        </h1>

        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="text-sm font-semibold text-textdark">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Order Date</p>
                  <p className="text-sm font-medium text-textdark">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {order.status}
                </span>
              </div>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-textdark truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                    </div>
                    <span className="text-sm font-semibold">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="font-bold text-textdark">Total: ₹{order.total}</span>
                <button className="flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                  Track Order <FiChevronRight />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;