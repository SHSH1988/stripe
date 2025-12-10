import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CreditCard, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import bgImage from "@assets/generated_images/abstract_modern_fintech_background_with_subtle_gradients_and_geometric_shapes.png";
import { PRICE_IN_CENT } from "../../../shared/variables";

export default function Home() {
  const displayPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(PRICE_IN_CENT / 100);
    
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message || "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={bgImage}
          alt="Background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/50" />
      </div>

      <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="font-display font-bold text-2xl tracking-tight text-foreground flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <CreditCard size={18} />
          </div>
          PayFlow
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Products
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Solutions
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Pricing
          </a>
        </div>
        <button className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
          Sign In
        </button>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold mb-8 border border-border/50">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            New Payment Integration Live
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
            Payments infrastructure <br /> for the internet
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Millions of companies of all sizes use our software and APIs to
            accept payments, send payouts, and manage their businesses online.
          </p>

          <div className="mb-6 inline-flex flex-col items-center">
            <span className="text-sm text-muted-foreground mb-1">
              Amount to pay
            </span>
            <span
              className="font-display text-4xl md:text-5xl font-bold text-primary"
              data-testid="text-payment-amount"
            >
              {displayPrice}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={isLoading}
            data-testid="button-pay-stripe"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Pay with Stripe
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              No card stored
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
