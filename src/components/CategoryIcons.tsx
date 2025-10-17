import { Sparkles, ShoppingBag, Plane, Globe, Gamepad2, Shirt, Gem, Ticket, Footprints } from "lucide-react";
import { Card } from "@/components/ui/card";

const categories = [
  { icon: Sparkles, label: "Wellness & Beauty", category: "Wellness & Beauty" },
  { icon: ShoppingBag, label: "Food & Beverages", category: "Food & Beverages" },
  { icon: Plane, label: "Tour & Travel", category: "Tour & Travel" },
  { icon: Globe, label: "E-Commerce", category: "E-Commerce" },
  { icon: Gamepad2, label: "Gaming", category: "Gaming" },
  { icon: Shirt, label: "Fashion & Lifestyle", category: "Fashion & Lifestyle" },
  { icon: Gem, label: "Jewellery", category: "Jewellery" },
  { icon: Ticket, label: "Entertainment", category: "Entertainment" },
  { icon: Footprints, label: "Sports & Footwears", category: "Sports & Footwears" }
];

interface CategoryIconsProps {
  onCategoryClick: (category: string) => void;
  selectedCategory?: string;
}

export const CategoryIcons = ({ onCategoryClick, selectedCategory }: CategoryIconsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {categories.map((category) => (
        <Card
          key={category.label}
          className={`p-6 hover:shadow-lg transition-all cursor-pointer group ${
            selectedCategory === category.category
              ? "border-primary bg-primary/5"
              : "hover:border-primary"
          }`}
          onClick={() => onCategoryClick(category.category)}
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <category.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
            <p className="font-medium text-sm">{category.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CategoryIcons;
