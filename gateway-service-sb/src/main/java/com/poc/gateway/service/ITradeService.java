package com.poc.gateway.service;

import java.math.BigInteger;

import com.poc.gateway.dto.request.TradeAssetRequestDTO;
import com.poc.gateway.dto.response.TradeAssetResponseDTO;
import com.poc.gateway.dto.response.TradeAssetsResponseDTO;

public interface ITradeService{
    public boolean createTradeTsAsset(TradeAssetRequestDTO tradeAsset) throws Exception;
    public TradeAssetResponseDTO readTradeTsAsset(BigInteger tradeId) throws Exception;
    public boolean deleteTradeTsAsset(BigInteger tradeId) throws Exception;
    public TradeAssetsResponseDTO readAllTradeTsAsset() throws Exception;
}