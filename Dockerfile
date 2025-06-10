# Use the Node.js 18 image
FROM node:18

# Create and set working directory
WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy dependency files first (for Docker cache efficiency)
COPY package*.json ./


RUN npm install --production

# Copy the rest of the source code
COPY . .

# Expose the port your app runs on
EXPOSE 5003

# Use pm2-runtime to start the app
CMD ["pm2-runtime", "src/index.js"]