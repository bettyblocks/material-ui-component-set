VERSION 0.6
FROM oven/bun:1
WORKDIR /build

build:
    COPY . /build
    RUN bun install
    RUN bun build
    SAVE ARTIFACT /build/ .

docker:
    COPY +build/build .
    EXPOSE 5002
    ENTRYPOINT ["bun", "start-docker"]
    SAVE IMAGE component-set:latest