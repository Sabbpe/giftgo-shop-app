import { Grid3x3, DollarSign, Heart, CreditCard, TrendingDown, Gift } from "lucide-react";
import { Card } from "@/components/ui/card";

const categories = [
  { icon: Grid3x3, label: "All Gift Cards", count: "107" },
  { icon: DollarSign, label: "Up to $5", count: "25" },
  { icon: Heart, label: "Saved", count: "0" },
  { icon: CreditCard, label: "Payment Cards", count: "15" },
  { icon: TrendingDown, label: "Discounted", count: "107" },
  { icon: Gift, label: "Promo Deals", count: "45" }
];

const CategoryIcons = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {categories.map((category) => (
        <Card
          key={category.label}
          className="p-6 hover:shadow-lg transition-all cursor-pointer group hover:border-primary"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <category.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-medium text-sm">{category.label}</p>
              <p className="text-xs text-muted-foreground">{category.count} cards</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CategoryIcons;
