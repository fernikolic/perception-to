FROM node:18-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Expose port (Cloud Run will set PORT dynamically)
EXPOSE 8080

# Start the server
CMD ["npm", "start"] 