package com.poc.gateway.service.model;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.poc.gateway.util.JsonUtil;

public class TradeAsset {

    @JsonIgnore
    private BigInteger tradeId;

    private String account;

    private String  exchange;

    private String  contract;

    private String  putCall;

    public Integer month;

    public Integer year;

    public BigDecimal strike;

    private BigInteger quantity;

    private Integer buySell;

    private String  tradeDescription;

    public TradeAsset(){
        super();
    }

    public BigInteger getTradeId() {
        return tradeId;
    }

    public void setTradeId(BigInteger tradeId) {
        this.tradeId = tradeId;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }

    public String getContract() {
        return contract;
    }

    public void setContract(String contract) {
        this.contract = contract;
    }

    public String getPutCall() {
        return putCall;
    }

    public void setPutCall(String putCall) {
        this.putCall = putCall;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public BigDecimal getStrike() {
        return strike;
    }

    public void setStrike(BigDecimal strike) {
        this.strike = strike;
    }

    public BigInteger getQuantity() {
        return quantity;
    }

    public void setQuantity(BigInteger quantity) {
        this.quantity = quantity;
    }

    public Integer getBuySell() {
        return buySell;
    }

    public void setBuySell(Integer buySell) {
        this.buySell = buySell;
    }

    public String getTradeDescription() {
        return tradeDescription;
    }

    public void setTradeDescription(String tradeDescription) {
        this.tradeDescription = tradeDescription;
    }

    @JsonCreator
    public static TradeAsset create(String jsonString) throws JsonParseException, JsonMappingException, IOException {
        return (TradeAsset) JsonUtil.getJsonToObject(jsonString, TradeAsset.class);
    }
}