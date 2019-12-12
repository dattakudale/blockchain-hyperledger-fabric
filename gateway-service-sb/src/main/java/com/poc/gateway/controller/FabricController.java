package com.poc.gateway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;

import com.poc.gateway.dto.request.TradeAssetRequestDTO;
import com.poc.gateway.dto.response.TradeAssetResponseDTO;
import com.poc.gateway.dto.response.TradeAssetsResponseDTO;
import com.poc.gateway.service.ITradeService;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.RequestMethod;

@Api
@RestController
public class FabricController {

    @Autowired
    private ITradeService tradeService;

    @RequestMapping(value = "/createTrade", method = RequestMethod.POST)
    public @ResponseBody String createTrade(@RequestBody TradeAssetRequestDTO asset) throws Exception {
        boolean success = tradeService.createTradeTsAsset(asset);

        return "" + success;
    }

    @RequestMapping(value = "/getTradeDetail/{id}", method = RequestMethod.GET)
    public @ResponseBody TradeAssetResponseDTO getTradeDetail(@PathVariable(value = "id") BigInteger tradeId) throws Exception {
        return tradeService.readTradeTsAsset(tradeId);
    }

    @RequestMapping(value = "/deleteTrade/{id}", method = RequestMethod.GET)
    public @ResponseBody String deleteTrade(@PathVariable(value = "id") BigInteger tradeId) throws Exception {
        return "" + tradeService.deleteTradeTsAsset(tradeId);
    }

    @RequestMapping(value = "/readAllTrades", method = RequestMethod.GET)
    public @ResponseBody TradeAssetsResponseDTO readAllTradeTsAsset() throws Exception {
        return tradeService.readAllTradeTsAsset();
    }

}