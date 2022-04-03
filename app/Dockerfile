### ------------ Frontend Docker File ------------ ###
# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install  create-react-app --silent
RUN npm install  react-router-dom --silent
RUN npm install -g node-modules
RUN npm i axios
RUN npm i react-html-parser --force
RUN npm i react-alice-carousel
RUN npm i react-chartjs-2
RUN npm install assert --save
RUN npm install buffer --save

# add app
COPY . ./


# start app
CMD ["npm", "start"]