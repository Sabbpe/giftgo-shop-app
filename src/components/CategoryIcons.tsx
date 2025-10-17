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
          className={`relative group cursor-pointer transition-all duration-300 ${
            selectedCategory === category.category ? "scale-105" : "hover:scale-105"
          }`}
          onClick={() => onCategoryClick(category.category)}
        >
          <div 
            className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}
            style={{ 
              background: `var(--gradient-${category.gradient})`,
              boxShadow: `var(--shadow-glow) ${category.gradient === 'wellness' ? 'hsl(330 80% 65% / 0.5)' : 
                          category.gradient === 'food' ? 'hsl(25 95% 60% / 0.5)' :
                          category.gradient === 'travel' ? 'hsl(200 90% 60% / 0.5)' :
                          category.gradient === 'ecommerce' ? 'hsl(160 70% 50% / 0.5)' :
                          category.gradient === 'gaming' ? 'hsl(270 80% 60% / 0.5)' :
                          category.gradient === 'fashion' ? 'hsl(340 85% 60% / 0.5)' :
                          category.gradient === 'jewellery' ? 'hsl(50 85% 60% / 0.5)' :
                          category.gradient === 'entertainment' ? 'hsl(310 80% 60% / 0.5)' :
                          'hsl(120 70% 50% / 0.5)'}`
            }}
          />
          <Card
            className={`relative overflow-hidden border-2 transition-all duration-300 ${
              selectedCategory === category.category
                ? "border-transparent shadow-2xl"
                : "border-border/50 hover:border-transparent"
            }`}
            style={{
              background: selectedCategory === category.category 
                ? `var(--gradient-${category.gradient})` 
                : undefined
            }}
          >
            <div 
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              style={{ background: `var(--gradient-${category.gradient})` }}
            />
            <div className="relative p-8 flex flex-col items-center text-center space-y-3">
              <div className={`p-4 rounded-full transition-all duration-300 ${
                selectedCategory === category.category 
                  ? "bg-white/20 backdrop-blur-sm" 
                  : "bg-card group-hover:bg-white/20 group-hover:backdrop-blur-sm"
              }`}>
                <category.icon 
                  className={`h-10 w-10 transition-all duration-300 ${
                    selectedCategory === category.category
                      ? "text-white scale-110"
                      : "text-foreground group-hover:text-white group-hover:scale-110"
                  }`} 
                />
              </div>
              <p className={`font-semibold text-sm transition-colors duration-300 ${
                selectedCategory === category.category
                  ? "text-white"
                  : "text-foreground group-hover:text-white"
              }`}>
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
