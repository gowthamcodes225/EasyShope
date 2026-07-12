import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { banners } from "../../data/banners";

const HeroSlider = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-4">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="rounded-2xl overflow-hidden shadow-lg hero-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-[220px] sm:h-[320px] md:h-[420px] lg:h-[480px] w-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex items-center">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="px-6 sm:px-12 max-w-md"
                >
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    {banner.title}
                  </h2>
                  <p className="text-sm sm:text-base text-white/90 mb-4">
                    {banner.subtitle}
                  </p>
                  <Link
                    to={banner.link}
                    className="inline-block bg-gradient-to-r from-primary to-secondary text-white text-sm sm:text-base font-medium px-6 py-2.5 rounded-full hover:shadow-xl hover:scale-105 transition-all"
                  >
                    {banner.cta}
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white;
          background: rgba(0,0,0,0.3);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after {
          font-size: 16px;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #9F2089;
        }
        @media (max-width: 640px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;