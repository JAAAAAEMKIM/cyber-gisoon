FROM node:18-bullseye

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the necessary ports
EXPOSE 3000

# Define the start command
CMD ["npm", "run", "init"]
