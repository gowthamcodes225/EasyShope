import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiUser, FiHeart, FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import SearchBar from "./SearchBar";
import MobileDrawer from "./MobileDrawer";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-30 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        {/* Top bar - desktop only */}
        <div className="hidden lg:flex justify-end items-center gap-6 max-w-7xl mx-auto px-4 py-1.5 text-xs text-gray-500 border-b border-gray-50">
          <Link to="/become-seller" className="hover:text-primary transition-colors flex items-center gap-1">
            <FiTrendingUp /> Become a Seller
          </Link>
          <Link to="/investor-relations" className="hover:text-primary transition-colors">
            Investor Relations
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Hamburger - mobile */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden text-2xl text-textdark active:scale-90 transition-transform"
          >
            <FiMenu />
          </button>

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ShopEase
            </span>
          </Link>

          {/* Search - desktop centered */}
          <div className="hidden md:block flex-1">
            <SearchBar />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 sm:gap-5 ml-auto">
            <Link
              to="/login"
              className="hidden lg:flex flex-col items-center text-textdark hover:text-primary transition-colors"
            >
              <FiUser className="text-xl" />
              <span className="text-[10px] font-medium">Profile</span>
            </Link>

            <Link
              to="/wishlist"
              className="relative flex flex-col items-center text-textdark hover:text-primary transition-colors"
            >
              <FiHeart className="text-xl" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
              <span className="hidden lg:block text-[10px] font-medium">Wishlist</span>
            </Link>

            <Link
              to="/cart"
              className="relative flex flex-col items-center text-textdark hover:text-primary transition-colors"
            >
              <FiShoppingBag className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="hidden lg:block text-[10px] font-medium">Cart</span>
            </Link>
          </div>
        </div>

        {/* Search - mobile below logo row */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;