package com.poc.gateway.service.model;

import java.util.List;

/**
 * {"Key":"4","Record":{"price":70,"tradeDescription":"USD"}}
 */
public class TradeAssets{

    private List<TradeAssetObj> list;

    public List<TradeAssetObj> getList() {
        return list;
    }

    public void setList(List<TradeAssetObj> list) {
        this.list = list;
    }
}