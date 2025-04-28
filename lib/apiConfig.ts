/**
 * Configuration for API URLs based on the environment
 * This automatically determines whether to use the local or Railway URL
 */

// Railway backend URL from environment variables
const RAILWAY_URL = process.env.NEXT_PUBLIC_RAILWAY_URL || 'https://foodwastemanagement-production.up.railway.app';

// Default to using relative URLs in the browser (client-side)
// This works because Next.js will proxy requests to the API routes
export const getApiUrl = () => {
  // In browser context, use relative URLs (the browser knows the current domain)
  if (typeof window !== 'undefined') {
    return '';
  }
  
  // On server-side in production (Railway), use the Railway URL
  if (process.env.NODE_ENV === 'production') {
    return RAILWAY_URL;
  }
  
  // In development on server-side, use relative URLs
  return '';
};

// Helper function to construct API endpoints
export const apiEndpoint = (path: string) => {
  const baseUrl = getApiUrl();
  // Ensure path starts with a slash
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${formattedPath}`;
}; 