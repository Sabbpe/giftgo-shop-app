import { Sparkles, ShoppingBag, Plane, Globe, Gamepad2, Shirt, Gem, Ticket, Footprints } from "lucide-react";
import { Card } from "@/components/ui/card";

const categories = [
  { icon: Sparkles, label: "Wellness & Beauty", category: "Wellness & Beauty", gradient: "wellness" },
  { icon: ShoppingBag, label: "Food & Beverages", category: "Food & Beverages", gradient: "food" },
  { icon: Plane, label: "Tour & Travel", category: "Tour & Travel", gradient: "travel" },
  { icon: Globe, label: "E-Commerce", category: "E-Commerce", gradient: "ecommerce" },
  { icon: Gamepad2, label: "Gaming", category: "Gaming", gradient: "gaming" },
  { icon: Shirt, label: "Fashion & Lifestyle", category: "Fashion & Lifestyle", gradient: "fashion" },
  { icon: Gem, label: "Jewellery", category: "Jewellery", gradient: "jewellery" },
  { icon: Ticket, label: "Entertainment", category: "Entertainment", gradient: "entertainment" },
  { icon: Footprints, label: "Sports & Footwears", category: "Sports & Footwears", gradient: "sports" }
];

interface CategoryIconsProps {
  onCategoryClick: (category: string) => void;
  selectedCategory?: string;
}

export const CategoryIcons = ({ onCategoryClick, selectedCategory }: CategoryIconsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
      {categories.map((category) => (
        <div
          key={category.label}
          className={`relative group cursor-pointer transition-all duration-500 ${
            selectedCategory === category.category ? "scale-110" : "hover:scale-105"
          }`}
          onClick={() => onCategoryClick(category.category)}
        >
          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 blur-2xl"
            style={{ 
              background: `var(--gradient-${category.gradient})`,
            }}
          />
          
          {/* Main card with gradient background */}
          <Card
            className={`relative overflow-hidden border-none transition-all duration-500 shadow-lg group-hover:shadow-2xl ${
              selectedCategory === category.category ? "ring-4 ring-white/50" : ""
            }`}
            style={{
              background: `var(--gradient-${category.gradient})`
            }}
          >
            {/* Animated shine overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            <div className="relative p-8 flex flex-col items-center text-center space-y-3">
              {/* Icon container with glassmorphism */}
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 transition-all duration-500 group-hover:bg-white/30 group-hover:scale-110 group-hover:rotate-6">
                <category.icon 
                  className="h-10 w-10 text-white transition-all duration-500 group-hover:scale-110" 
                />
              </div>
              
              {/* Label */}
              <p className="font-bold text-sm text-white transition-all duration-500 group-hover:scale-105 drop-shadow-md">
                {category.label}
              </p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CategoryIcons;
