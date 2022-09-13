VERSION 0.6
FROM node:16
WORKDIR /build

build:
    COPY . /build
    RUN yarn
    RUN yarn build
    SAVE ARTIFACT /build/ .

docker:
    COPY +build/build .
    EXPOSE 5002
    ENTRYPOINT ["yarn", "start-docker"]
    SAVE IMAGE component-set:latest