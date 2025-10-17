import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Voucher } from "@/components/VoucherCard";

interface BrandDetailsProps {
  vouchers: Voucher[];
  cartItems: Voucher[];
  onAddToCart: (voucher: Voucher) => void;
  onCartClick: () => void;
}

const BrandDetails = ({ vouchers, cartItems, onAddToCart, onCartClick }: BrandDetailsProps) => {
  const { brandId } = useParams();
  const navigate = useNavigate();

  const brand = vouchers.find(v => v.id === brandId);
  
  if (!brand) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={cartItems.length} onCartClick={onCartClick} />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Brand not found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const denominations = [100, 250, 500, 1000, 2500, 5000];

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} onCartClick={onCartClick} />
      
      <div className="container py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Store
        </Button>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-4">
              <div className="text-9xl font-bold text-primary/30">{brand.title.charAt(0)}</div>
            </div>
          </div>

          <div>
            <Badge variant="secondary" className="mb-4">{brand.category}</Badge>
            <h1 className="text-4xl font-bold mb-4">{brand.title}</h1>
            <p className="text-muted-foreground mb-6 text-lg">{brand.description}</p>
            
            {brand.discount && (
              <div className="bg-accent/10 border border-accent rounded-lg p-4 mb-6">
                <p className="text-accent font-bold text-2xl">
                  {brand.discount}% OFF on all denominations
                </p>
                <p className="text-sm text-muted-foreground mt-1">Limited time offer</p>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">About this voucher:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Valid at all {brand.title} stores nationwide</li>
                <li>• Can be used online and offline</li>
                <li>• No expiry date</li>
                <li>• Instant digital delivery</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Choose Denomination</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {denominations.map((denomination) => {
              const finalPrice = brand.discount 
                ? denomination * (1 - brand.discount / 100)
                : denomination;

              return (
                <Card key={denomination} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-2xl">₹{denomination}</CardTitle>
                    {brand.discount && (
                      <CardDescription>
                        <span className="text-lg font-bold text-foreground">₹{finalPrice.toFixed(0)}</span>
                        <span className="ml-2 line-through text-muted-foreground">₹{denomination}</span>
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => onAddToCart({
                        ...brand,
                        value: denomination
                      })}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDetails;
