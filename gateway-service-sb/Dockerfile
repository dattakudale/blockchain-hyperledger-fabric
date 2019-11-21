FROM openjdk:8-alpine

RUN apk update && apk add libc6-compat

VOLUME /tmp
COPY local_fabric_wallet /local_fabric_wallet
ADD ./target/gateway-1.0.0.jar app.jar
CMD java -Djava.security.egd=file:/dev/./urandom  -jar /app.jar
EXPOSE 8080  
