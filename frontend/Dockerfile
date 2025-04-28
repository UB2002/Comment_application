# frontend/Dockerfile

# Use Node.js base image
FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the app (optional if you want production mode)
RUN npm run build

# Start the app with preview mode
RUN npm install -g serve

# Expose port (default Vite/Serve uses 5173 or 3000)
EXPOSE 3000

# Command to run app
CMD ["serve", "-s", "dist", "-l", "3000"]
