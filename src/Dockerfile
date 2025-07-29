# syntax=docker/dockerfile:1

# --- Build Stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first (for better caching)
COPY --link package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy the rest of the app
COPY --link . .

# Build the app (if using a build step, e.g., Vite, React, etc.)
# If this is a Vite/CRA/Next.js static build, uncomment the next line:
# RUN npm run build

# --- Production Stage ---
FROM node:20-alpine AS final
WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only necessary files from build stage
COPY --from=build /app .

USER appuser

# Expose the port your app runs on (default for Vite/CRA is 5173/3000)
EXPOSE 3000

# Start the app (adjust if you use a different start command)
CMD ["npm", "start"]
