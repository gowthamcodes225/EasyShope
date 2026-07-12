import { Link } from "react-router-dom";
import { FiChevronRight, FiHome } from "react-icons/fi";

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="max-w-7xl mx-auto px-4 py-4">
      <ol className="flex items-center flex-wrap gap-1.5 text-sm text-gray-500">
        <li className="flex items-center gap-1.5">
          <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <FiHome className="text-xs" /> Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <FiChevronRight className="text-xs text-gray-400" />
            {item.link ? (
              <Link to={item.link} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-textdark font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;