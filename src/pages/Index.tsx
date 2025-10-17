import { useState } from "react";
import Header from "@/components/Header";
import VoucherCard, { Voucher } from "@/components/VoucherCard";
import Cart from "@/components/Cart";
import { useToast } from "@/hooks/use-toast";

const VOUCHERS: Voucher[] = [
  {
    id: "1",
    title: "$50 Gift Voucher",
    value: 50,
    description: "Perfect for small purchases and gifts",
    category: "Standard",
  },
  {
    id: "2",
    title: "$100 Gift Voucher",
    value: 100,
    description: "Most popular choice for businesses",
    category: "Standard",
    discount: 5,
  },
  {
    id: "3",
    title: "$250 Gift Voucher",
    value: 250,
    description: "Great value for bulk gifting",
    category: "Premium",
    discount: 10,
  },
  {
    id: "4",
    title: "$500 Gift Voucher",
    value: 500,
    description: "Best value for corporate needs",
    category: "Premium",
    discount: 15,
  },
  {
    id: "5",
    title: "$1000 Gift Voucher",
    value: 1000,
    description: "Maximum savings for large orders",
    category: "Enterprise",
    discount: 20,
  },
  {
    id: "6",
    title: "$25 Gift Voucher",
    value: 25,
    description: "Entry-level gift option",
    category: "Standard",
  },
];

interface IndexProps {
  cartItems: Voucher[];
  setCartItems: (items: Voucher[]) => void;
}

const Index = ({ cartItems, setCartItems }: IndexProps) => {
  const [cartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (voucher: Voucher) => {
    setCartItems([...cartItems, voucher]);
    toast({
      title: "Added to cart",
      description: `${voucher.title} has been added to your cart.`,
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} onCartClick={() => setCartOpen(true)} />
      
      <main className="container py-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Purchase Gift Vouchers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of gift vouchers. Perfect for employee rewards, customer appreciation, and promotional campaigns.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VOUCHERS.map((voucher) => (
            <VoucherCard
              key={voucher.id}
              voucher={voucher}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <Cart
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
