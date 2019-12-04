## gateway-service-sb
Gateway Service in Spring Boot App

## Farbic Java Gateway 

    https://github.com/hyperledger/fabric-gateway-java


## Build with maven 
    mvn clean install

## Docker command

    docker build -t java-smart-contract-gateway:v1 .

## Run with Docker

    docker run -p 8080:8080 java-smart-contract-gateway:v1


## Connect to same Fabric network and find the container id
    docker ps 

    docker network list

    docker network connect <fabric network> <container id>


## Swagger Document for REST API
    http://localhost:8080/swagger-ui.html

