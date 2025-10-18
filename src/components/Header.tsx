import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCategories } from "@/hooks/useBrands";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  selectedCategory: string | null;
  onCategoryClick: (categoryId: string) => void;
}

const Header = ({ cartCount, onCartClick, selectedCategory, onCategoryClick }: HeaderProps) => {
  const { data: categories = [] } = useCategories();

  const categoryLabels: Record<string, string> = {
    "Fashion": "Fashion",
    "Food & Beverage": "Food & Beverage",
    "Entertainment": "Entertainment",
    "Travel": "Travel",
    "Electronics": "Electronics",
    "Health & Wellness": "Health & Wellness",
    "Home & Living": "Home & Living",
    "Books & Education": "Books & Education"
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
            <div>
              <h1 className="text-xl font-bold text-foreground">VoucherHub</h1>
              <p className="text-xs text-muted-foreground">Merchant Portal</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge 
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent"
              >
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Category Navigation */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto">
          {Object.entries(categoryLabels).map(([label]) => {
            const category = categories.find(c => c.name === label);
            const isSelected = category && selectedCategory === category.id;
            
            return (
              <Button
                key={label}
                variant={isSelected ? "default" : "ghost"}
                size="sm"
                onClick={() => category && onCategoryClick(category.id)}
                className="whitespace-nowrap"
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
