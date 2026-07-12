import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiSmartphone,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-textdark text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">ShopEase</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your one-stop destination for fashion, electronics, beauty and more. Shop smart, live better.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-primary transition-colors">Products</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/my-orders" className="hover:text-primary transition-colors">Track Order</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Shipping Info</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Get in Touch</h4>
          <p className="text-sm text-gray-400 mb-3">support@shopease.com</p>
          <div className="flex gap-3 mb-4">
            {[FiFacebook, FiInstagram, FiTwitter, FiYoutube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all">
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-primary px-4 py-2 rounded-full text-sm transition-colors">
            <FiSmartphone /> Download App
          </button>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;