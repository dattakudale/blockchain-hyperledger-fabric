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
Angular 8 code 

    ## Build with maven
        cd gateway-ui
        mvn clean install

## Spring Boot Service
Gateway Service in Spring Boot App

    ## Export the Wallet from IBM Blockchain Platform extension
        Open Command Pallete 
        Search for Export Wallet and select the Local Fabric Wallet
        Select the "gateway-service-sb" folder

    ## Build with maven and will copy Angular UI code in Jar file.
        cd gateway-service-sb
        mvn clean install

    ## Docker Build command

        docker build -t java-smart-contract-gateway:v1 .

    ## Run with Docker

        docker run -p 8080:8080 java-smart-contract-gateway:v1

    ## Connect spring boot container to same Fabric network 
    
        docker ps  | grep java-smart-contract-gateway

        docker network list | grep fabric

        docker network connect <fabric NETWORK ID> <Spring Boot CONTAINER ID>

    ## Swagger Document for REST API
        http://localhost:8080/swagger-ui.html

    ## Angular UI 
        http://localhost:8080/gateway-ui/    

