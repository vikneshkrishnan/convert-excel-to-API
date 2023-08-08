# Use an official Node.js runtime as the parent image
FROM node:16-alpine


# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Specify the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "server.js"]
