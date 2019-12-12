package com.poc.gateway.service;

import java.math.BigInteger;

import com.poc.gateway.service.model.TradeAsset;
import com.poc.gateway.service.model.TradeAssets;

public interface IFabricService{

    public boolean createTradeTsAsset(TradeAsset tradeAsset) throws Exception;
    public boolean updateTradeTsAsset(TradeAsset tradeAsset) throws Exception;
    public TradeAsset readTradeTsAsset(BigInteger tradeId) throws Exception;
    public boolean deleteTradeTsAsset(BigInteger tradeId) throws Exception;
    public TradeAssets readAllTradeTsAsset() throws Exception;
}