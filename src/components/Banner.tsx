import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import bannerDeals from "@/assets/banner-deals.jpg";
import bannerFashion from "@/assets/banner-fashion.jpg";
import bannerHot from "@/assets/banner-hot.jpg";

const banners = [
  {
    id: 1,
    title: "Get Ready for Amazing Deals",
    subtitle: "From local to global gift cards - save on your favorites now!",
    gradient: "from-purple-900 via-purple-800 to-pink-800",
    badge: "UP TO 80% OFF",
    image: bannerDeals
  },
  {
    id: 2,
    title: "Exclusive Fashion Vouchers",
    subtitle: "Shop from top brands with incredible discounts",
    gradient: "from-blue-900 via-indigo-800 to-purple-800",
    badge: "NEW ARRIVALS",
    image: bannerFashion
  },
  {
    id: 3,
    title: "Limited Time Offers",
    subtitle: "Don't miss out on these exclusive deals",
    gradient: "from-orange-900 via-red-800 to-pink-800",
    badge: "HOT DEALS",
    image: bannerHot
  }
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className={`w-full h-full bg-gradient-to-r ${banner.gradient} flex items-center justify-between px-16`}>
            <div className="text-white space-y-4 max-w-xl">
              <div className="inline-block bg-accent/90 text-accent-foreground px-4 py-2 rounded-full text-sm font-bold rotate-3">
                {banner.badge}
              </div>
              <h2 className="text-5xl font-bold">{banner.title}</h2>
              <p className="text-xl opacity-90">{banner.subtitle}</p>
              <Button size="lg" className="mt-4">
                Explore Now
              </Button>
            </div>
            <div className="w-80 h-80 relative">
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
