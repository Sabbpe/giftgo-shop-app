import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Checkout from "./pages/Checkout";
import BrandDetails from "./pages/BrandDetails";
import NotFound from "./pages/NotFound";
import { CartItem } from "./types/cart";

const queryClient = new QueryClient();

const App = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Index 
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              } 
            />
            <Route 
              path="/brand/:brandSlug" 
              element={
                <BrandDetails 
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  items={cartItems} 
                  onClearCart={() => setCartItems([])} 
                />
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
