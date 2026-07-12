import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SearchBar = ({ className = "" }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full max-w-xl mx-auto ${className}`}
    >
      <motion.div
        animate={{
          boxShadow: focused
            ? "0 4px 20px rgba(159,32,137,0.25)"
            : "0 1px 4px rgba(0,0,0,0.08)",
        }}
        className="flex items-center bg-white rounded-full border border-gray-200 px-4 py-2.5"
      >
        <FiSearch className="text-gray-400 text-lg shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search for products, brands and more"
          className="w-full bg-transparent outline-none px-3 text-sm text-textdark placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="hidden sm:block bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium px-4 py-1.5 rounded-full hover:shadow-md transition-shadow"
        >
          Search
        </button>
      </motion.div>
    </form>
  );
};

export default SearchBar;