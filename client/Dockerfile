# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN mkdir -p /app/node_modules
RUN chown -R node:node /app/node_modules
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

EXPOSE 3000

# start app
CMD ["npm", "start"]