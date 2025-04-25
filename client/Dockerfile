# ---------- Dependencies Stage ----------
    FROM node:20-alpine AS deps
    WORKDIR /app
    
    # Install pnpm globally
    RUN npm install -g pnpm
    
    # Copy and install dependencies (only what's needed for caching)
    COPY pnpm-lock.yaml package.json ./
    # Use install instead of fetch to ensure dependencies are fetched and installed
    RUN pnpm install --frozen-lockfile  
    
    # ---------- Build Stage ----------
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # Reuse pnpm from deps stage (no need to install again)
    RUN npm install -g pnpm
    COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
    COPY --from=deps /app/package.json ./package.json
    # Ensure node_modules are copied from the deps stage
    COPY --from=deps /app/node_modules ./node_modules  
    
    # Copy the rest of the app (this could change your cache layer)
    COPY . .
    RUN rm -fr .env 
    
    # Run build (no need for offline install if the dependencies were already installed)
    RUN pnpm run build && chmod -R 755 dist
    
    # ---------- Production Stage ----------
    FROM nginx:stable-alpine AS prod
    
    # Copy built static files to nginx directory
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Optional: Replace default NGINX config with a custom one
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    