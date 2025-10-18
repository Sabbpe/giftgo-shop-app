import { useBrands } from "@/hooks/useBrands";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

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

interface TopFeaturedBrandsProps {
  onBrandClick: (slug: string) => void;
}

const TopFeaturedBrands = ({ onBrandClick }: TopFeaturedBrandsProps) => {
  const { data: brands = [], isLoading } = useBrands();

  // Get top 10 highest discounted brands
  const topBrands = [...brands]
    .sort((a, b) => Number(b.discount_percentage) - Number(a.discount_percentage))
    .slice(0, 10);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-20 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Top Featured Brands</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {topBrands.map((brand) => (
          <Card
            key={brand.id}
            className="cursor-pointer hover:shadow-lg transition-all group"
            onClick={() => onBrandClick(brand.slug)}
          >
            <CardContent className="p-4 text-center space-y-2">
              <div className="relative">
                <div className="h-20 flex items-center justify-center rounded-lg group-hover:scale-105 transition-transform overflow-hidden">
                  {brand.logo_url ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted p-2">
                      <img
                        src={brand.logo_url}
                        alt={brand.name}
                        className="h-16 w-16 object-contain"
                      />
                    </div>
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getGradientForBrand(brand.name)} text-white`}>
                      <span className="text-3xl font-bold drop-shadow-lg">
                        {brand.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-accent to-primary shadow-lg">
                  {brand.discount_percentage}% OFF
                </Badge>
              </div>
              <p className="font-medium text-sm truncate">{brand.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopFeaturedBrands;
