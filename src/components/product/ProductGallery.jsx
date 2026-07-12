import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductGallery = ({ images, name }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="w-full">
      <div
        className="relative h-72 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden bg-gray-50 cursor-zoom-in"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt={name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: zoomed ? 1.15 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      <div className="flex gap-3 mt-4 overflow-x-auto hide-scrollbar">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
              activeIndex === i ? "border-primary shadow-md" : "border-gray-200 opacity-70 hover:opacity-100"
            }`}
          >
            <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;