package com.poc.gateway.service.impl;

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

    @Autowired
    private IFabricService fabricService;

    @Override
    public boolean createTradeTsAsset(TradeAssetRequestDTO tradeAssetRequestDTO) throws Exception {

        TradeAsset tradeAsset = new TradeAsset();
        tradeAsset.setTradeId(tradeAssetRequestDTO.getTradeId());
        tradeAsset.setTradeDescription(tradeAssetRequestDTO.getTradeDescription());
        tradeAsset.setPrice(tradeAssetRequestDTO.getPrice());

        return fabricService.createTradeTsAsset(tradeAsset);
    }

    @Override
    public boolean updateTradeTsAsset(TradeAssetRequestDTO tradeAssetRequestDTO) throws Exception {

        return fabricService.updateTradeTsAsset(tradeAssetRequestDTO.getTradeId(), tradeAssetRequestDTO.getPrice());
    }

    @Override
    public TradeAssetResponseDTO readTradeTsAsset(Long tradeId) throws Exception {

        TradeAssetResponseDTO responseDTO = new TradeAssetResponseDTO();

        TradeAsset tradeAsset = fabricService.readTradeTsAsset(tradeId);

        responseDTO.setTradeId(tradeAsset.getTradeId());
        responseDTO.setTradeDescription(tradeAsset.getTradeDescription());
        responseDTO.setPrice(tradeAsset.getPrice());

        return responseDTO;
    }

    @Override
    public TradeAssetsResponseDTO readAllTradeTsAsset() throws Exception {

        TradeAssetsResponseDTO tradeResponseDTO = new TradeAssetsResponseDTO();
        List<TradeAssetResponseDTO> tradeAssets = new ArrayList<>();

        TradeAssets tradeList = fabricService.readAllTradeTsAsset();

        for (TradeAssetObj obj : tradeList.getList()) {

            if (obj != null && obj.getRecord() != null) {
                TradeAssetResponseDTO responseDTO = new TradeAssetResponseDTO();
                responseDTO.setTradeId(Long.valueOf(obj.getKey()));
                responseDTO.setTradeDescription(obj.getRecord().getTradeDescription());
                responseDTO.setPrice(obj.getRecord().getPrice());

                tradeAssets.add(responseDTO);
            }
        }

        tradeResponseDTO.setTradeAssets(tradeAssets);

        return tradeResponseDTO;
    }

}