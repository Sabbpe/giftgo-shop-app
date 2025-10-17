import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Voucher } from "./VoucherCard";

interface DealOfTheDayProps {
  vouchers: Voucher[];
  onVoucherClick: (voucher: Voucher) => void;
}

const DealOfTheDay = ({ vouchers, onVoucherClick }: DealOfTheDayProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const topDeals = vouchers.slice(0, 6);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Deal of the Day</h2>
          <p className="text-muted-foreground">Limited time offers - Grab them before they're gone!</p>
        </div>
        <div className="flex items-center gap-2 bg-accent/20 px-6 py-3 rounded-lg">
          <Clock className="h-5 w-5 text-accent" />
          <div className="flex gap-2 font-mono text-2xl font-bold">
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {topDeals.map((voucher) => (
          <Card
            key={voucher.id}
            className="group cursor-pointer hover:shadow-xl transition-all overflow-hidden"
            onClick={() => onVoucherClick(voucher)}
          >
            <CardContent className="p-4">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-3 flex items-center justify-center">
                <div className="text-4xl font-bold text-primary/20">{voucher.title.charAt(0)}</div>
              </div>
              <h3 className="font-semibold text-sm mb-2 truncate">{voucher.title}</h3>
              {voucher.discount && (
                <Badge className="bg-accent text-accent-foreground">
                  {voucher.discount}% OFF
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DealOfTheDay;
