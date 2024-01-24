# Stage 1: Build the application
FROM node:18.9.0 as build-stage

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the app
RUN npm run build

# The command to start the application, replace `node build/index.js` with your start command if different
CMD ["node", "build/index.js"]

EXPOSE 3000