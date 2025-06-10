FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN apk add --no-cache python3 make g++ \
    && npm install -g pnpm \
    && pnpm config set store-dir /usr/src/app/.pnpm-store
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN pnpm build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "--enable-source-maps", "dist/main.js"]
