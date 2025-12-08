# PayFlow - Stripe Payment Demo

## Overview
A simple payment application that integrates with Stripe to process payments. Features a clean, modern landing page with a prominent payment button that redirects users to Stripe's hosted checkout.

## Architecture

### Frontend (React + Vite)
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Routing**: Wouter for lightweight client-side routing
- **Animation**: Framer Motion for micro-interactions

### Backend (Express)
- **Server**: Express.js running on port 5000
- **API**: Single endpoint `/api/create-checkout-session` for Stripe integration

### Stripe Integration
- **Note**: User chose not to use the Replit Stripe connector. The `STRIPE_SECRET_KEY` secret must be manually configured.
- The app uses Stripe Checkout Sessions for secure payment processing
- All payment handling happens on Stripe's servers

## Key Files
- `client/src/pages/home.tsx` - Landing page with payment button
- `client/src/pages/success.tsx` - Payment success confirmation
- `client/src/pages/cancel.tsx` - Payment cancelled page
- `server/routes.ts` - Backend API routes including Stripe integration

## Environment Variables
- `STRIPE_SECRET_KEY` (required) - Stripe secret API key (starts with `sk_test_` or `sk_live_`)

## Design System
- **Primary Color**: Stripe Blurple (HSL 243 75% 59%)
- **Typography**: Space Grotesk (display) + Inter (body)
- **Payment Amount**: $20.00 USD for Premium Subscription

## Running the App
The app runs with `npm run dev` which starts the Express server with Vite middleware for hot-reloading during development.
