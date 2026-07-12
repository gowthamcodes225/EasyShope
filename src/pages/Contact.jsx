import { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi";
import Breadcrumb from "../components/common/Breadcrumb";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  const info = [
    { icon: <FiMapPin />, title: "Address", text: "123 Market Street, Chennai, Tamil Nadu, India" },
    { icon: <FiPhone />, title: "Phone", text: "+91 98765 43210" },
    { icon: <FiMail />, title: "Email", text: "support@shopease.com" },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: "Contact" }]} />

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h1 className="text-xl sm:text-2xl font-bold text-textdark">Get in Touch</h1>
          <p className="text-sm text-gray-400 mt-1">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            {info.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4"
              >
                <span className="text-xl text-primary mt-1">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-textdark text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                />
                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                />
              </div>
              <textarea
                required
                rows={5}
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors resize-none"
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-medium px-8 py-3 rounded-full hover:shadow-lg active:scale-95 transition-all"
              >
                {sent ? "Message Sent!" : <>Send Message <FiSend /></>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;