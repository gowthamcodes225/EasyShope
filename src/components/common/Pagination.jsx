import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 py-8 flex-wrap">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 disabled:opacity-40 hover:bg-primary hover:text-white hover:border-primary transition-all"
      >
        <FiChevronLeft />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
            currentPage === page
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
              : "border border-gray-200 hover:bg-primary/10 hover:text-primary"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 disabled:opacity-40 hover:bg-primary hover:text-white hover:border-primary transition-all"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;