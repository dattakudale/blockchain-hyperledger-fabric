package com.poc.gateway.service;

import com.poc.gateway.service.model.TradeAsset;
import com.poc.gateway.service.model.TradeAssets;

public interface IFabricService{

    public boolean createTradeTsAsset(TradeAsset tradeAsset) throws Exception;
    public boolean updateTradeTsAsset(Long tradeId , Double price) throws Exception;
    public TradeAsset readTradeTsAsset(Long tradeId) throws Exception;
    public TradeAssets readAllTradeTsAsset() throws Exception;
}