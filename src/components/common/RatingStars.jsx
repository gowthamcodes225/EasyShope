import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating, reviews, size = "text-sm" }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${size}`}>
      <div className="flex text-amber-400">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalf && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
      <span className="text-gray-500 text-xs">
        {rating} {reviews !== undefined && `(${reviews})`}
      </span>
    </div>
  );
};

export default RatingStars;