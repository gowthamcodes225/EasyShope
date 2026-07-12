import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiCheck } from "react-icons/fi";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-md p-8 sm:p-12 text-center border border-gray-100"
      >
        <FiMail className="text-4xl text-primary mx-auto mb-3" />
        <h2 className="text-xl sm:text-2xl font-bold text-textdark mb-2">
          Subscribe to our Newsletter
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Get exclusive deals and updates straight to your inbox
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-5 py-3 rounded-full border border-gray-200 outline-none focus:border-primary transition-colors text-sm"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-secondary text-white font-medium px-6 py-3 rounded-full hover:shadow-lg active:scale-95 transition-all whitespace-nowrap"
          >
            {subscribed ? (
              <span className="flex items-center gap-1 justify-center">
                <FiCheck /> Subscribed
              </span>
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Newsletter;