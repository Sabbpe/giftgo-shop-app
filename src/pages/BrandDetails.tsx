import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useBrand, useVoucherDenominations, useCategories } from "@/hooks/useBrands";
import { CartItem } from "@/types/cart";
import { useToast } from "@/hooks/use-toast";

interface BrandDetailsProps {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

const BrandDetails = ({ cartItems, setCartItems }: BrandDetailsProps) => {
  const { brandSlug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: brand, isLoading: brandLoading } = useBrand(brandSlug || "");
  const { data: denominations = [], isLoading: denominationsLoading } = useVoucherDenominations(brand?.id || "");
  const { data: categories = [] } = useCategories();
  
  if (brandLoading || denominationsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={cartItems.length} onCartClick={() => {}} />
        <div className="container py-12 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={cartItems.length} onCartClick={() => {}} />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Brand not found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === brand.category_id);

  const handleAddToCart = (denomination: number) => {
    const cartItem: CartItem = {
      id: `${brand.id}-${denomination}-${Date.now()}`,
      brandId: brand.id,
      brandName: brand.name,
      brandSlug: brand.slug,
      category: category?.name || 'Uncategorized',
      denomination,
      discount: brand.discount_percentage || 0,
      logoUrl: brand.logo_url,
      description: brand.description,
    };

    setCartItems([...cartItems, cartItem]);
    toast({
      title: "Added to cart",
      description: `${brand.name} ₹${denomination} voucher added to cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} onCartClick={() => {}} />
      
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
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
              {brand.logo_url ? (
                <img 
                  src={brand.logo_url} 
                  alt={brand.name}
                  className="w-full h-full object-contain p-12"
                />
              ) : (
                <div className="text-9xl font-bold text-primary/30">{brand.name.charAt(0)}</div>
              )}
            </div>
          </div>

          <div>
            <Badge variant="secondary" className="mb-4">{category?.name || 'Uncategorized'}</Badge>
            <h1 className="text-4xl font-bold mb-4">{brand.name}</h1>
            <p className="text-muted-foreground mb-6 text-lg">{brand.description || 'Exclusive gift vouchers'}</p>
            
            {brand.discount_percentage > 0 && (
              <div className="bg-accent/10 border border-accent rounded-lg p-4 mb-6">
                <p className="text-accent font-bold text-2xl">
                  {brand.discount_percentage}% OFF on all denominations
                </p>
                <p className="text-sm text-muted-foreground mt-1">Limited time offer</p>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">About this voucher:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Valid at all {brand.name} outlets nationwide</li>
                <li>• Can be used online and offline</li>
                <li>• Instant digital delivery</li>
                <li>• {brand.gst_status === 'Inclusive' ? 'GST Inclusive' : 'GST Exclusive'}</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Choose Denomination</h2>
          {denominations.length === 0 ? (
            <p className="text-muted-foreground">No denominations available at the moment.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {denominations.map((denomination) => {
                const finalPrice = brand.discount_percentage > 0
                  ? denomination.value * (1 - brand.discount_percentage / 100)
                  : denomination.value;

                return (
                  <Card key={denomination.id} className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <CardTitle className="text-2xl">₹{denomination.value}</CardTitle>
                      {brand.discount_percentage > 0 && (
                        <div className="space-y-1">
                          <p className="text-lg font-bold text-foreground">₹{finalPrice.toFixed(0)}</p>
                          <p className="text-sm text-muted-foreground line-through">₹{denomination.value}</p>
                        </div>
                      )}
                    </CardHeader>
                    <CardFooter>
                      <Button 
                        className="w-full"
                        onClick={() => handleAddToCart(denomination.value)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandDetails;
