FROM node:20-alpine

WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN npm install

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 