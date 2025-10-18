import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brand, Category } from "@/hooks/useBrands";

const gradients = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-teal-500 to-green-500",
  "from-yellow-500 to-orange-500",
];

const getGradientForBrand = (brandName: string) => {
  const index = brandName.charCodeAt(0) % gradients.length;
  return gradients[index];
};

interface DealOfTheDayProps {
  brands: Brand[];
  categories: Category[];
  onBrandClick: (slug: string) => void;
}

const DealOfTheDay = ({ brands, categories, onBrandClick }: DealOfTheDayProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Deal of the Day</h2>
          <p className="text-muted-foreground">Limited time offers - Grab them before they're gone!</p>
        </div>
        <div className="flex items-center gap-2 bg-accent/20 px-6 py-3 rounded-lg">
          <Clock className="h-5 w-5 text-accent" />
          <div className="flex gap-2 font-mono text-2xl font-bold">
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {brands.map((brand) => {
          const category = categories.find(c => c.id === brand.category_id);
          return (
            <Card
              key={brand.id}
              className="group cursor-pointer hover:shadow-xl transition-all overflow-hidden"
              onClick={() => onBrandClick(brand.slug)}
            >
              <CardContent className="p-4">
                <div className="aspect-square bg-gradient-to-br rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                  {brand.logo_url ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted p-4">
                      <img 
                        src={brand.logo_url} 
                        alt={brand.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getGradientForBrand(brand.name)} text-white`}>
                      <span className="text-5xl font-bold drop-shadow-lg">
                        {brand.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-sm mb-2 truncate">{brand.name}</h3>
                {brand.discount_percentage > 0 && (
                  <Badge className="bg-accent text-accent-foreground text-xs">
                    {brand.discount_percentage}% OFF
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DealOfTheDay;
