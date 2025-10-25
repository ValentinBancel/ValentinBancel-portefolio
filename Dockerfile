# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Enable corepack for yarn
RUN corepack enable

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Enable corepack for yarn
RUN corepack enable

# Copy package files for production dependencies
COPY package.json ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 4000

# Set environment variable for production
ENV NODE_ENV=production
ENV PORT=4000

# Start the server
CMD ["node", "dist/webapp/server/server.mjs"]
