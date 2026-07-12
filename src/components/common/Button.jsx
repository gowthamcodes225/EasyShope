import { useState } from "react";
import { motion } from "framer-motion";

const Button = ({ children, onClick, variant = "primary", className = "", ...props }) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y, size }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick && onClick(e);
  };

  const base =
    "relative overflow-hidden rounded-full font-medium px-6 py-2.5 transition-transform active:scale-95";
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-xl",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-textdark hover:bg-gray-100",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute bg-white/40 rounded-full animate-ripple pointer-events-none"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
    </motion.button>
  );
};

export default Button;