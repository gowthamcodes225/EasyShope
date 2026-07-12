import CategoryMenu from "../components/layout/CategoryMenu";
import HeroSlider from "../components/home/HeroSlider";
import FeaturedCategories from "../components/home/FeaturedCategories";
import BrandSection from "../components/home/BrandSection";
import ProductGrid from "../components/home/ProductGrid";
import OfferBanner from "../components/home/OfferBanner";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import { products } from "../data/products";

const Home = () => {
  return (
    <div>
      <CategoryMenu />
      <HeroSlider />
      <FeaturedCategories />
      <BrandSection />
      <ProductGrid title="Today's Deals" products={products.slice(0, 8)} viewAllLink="/products" />
      <ProductGrid
        title="Trending Products"
        products={products}
        columns="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      />
      <OfferBanner />
      <ProductGrid title="Popular Categories" products={products.slice(4, 12)} />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;