import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <img
          src={review.photo}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <p className="font-semibold text-sm text-textdark">{review.name}</p>
          <p className="text-xs text-gray-400">{review.date}</p>
        </div>
      </div>
      <div className="flex text-amber-400 mb-2 text-xs">
        {[...Array(review.rating)].map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
    </motion.div>
  );
};

export default ReviewCard;