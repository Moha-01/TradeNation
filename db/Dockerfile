FROM node:13.12.0-alpine
RUN npm install -g json-server
WORKDIR /data
EXPOSE 3500
CMD ["json-server", "./data/db.json", "--port=3500"]
