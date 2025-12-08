import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "wouter";

export default function Cancel() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <X size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-2 font-display" data-testid="text-cancel-title">Payment Cancelled</h2>
        <p className="text-muted-foreground mb-8">Your payment was not completed. No charges were made.</p>
        <Link href="/">
          <button className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors" data-testid="button-try-again">
            Try Again
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
