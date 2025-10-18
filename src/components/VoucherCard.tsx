import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brand } from "@/hooks/useBrands";
import { Category } from "@/hooks/useBrands";

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
        <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
          {brand.logo_url ? (
            <img 
              src={brand.logo_url} 
              alt={brand.name}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <div className="text-6xl font-bold text-primary/20">{brand.name.charAt(0)}</div>
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
