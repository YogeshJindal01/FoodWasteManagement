# Deploying to Railway

This document provides instructions for deploying the Food Waste Reduction application to Railway.

## Prerequisites

- A [Railway](https://railway.app/) account
- Git repository of the project

## Steps for Deployment

### 1. Push your code to a Git repository

Make sure your code is in a Git repository (GitHub, GitLab, etc.) that Railway can access.

### 2. Connect Railway to your repository

1. Log in to your Railway account
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository from the list

### 3. Configure Environment Variables

In your Railway dashboard, go to the project settings and add the following environment variables:

```
# Railway backend URL - currently deployed at
NEXT_PUBLIC_RAILWAY_URL=https://foodwastemanagement-production.up.railway.app

# MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodwastereduction

# NextAuth configuration
NEXTAUTH_URL=https://foodwastemanagement-production.up.railway.app
NEXTAUTH_SECRET=your-secret-key-here
```

### 4. Add a MongoDB database service

1. In your Railway project, click "New Service"
2. Select "Add Database" 
3. Choose "MongoDB"
4. Wait for the database to be provisioned
5. Get the connection string from the Connect tab in the database service
6. Update the `MONGODB_URI` environment variable with this connection string

### 5. Deploy your application

Railway will automatically deploy your application when you push changes to your repository.

### 6. Configure domain (optional)

1. In your Railway project dashboard, go to "Settings"
2. Under "Domains", add a custom domain if needed

## Verifying the Deployment

After deployment:

1. Check the application logs in Railway for any errors
2. Verify that the application is running correctly by accessing the provided URL
3. Test authentication and core functionality

## Troubleshooting

If you encounter issues:

1. Check the Railway logs for error messages
2. Verify that all environment variables are set correctly
3. Make sure your MongoDB instance is running and accessible
4. If using a custom domain, ensure DNS settings are properly configured

## API URLs

The application is configured to automatically use the Railway URL when deployed. The implementation includes:

- `lib/apiConfig.ts` - Contains utilities to generate the correct API URLs
- `components/utils/fetchWithRailway.ts` - Provides fetch wrappers for API calls

When making API calls in components or pages, use these utilities:

```javascript
import { fetchGet, fetchPost, fetchPatch } from '@/components/utils/fetchWithRailway';

// Example GET request
const data = await fetchGet('/api/food');

// Example POST request
const result = await fetchPost('/api/food', { title: 'Food Item', description: 'Description' });

// Example PATCH request
await fetchPatch(`/api/food/${foodId}`, { status: 'completed' });
``` 