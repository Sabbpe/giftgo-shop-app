import { useState } from "react";
import Header from "@/components/Header";
import VoucherCard, { Voucher } from "@/components/VoucherCard";
import Cart from "@/components/Cart";
import { useToast } from "@/hooks/use-toast";

const VOUCHERS: Voucher[] = [
  { id: "151", title: "@ Home", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7 },
  { id: "153", title: "Aeropostale", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 8 },
  { id: "155", title: "AJIO", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 6.25 },
  { id: "156", title: "Allen Solly", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 3.75 },
  { id: "158", title: "American Eagle", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 3.75 },
  { id: "160", title: "AND India", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
  { id: "161", title: "Anita Dongre", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 9.5 },
  { id: "162", title: "Archies Gallery", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12.5 },
  { id: "163", title: "Armani Exchange-Luxe", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "166", title: "Aurelia", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 10 },
  { id: "167", title: "Auric", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 33 },
  { id: "172", title: "Bata", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12.5 },
  { id: "176", title: "Beyoung", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 23 },
  { id: "179", title: "BIBA", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 8 },
  { id: "184", title: "Blaupunkt", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 11 },
  { id: "186", title: "BlissClub", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 9 },
  { id: "197", title: "Brooks Brothers-Luxe", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "203", title: "Celio", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12.5 },
  { id: "204", title: "Chumbak", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12.5 },
  { id: "207", title: "Cosmopolitan India", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 43 },
  { id: "210", title: "Daily Objects", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 20.5 },
  { id: "211", title: "Decathlon", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 4.5 },
  { id: "218", title: "Dune London-Luxe", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "221", title: "Elleven", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 10 },
  { id: "230", title: "Fancode B2B", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
  { id: "231", title: "Fashion Factory", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 3.5 },
  { id: "232", title: "Fastrack", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 8 },
  { id: "233", title: "Fastrack Bags", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
  { id: "234", title: "Femmella", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 8 },
  { id: "240", title: "Flying Machine", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
  { id: "241", title: "Forever New", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
  { id: "245", title: "Gas-Luxe", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "247", title: "Girias", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 2.25 },
  { id: "250", title: "Global Desi India", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
  { id: "244", title: "G-STAR RAW-Luxe", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "252", title: "HAMLEYS - LUXE", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "253", title: "Hammer", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 23 },
  { id: "254", title: "Health and Glow", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 9 },
  { id: "256", title: "Helios", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 8 },
  { id: "261", title: "HopInTown PLUS 1 Year Lifestyle Membership", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 8 },
  { id: "262", title: "HopInTown PLUS Pack of 2 Lifestyle Membership", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 8 },
  { id: "263", title: "HopInTown PLUS Pack of 3 Lifestyle Membership", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 8 },
  { id: "264", title: "HopInTown PLUS Pack of 5 Lifestyle Membership", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 8 },
  { id: "471", title: "House of Vaaree", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 13 },
  { id: "268", title: "Indian Terrains", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "270", title: "JACK & JONES", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 10 },
  { id: "273", title: "Jockey", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "288", title: "Lee", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
  { id: "289", title: "LENSKART", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "290", title: "Levi's", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 9 },
  { id: "291", title: "Lifestyle-B2C", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 5 },
  { id: "292", title: "Linen Club", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 9 },
  { id: "295", title: "LOIPL HCs", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 5 },
  { id: "296", title: "LOIPL Lifestyles", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 5 },
  { id: "297", title: "LOIPL Maxs", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 9.5 },
  { id: "298", title: "Louis Philippe", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 3.75 },
  { id: "301", title: "Luxe", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "310", title: "Marks & Spencer", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 11 },
  { id: "314", title: "MAX", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 6 },
  { id: "320", title: "Mia By Tanishq", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 3.75 },
  { id: "321", title: "MiniKlub", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "323", title: "MOTHER CARE-Luxe", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12.5 },
  { id: "336", title: "Nykaa Fashion", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 5.5 },
  { id: "337", title: "Nykaa Men", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 5.5 },
  { id: "340", title: "Only", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 11 },
  { id: "344", title: "Pantaloons", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 8 },
  { id: "351", title: "Peter England E-Gift Voucher", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 3.75 },
  { id: "352", title: "Planet Fashion", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 3.75 },
  { id: "355", title: "Polaroid", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 9 },
  { id: "366", title: "Rangoli Sarees", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 6 },
  { id: "367", title: "Ray-Bans", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
  { id: "369", title: "Reliance Digital", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 3.75 },
  { id: "374", title: "Reliance Trends E-Gift Voucher", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 5 },
  { id: "377", title: "Scotch & Soda-Luxe", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "378", title: "Selected Homme", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 10 },
  { id: "382", title: "Simon Carter eGift cards", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 4 },
  { id: "387", title: "Sleepwell", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 20.5 },
  { id: "392", title: "Speedo", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "394", title: "Spencer's Retail", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 4.5 },
  { id: "401", title: "Steve Madde-Luxe", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "403", title: "SUPA B2B", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
  { id: "405", title: "Superdry-Luxe", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "413", title: "Taneira", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
  { id: "416", title: "TATA CLiQ", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
  { id: "419", title: "TCNS Aurelia eGift Cards", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 9.5 },
  { id: "420", title: "TCNS W eGift Cards", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 9.5 },
  { id: "427", title: "The Raymond Shop", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 9 },
  { id: "431", title: "Titan Minimals", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
  { id: "434", title: "Trends Junior E-Gift Voucher", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 4.5 },
  { id: "435", title: "Trends Man E-Gift Voucher", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 4.5 },
  { id: "436", title: "Trends Women E-Gift Voucher", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 4.5 },
  { id: "439", title: "Urban Ladder", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 12 },
  { id: "441", title: "V Mart", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 9.5 },
  { id: "442", title: "Van Heusen", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 3.75 },
  { id: "443", title: "Vero Modas", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 10 },
  { id: "444", title: "Vijay Sales", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 2.5 },
  { id: "445", title: "W", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 10 },
  { id: "446", title: "Wakefit", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 3.75 },
  { id: "454", title: "Westside-B2C", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 9 },
  { id: "455", title: "Wildcraft", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 8 },
  { id: "456", title: "William Penn", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 6.5 },
  { id: "459", title: "WOT B2C", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
  { id: "460", title: "Wrangler", value: 100, description: "Fashion & Lifestyle", category: "Fashion & Lifestyle", discount: 7.5 },
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
