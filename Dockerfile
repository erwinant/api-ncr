FROM node:10

# Create app directory
WORKDIR C:\Users\erwina\Documents\RnD\Project\Docker

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
#COPY config.json ./config/
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3009
CMD [ "node", "." ]