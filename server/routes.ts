import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";
import { PRICE_IN_CENT, PRODUCT_NAME } from "../shared/variables";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(500).json({
          error: "Stripe is not configured. Please add your STRIPE_SECRET_KEY.",
        });
      }

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: PRICE_IN_CENT,
              product_data: { name: PRODUCT_NAME },
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin || "http://localhost:5000"}/success`,
        cancel_url: `${req.headers.origin || "http://localhost:5000"}/cancel`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  return httpServer;
}
