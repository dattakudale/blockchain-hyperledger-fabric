package com.poc.gateway.service.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import com.poc.gateway.dto.request.TradeAssetRequestDTO;
import com.poc.gateway.dto.response.TradeAssetResponseDTO;
import com.poc.gateway.dto.response.TradeAssetsResponseDTO;
import com.poc.gateway.service.IFabricService;
import com.poc.gateway.service.ITradeService;
import com.poc.gateway.service.model.TradeAsset;
import com.poc.gateway.service.model.TradeAssetObj;
import com.poc.gateway.service.model.TradeAssets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TradeServiceImpl implements ITradeService {

    private long tradeId=1;

    @Autowired
    private IFabricService fabricService;

    @Override
    public boolean createTradeTsAsset(TradeAssetRequestDTO tradeAssetRequestDTO) throws Exception {

        TradeAsset tradeAsset = new TradeAsset();
        tradeAsset.setTradeId(tradeAssetRequestDTO.getTradeId());
        tradeAsset.setAccount(tradeAssetRequestDTO.getAccount());
        tradeAsset.setExchange(tradeAssetRequestDTO.getExchange());
        tradeAsset.setContract(tradeAssetRequestDTO.getContract());
        tradeAsset.setPutCall(tradeAssetRequestDTO.getPutCall());
        tradeAsset.setMonth(tradeAssetRequestDTO.getMonth());
        tradeAsset.setYear(tradeAssetRequestDTO.getYear());
        tradeAsset.setStrike(tradeAssetRequestDTO.getStrike());
        tradeAsset.setQuantity(tradeAssetRequestDTO.getQuantity());
        tradeAsset.setBuySell(tradeAssetRequestDTO.getBuySell());
        tradeAsset.setTradeDescription(tradeAssetRequestDTO.getTradeDescription());

        if( tradeAsset.getTradeId() == null){
            tradeAsset.setTradeId(BigInteger.valueOf(tradeId++));
            return fabricService.createTradeTsAsset(tradeAsset);
        }else{
            return fabricService.updateTradeTsAsset(tradeAsset);
        }

    }

    @Override
    public TradeAssetResponseDTO readTradeTsAsset(BigInteger tradeId) throws Exception {

        TradeAssetResponseDTO responseDTO = new TradeAssetResponseDTO();

        TradeAsset tradeAsset = fabricService.readTradeTsAsset(tradeId);

        responseDTO.setTradeId(tradeAsset.getTradeId());
        responseDTO.setAccount(tradeAsset.getAccount());
        responseDTO.setExchange(tradeAsset.getExchange());
        responseDTO.setContract(tradeAsset.getContract());
        responseDTO.setPutCall(tradeAsset.getPutCall());
        responseDTO.setMonth(tradeAsset.getMonth());
        responseDTO.setYear(tradeAsset.getYear());
        responseDTO.setStrike(tradeAsset.getStrike());
        responseDTO.setQuantity(tradeAsset.getQuantity());
        responseDTO.setBuySell(tradeAsset.getBuySell());
        responseDTO.setTradeDescription(tradeAsset.getTradeDescription());

        return responseDTO;
    }

    @Override
    public boolean deleteTradeTsAsset(BigInteger tradeId) throws Exception {

        return fabricService.deleteTradeTsAsset(tradeId);

    }

    @Override
    public TradeAssetsResponseDTO readAllTradeTsAsset() throws Exception {

        TradeAssetsResponseDTO tradeResponseDTO = new TradeAssetsResponseDTO();
        List<TradeAssetResponseDTO> tradeAssets = new ArrayList<>();

        TradeAssets tradeList = fabricService.readAllTradeTsAsset();

        for (TradeAssetObj obj : tradeList.getList()) {

            if (obj != null && obj.getRecord() != null) {
                TradeAssetResponseDTO responseDTO = new TradeAssetResponseDTO();
                responseDTO.setTradeId(BigInteger.valueOf(Long.valueOf(obj.getKey())));
                responseDTO.setAccount(obj.getRecord().getAccount());
                responseDTO.setExchange(obj.getRecord().getExchange());
                responseDTO.setContract(obj.getRecord().getContract());
                responseDTO.setPutCall(obj.getRecord().getPutCall());
                responseDTO.setMonth(obj.getRecord().getMonth());
                responseDTO.setYear(obj.getRecord().getYear());
                responseDTO.setStrike(obj.getRecord().getStrike());
                responseDTO.setQuantity(obj.getRecord().getQuantity());
                responseDTO.setBuySell(obj.getRecord().getBuySell());
                responseDTO.setTradeDescription(obj.getRecord().getTradeDescription());

                tradeAssets.add(responseDTO);
            }
        }

        tradeResponseDTO.setTradeAssets(tradeAssets);

        return tradeResponseDTO;
    }

}