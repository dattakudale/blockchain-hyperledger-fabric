package com.poc.gateway.service.impl;

import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeoutException;

import javax.annotation.PostConstruct;

import com.poc.gateway.service.IFabricService;
import com.poc.gateway.service.model.TradeAsset;
import com.poc.gateway.service.model.TradeAssetObj;
import com.poc.gateway.service.model.TradeAssets;
import com.poc.gateway.util.JsonUtil;

import org.hyperledger.fabric.gateway.Contract;
import org.hyperledger.fabric.gateway.ContractException;
import org.hyperledger.fabric.gateway.Gateway;
import org.hyperledger.fabric.gateway.Network;
import org.hyperledger.fabric.gateway.Wallet;
import org.springframework.stereotype.Component;

@Component
public class FabricServiceImpl implements IFabricService{

	private Gateway.Builder builder;

	private String contractName = "ts-smart-contract";
	private String channelName = "mychannel";

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

	/**
	 * Create new transaction
	 * @param tradeId
	 * @param tradeDescription
	 * @param price
	 * @return
	 * @throws Exception
	 */
	public boolean createTradeTsAsset(TradeAsset tradeAsset) throws Exception {

		boolean success = false;

		String output = null;
		// Create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// Obtain a smart contract deployed on the network.
			Network network = gateway.getNetwork(channelName);

			Contract contract = network.getContract(contractName);

			String tradeJson = JsonUtil.getObjectToJson(tradeAsset);

			System.out.println("createTradeTsAsset tradeJson : " + tradeJson);

			// Submit transactions that store state to the ledger.
			byte[] createCarResult = contract.submitTransaction("createTradeTsAsset", tradeAsset.getTradeId().toString(), tradeJson);
			output = new String(createCarResult, StandardCharsets.UTF_8);
			System.out.println("createTradeTsAsset completed : " + output);

			success = true;

		} catch (ContractException | TimeoutException e) {
			e.printStackTrace();
		}

		return success;
	}

	/**
	 * Update the trasaction
	 * @param tradeId
	 * @param price
	 * @return
	 * @throws Exception
	 */
	public boolean updateTradeTsAsset(TradeAsset tradeAsset) throws Exception {

		boolean success = false;

		String output = null;
		// Create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// Obtain a smart contract deployed on the network.
			Network network = gateway.getNetwork(channelName);

			Contract contract = network.getContract(contractName);

			String tradeJson = JsonUtil.getObjectToJson(tradeAsset);

			// Submit transactions that store state to the ledger.
			byte[] createCarResult = contract.submitTransaction("updateTradeTsAsset", tradeAsset.getTradeId().toString() , tradeJson);
			output = new String(createCarResult, StandardCharsets.UTF_8);
			System.out.println("updateTradeTsAsset completed : " + output);

			success = true;

		} catch (ContractException | TimeoutException e) {
			e.printStackTrace();
		}

		return success;
	}

	/**
	 * Read the trasaction
	 * @param asset
	 * @return
	 * @throws Exception
	 */
	public TradeAsset readTradeTsAsset(BigInteger tradeId) throws Exception {

		TradeAsset tradeAsset = null;

		// Create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// Obtain a smart contract deployed on the network.
			Network network = gateway.getNetwork(channelName);

			Contract contract = network.getContract(contractName);

			// Evaluate transactions that query state from the ledger.
			byte[] queryTradeTsResult = contract.evaluateTransaction("readTradeTsAsset", tradeId.toString());
			String output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
			System.out.println("readTradeTsAsset completed : " + output);

			tradeAsset = (TradeAsset) JsonUtil.getJsonToObject(output, TradeAsset.class);
			if( tradeAsset != null){
				tradeAsset.setTradeId(tradeId);
			}

		} catch (ContractException e) {
			e.printStackTrace();
		}

		return tradeAsset;
	}


		/**
	 * Read the trasaction
	 * @param asset
	 * @return
	 * @throws Exception
	 */
	public boolean deleteTradeTsAsset(BigInteger tradeId) throws Exception {

		boolean success = false;

		// Create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// Obtain a smart contract deployed on the network.
			Network network = gateway.getNetwork(channelName);

			Contract contract = network.getContract(contractName);

			// Evaluate transactions that query state from the ledger.
			byte[] queryTradeTsResult = contract.submitTransaction("deleteTradeTsAsset", tradeId.toString());
			String output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
			System.out.println("deleteTradeTsAsset completed : " + output);

		} catch (ContractException e) {
			e.printStackTrace();
		}

		return success;
	}

	/**
	 * Read all transactions
	 * @return
	 * @throws Exception
	 */
	public TradeAssets readAllTradeTsAsset() throws Exception {

		TradeAssets tradeAssets = new TradeAssets();
		List<TradeAssetObj> list = new ArrayList<>();
		String output = null;

		// Create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// Obtain a smart contract deployed on the network.
			Network network = gateway.getNetwork(channelName);

			Contract contract = network.getContract("ts-smart-contract");

			byte[] queryTradeTsResult = contract.evaluateTransaction("readAllTradeTsAsset");

			output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
			System.out.println("readAllTradeTsAsset completed : " + output);

			TradeAssetObj[] tradeArray = (TradeAssetObj[]) JsonUtil.getJsonToObject(output, TradeAssetObj[].class);

			for(TradeAssetObj obj : tradeArray){
				list.add(obj);
			}
			
			tradeAssets.setList(list);
		}

		return tradeAssets;
	}


	
}