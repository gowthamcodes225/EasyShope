import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiLogOut, FiPackage, FiHeart, FiMapPin, FiEdit2 } from "react-icons/fi";
import Breadcrumb from "../components/common/Breadcrumb";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-textdark mb-2">Please login to view profile</h2>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-gradient-to-r from-primary to-secondary text-white font-medium px-8 py-3 rounded-full hover:shadow-lg transition-shadow"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const menuItems = [
    { icon: <FiPackage />, label: "My Orders", link: "/my-orders" },
    { icon: <FiHeart />, label: "My Wishlist", link: "/wishlist" },
    { icon: <FiMapPin />, label: "Saved Addresses", link: "#" },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: "Profile" }]} />

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 sm:p-8 text-white mb-6 relative overflow-hidden"
        >
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold border-2 border-white/40">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold capitalize">{user.name}</h1>
              <p className="text-sm text-white/80">{user.email}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {menuItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.link}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow p-5 flex flex-col items-center gap-2 text-center"
            >
              <span className="text-2xl text-primary">{item.icon}</span>
              <span className="text-sm font-medium text-textdark">{item.label}</span>
            </motion.a>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-textdark">Account Details</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
            >
              <FiEdit2 className="text-xs" /> {editing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <FiUser className="text-gray-400" />
              <span className="text-gray-500 w-20">Name</span>
              <span className="font-medium text-textdark capitalize">{user.name}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FiMail className="text-gray-400" />
              <span className="text-gray-500 w-20">Email</span>
              <span className="font-medium text-textdark">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FiPhone className="text-gray-400" />
              <span className="text-gray-500 w-20">Phone</span>
              <span className="font-medium text-textdark">{user.phone || "Not added"}</span>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="mt-6 flex items-center gap-2 text-red-500 text-sm font-medium hover:underline"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;