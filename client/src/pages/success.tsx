import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "wouter";

export default function Success() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-2 font-display" data-testid="text-success-title">Payment Successful!</h2>
        <p className="text-muted-foreground mb-8">Thank you for your purchase. Your payment has been processed.</p>
        <Link href="/">
          <button className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors" data-testid="button-return-home">
            Return Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
