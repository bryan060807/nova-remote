# Dockerfile - Nova Remote Frontend (Client)

FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the production-ready frontend
RUN npm run build

# Serve the app using a lightweight static server
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose frontend port
EXPOSE 5173

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
