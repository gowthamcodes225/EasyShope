import { motion } from "framer-motion";
import { FiUsers, FiShoppingBag, FiGlobe, FiAward } from "react-icons/fi";
import Breadcrumb from "../components/common/Breadcrumb";

const stats = [
  { icon: <FiUsers />, value: "2M+", label: "Happy Customers" },
  { icon: <FiShoppingBag />, value: "50K+", label: "Products" },
  { icon: <FiGlobe />, value: "500+", label: "Cities Served" },
  { icon: <FiAward />, value: "10+", label: "Years of Trust" },
];

const About = () => {
  return (
    <div>
      <Breadcrumb items={[{ label: "About Us" }]} />

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h1 className="text-xl sm:text-3xl font-bold text-textdark mb-4">
            About ShopEase
          </h1>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            ShopEase is your trusted online marketplace, bringing together fashion,
            electronics, beauty, and lifestyle products from top brands. We're on a
            mission to make quality shopping accessible, affordable, and delightful
            for everyone, everywhere.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-lg transition-shadow"
            >
              <span className="text-2xl text-primary flex justify-center mb-2">{stat.icon}</span>
              <h3 className="text-xl sm:text-2xl font-bold text-textdark">{stat.value}</h3>
              <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.img
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600"
            alt="Our team"
            className="rounded-2xl shadow-md w-full h-64 sm:h-80 object-cover"
            loading="lazy"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg sm:text-xl font-bold text-textdark mb-3">Our Story</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">
              Founded with a simple idea — shopping should be easy, fun, and reliable.
              What started as a small marketplace has grown into a platform serving
              millions across the country.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              We work directly with brands and sellers to ensure the best prices,
              authentic products, and fast delivery — right to your doorstep.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;