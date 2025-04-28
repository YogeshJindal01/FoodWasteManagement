import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Railway backend URL from environment variables
const RAILWAY_URL = process.env.NEXT_PUBLIC_RAILWAY_URL || 'https://foodwastemanagement-production.up.railway.app';

// Update NextAuth configuration for Railway
if (process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = RAILWAY_URL;
}

export function auth() {
  return getServerSession(authOptions);
}

export { authOptions }; 