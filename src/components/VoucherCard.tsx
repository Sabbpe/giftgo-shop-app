import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

export interface Voucher {
  id: string;
  title: string;
  value: number;
  description: string;
  category: string;
  discount?: number;
}

interface VoucherCardProps {
  voucher: Voucher;
  onAddToCart: (voucher: Voucher) => void;
}

const VoucherCard = ({ voucher, onAddToCart }: VoucherCardProps) => {
  const finalPrice = voucher.discount 
    ? voucher.value * (1 - voucher.discount / 100)
    : voucher.value;

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />
      
      <CardHeader className="relative">
        <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-3 flex items-center justify-center">
          <div className="text-6xl font-bold text-primary/20">{voucher.title.charAt(0)}</div>
        </div>
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="mb-2">
            {voucher.category}
          </Badge>
          {voucher.discount && (
            <Badge className="bg-accent">
              {voucher.discount}% OFF
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl">{voucher.title}</CardTitle>
      </CardHeader>

      <CardContent className="relative">
        <div className="flex items-baseline gap-2">
          {voucher.discount ? (
            <>
              <span className="text-2xl font-bold text-foreground">
                ₹{finalPrice.toFixed(0)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ₹{voucher.value.toFixed(0)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-foreground">
              ₹{voucher.value.toFixed(0)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="relative">
        <Button 
          className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
          onClick={() => onAddToCart(voucher)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VoucherCard;
