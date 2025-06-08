FROM node:18-alpine

# Install dependencies needed for sharp and other native modules
RUN apk add --no-cache \
    libstdc++ \
    libc6-compat \
    vips-dev \
    python3 \
    make \
    g++

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm install --platform=linux --arch=x64

# Copy source code
COPY . .

# Copy payload config to root (required for build)
COPY src/payload.config.js ./payload.config.js

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "serve"] 