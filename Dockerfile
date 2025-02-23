# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy everything except flag.txt
COPY . /app
RUN rm -f /app/flag.txt

# Copy flag.txt separately to /etc
COPY flag.txt /etc/flag.txt

# Install dependencies
RUN npm install

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
