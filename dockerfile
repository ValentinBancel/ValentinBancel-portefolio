FROM node:18.17.1

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

# Expose port
EXPOSE 8080

# Start app
CMD ["node", "server.js"]