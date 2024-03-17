FROM node:latest as pm-playground

LABEL version="1.0"

COPY . /app

WORKDIR "/app"

RUN ["/bin/sh", "-c", "ulimit", "-n", "2024"]
RUN ["npm", "install"]

COPY [".", "./"]

EXPOSE 3000
ENV NODE_OPTIONS=--openssl-legacy-provider

CMD ["npm", "start"]
