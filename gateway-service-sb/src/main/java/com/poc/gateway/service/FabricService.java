package com.poc.gateway.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.TimeoutException;

import javax.annotation.PostConstruct;

import org.hyperledger.fabric.gateway.Contract;
import org.hyperledger.fabric.gateway.ContractException;
import org.hyperledger.fabric.gateway.Gateway;
import org.hyperledger.fabric.gateway.Network;
import org.hyperledger.fabric.gateway.Wallet;
import org.springframework.stereotype.Component;

@Component
public class FabricService {

	private Gateway.Builder builder;

	@PostConstruct
	public void setupConnection() {

		// Load an existing wallet holding identities used to access the network.
		Path walletDirectory = Paths.get("/local_fabric_wallet");
		Wallet wallet;
		
		try {
			wallet = Wallet.createFileSystemWallet(walletDirectory);

			System.out.println(wallet.toString());
			// Path to a common connection profile describing the network.

			Path networkConfigFile = Paths.get("/local_fabric_wallet/local_fabric_connection.json");

			// Configure the gateway connection used to access the network.
			builder = Gateway.createBuilder().identity(wallet, "admin").networkConfig(networkConfigFile);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String createTradeTsAsset(String asset , String value) throws Exception {

		String output = null;
		// Create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// Obtain a smart contract deployed on the network.
			Network network = gateway.getNetwork("mychannel");

			Contract contract = network.getContract("ts-smart-contract");

			// Submit transactions that store state to the ledger.
			byte[] createCarResult = contract.submitTransaction("createTradeTsAsset", asset, value);
			output = new String(createCarResult, StandardCharsets.UTF_8);
			System.out.println("createTradeTsAsset completed : " + output);

		} catch (ContractException | TimeoutException e) {
			e.printStackTrace();
		}

		return output;
	}

	public String readTradeTsAsset(String asset) throws Exception {

		String output = null;

		// Create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// Obtain a smart contract deployed on the network.
			Network network = gateway.getNetwork("mychannel");

			Contract contract = network.getContract("ts-smart-contract");

			// Evaluate transactions that query state from the ledger.
			byte[] queryAllCarsResult = contract.evaluateTransaction("readTradeTsAsset", asset);
			output = new String(queryAllCarsResult, StandardCharsets.UTF_8);
			System.out.println("readTradeTsAsset completed : " + output);

		} catch (ContractException e) {
			e.printStackTrace();
		}

		return output;
	}

}