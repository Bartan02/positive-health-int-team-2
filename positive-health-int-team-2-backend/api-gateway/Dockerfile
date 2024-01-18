FROM node:21.2.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Adjust the path to where package.json is located
COPY code/package*.json ./
RUN npm install

# Bundle app source
# Adjust the path to where your source code is located
COPY code/ . 

# Your application listens on a port (e.g., 3015). Expose it.
EXPOSE 3025

# Start your app
CMD ["node", "start.js"]