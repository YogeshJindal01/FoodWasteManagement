/**
 * Enhanced fetch utility that adds the Railway URL when needed
 * This allows the same components to work both locally and in production
 */

import { apiEndpoint } from '@/lib/apiConfig';

// Custom fetch function that uses the correct API URL
export const fetchWithRailway = async (
  path: string, 
  options?: RequestInit
): Promise<Response> => {
  const url = apiEndpoint(path);
  return fetch(url, options);
};

// Helper for GET requests
export const fetchGet = async <T = any>(path: string): Promise<T> => {
  const response = await fetchWithRailway(path);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error || response.statusText || 'Failed to fetch data';
    throw new Error(`Failed to fetch from ${path}: ${errorMessage}`);
  }
  return response.json() as Promise<T>;
};

// Helper for POST requests
export const fetchPost = async <T = any>(
  path: string,
  data: any,
  options?: RequestInit
): Promise<T> => {
  const response = await fetchWithRailway(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error || response.statusText || 'Failed to post data';
    throw new Error(`Failed to post to ${path}: ${errorMessage}`);
  }
  
  return response.json() as Promise<T>;
};

// Helper for PATCH requests
export const fetchPatch = async <T = any>(
  path: string,
  data: any,
  options?: RequestInit
): Promise<T> => {
  const response = await fetchWithRailway(path, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error || response.statusText || 'Failed to update data';
    throw new Error(`Failed to update ${path}: ${errorMessage}`);
  }
  
  return response.json() as Promise<T>;
}; 