import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import VoucherCard from "@/components/VoucherCard";
import Cart from "@/components/Cart";
import Banner from "@/components/Banner";
import TopFeaturedBrands from "@/components/TopFeaturedBrands";
import DealOfTheDay from "@/components/DealOfTheDay";
import Testimonials from "@/components/Testimonials";
import FilterSort, { FilterOptions } from "@/components/FilterSort";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useBrands, useCategories } from "@/hooks/useBrands";
import { CartItem } from "@/types/cart";

interface IndexProps {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

const Index = ({ cartItems, setCartItems }: IndexProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("store");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: "all",
    availability: [],
    categories: [],
    minDiscount: 0,
  });
  const [sortBy, setSortBy] = useState("popularity");
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: brands = [], isLoading: brandsLoading } = useBrands();
  const { data: categories = [] } = useCategories();

  const filteredAndSortedBrands = useMemo(() => {
    let filtered = [...brands];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(b => {
        const category = categories.find(c => c.id === b.category_id);
        return category?.name === selectedCategory;
      });
    }

    // Apply filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(b => {
        const category = categories.find(c => c.id === b.category_id);
        return category && filters.categories.includes(category.name);
      });
    }

    if (filters.minDiscount > 0) {
      filtered = filtered.filter(b => b.discount_percentage >= filters.minDiscount);
    }

    // Sort
    switch (sortBy) {
      case "discount-high":
        filtered.sort((a, b) => (b.discount_percentage || 0) - (a.discount_percentage || 0));
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // popularity/featured - sort featured first
        filtered.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [brands, categories, selectedCategory, searchQuery, filters, sortBy]);

  const featuredBrands = useMemo(() => 
    brands.filter(b => b.is_featured).slice(0, 6),
    [brands]
  );

  const handleAddToCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
    toast({
      title: "Added to cart",
      description: `${item.brandName} voucher has been added to your cart.`,
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleBrandClick = (slug: string) => {
    navigate(`/brand/${slug}`);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  const availableCategories = categories.map(c => c.name);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        onCategoryClick={(categoryId) => {
          const category = categories.find(c => c.id === categoryId);
          if (category) {
            handleCategoryClick(category.name);
          }
        }}
      />
      
      <main className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="mb-8 w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger value="store" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Store
            </TabsTrigger>
            <TabsTrigger value="whats-hot" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              What's Hot
            </TabsTrigger>
          </TabsList>

          <TabsContent value="store" className="mt-0">
            <Banner />
            
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for brands, categories..."
                className="pl-12 h-14 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DealOfTheDay 
              brands={featuredBrands} 
              categories={categories}
              onBrandClick={handleBrandClick} 
            />

            <div className="mb-8">
              <TopFeaturedBrands onBrandClick={handleBrandClick} />
            </div>
          </TabsContent>

          <TabsContent value="whats-hot" className="mt-0">
            <Banner />
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">What's Hot 🔥</h2>
              <p className="text-muted-foreground mb-6">Top trending gift cards with the best discounts</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Persistent Filter Sidebar and Content Grid */}
        <div className="flex gap-6">
          <aside className="w-64 shrink-0 sticky top-24 self-start">
            <FilterSort 
              onFilterChange={setFilters}
              onSortChange={setSortBy}
              categories={availableCategories}
            />
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {activeTab === "whats-hot" ? "Trending Brands" : selectedCategory || "All Brands"}
              </h2>
              <p className="text-muted-foreground">
                {activeTab === "whats-hot" 
                  ? `${brands.filter(b => b.discount_percentage >= 10).length} brands`
                  : `${filteredAndSortedBrands.length} brands`
                }
              </p>
            </div>

            {brandsLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading brands...</p>
              </div>
            ) : activeTab === "whats-hot" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brands
                  .filter(b => b.discount_percentage >= filters.minDiscount)
                  .filter(b => filters.categories.length === 0 || filters.categories.includes(categories.find(c => c.id === b.category_id)?.name || ''))
                  .sort((a, b) => {
                    switch (sortBy) {
                      case "discount-high":
                        return (b.discount_percentage || 0) - (a.discount_percentage || 0);
                      case "name-asc":
                        return a.name.localeCompare(b.name);
                      case "name-desc":
                        return b.name.localeCompare(a.name);
                      default:
                        return (b.discount_percentage || 0) - (a.discount_percentage || 0);
                    }
                  })
                  .slice(0, 12)
                  .map((brand) => {
                    const category = categories.find(c => c.id === brand.category_id);
                    return (
                      <VoucherCard 
                        key={brand.id} 
                        brand={brand}
                        category={category}
                        onAddToCart={handleAddToCart}
                        onClick={() => handleBrandClick(brand.slug)}
                      />
                    );
                  })}
              </div>
            ) : filteredAndSortedBrands.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No brands found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedBrands.map((brand) => {
                  const category = categories.find(c => c.id === brand.category_id);
                  return (
                    <VoucherCard 
                      key={brand.id} 
                      brand={brand}
                      category={category}
                      onAddToCart={handleAddToCart}
                      onClick={() => handleBrandClick(brand.slug)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <Testimonials />
        </div>
      </main>

      <Cart 
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default Index;
