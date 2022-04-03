FROM node:13.12.0-alpine
RUN npm install -g json-server

RUN echo '{ "auth": [{ "id": 1,"name": "admin", "username": "admin","email": "admin@admin.de","password": "admin" }, { "id": 2, "name": "user","username": "user", "email": "user@user.de", "password": "user" },{ "id": 3, "name": "user3", "username": "user3", "email": "user3@user.de", "password": "user3" }, { "id": 4, "name": "user4", "username": "user4","email": "user4@user.de","password": "user4" } ]}' > /tmp/test.json

ENTRYPOINT ["json-server", "--port", "3500", "--host", "0.0.0.0"]

#WORKDIR /data
EXPOSE 3500
CMD ["/tmp/test.json"]
