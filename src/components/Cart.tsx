import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { Voucher } from "./VoucherCard";
import { useNavigate } from "react-router-dom";

interface CartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: Voucher[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const Cart = ({ open, onOpenChange, items, onRemoveItem, onCheckout }: CartProps) => {
  const navigate = useNavigate();
  
  const total = items.reduce((sum, item) => {
    const price = item.discount 
      ? item.value * (1 - item.discount / 100)
      : item.value;
    return sum + price;
  }, 0);

  const handleCheckout = () => {
    onCheckout();
    navigate('/checkout');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Your cart is empty
            </p>
          ) : (
            <>
              {items.map((item) => {
                const price = item.discount 
                  ? item.value * (1 - item.discount / 100)
                  : item.value;
                
                return (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="text-lg font-bold mt-1">${price.toFixed(2)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                className="w-full bg-accent hover:bg-accent/90" 
                size="lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
