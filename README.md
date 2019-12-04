# blockchain-hyperledger-fabric
Hyperledger Fabric Cloud based project 

## Project details
    * ts-smart-contract 
        Hyperledger Fabric Smart contract in type script
    * gateway-ui
        Angular 8 UI code 
    * gateway-service-sb
        Spring Boot Service with UI code 

## Installation of Smart Contract
    * Install the IBM Blockchain Platform in Visual code
        Search IBM Blockchain Platform extension and install in Visual code
    * Open the below project and package the project 
        ts-smart-contract 
    * Deploy the smart contract in Block Chain platform using Fabric Environments
        Select "Instantiate" in Fabric Environments Extension and select the ts-smart-contract package
        Enter the method "readTradeAsset"
    * Validate the smart contract Fabric Gateway 
        Select Channels -> mychannel -> ts-smart-contract 
        Execute Evaluate Transaction using "readTradeAsset" method

## Gateway UI with Angular 
Build the Angular 8 code with maven
    cd gateway-ui
    mvn clean install

## gateway-service-sb
Gateway Service in Spring Boot App

    ## Build with maven and will copy Angular UI code in Jar file.
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

    ## Angular UI 
        http://localhost:8080/gateway-ui/    

