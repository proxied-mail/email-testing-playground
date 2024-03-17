FROM node:latest

LABEL version="1.0"

COPY . /app

WORKDIR "/app"

RUN ["npm", "install"]

COPY [".", "./"]

EXPOSE 3000
ENV NODE_OPTIONS=--openssl-legacy-provider

CMD ["npm", "start"]
