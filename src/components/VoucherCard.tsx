import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brand } from "@/hooks/useBrands";
import { Category } from "@/hooks/useBrands";

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

interface VoucherCardProps {
  brand: Brand;
  category: Category | undefined;
  onAddToCart: (item: any) => void;
  onClick: () => void;
}

const VoucherCard = ({ brand, category, onClick }: VoucherCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden transition-all hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />
      
      <CardHeader className="relative">
        <div className="aspect-square rounded-lg mb-3 flex items-center justify-center overflow-hidden">
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
              <span className="text-6xl font-bold drop-shadow-lg">
                {brand.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="mb-2 text-xs">
            {category?.name || 'Uncategorized'}
          </Badge>
          {brand.discount_percentage > 0 && (
            <Badge className="bg-accent shrink-0">
              {brand.discount_percentage}% OFF
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl">{brand.name}</CardTitle>
      </CardHeader>

      <CardContent className="relative">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {brand.description || 'Exclusive gift vouchers'}
        </p>
      </CardContent>
    </Card>
  );
};

export default VoucherCard;
