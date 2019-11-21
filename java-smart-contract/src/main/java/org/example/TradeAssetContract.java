/*
 * SPDX-License-Identifier: Apache-2.0
 */
package org.example;

import org.hyperledger.fabric.contract.Context;
import org.hyperledger.fabric.contract.ContractInterface;
import org.hyperledger.fabric.contract.annotation.Contract;
import org.hyperledger.fabric.contract.annotation.Default;
import org.hyperledger.fabric.contract.annotation.Transaction;
import org.hyperledger.fabric.contract.annotation.Contact;
import org.hyperledger.fabric.contract.annotation.Info;
import org.hyperledger.fabric.contract.annotation.License;
import static java.nio.charset.StandardCharsets.UTF_8;

@Contract(name = "TradeAssetContract",
    info = @Info(title = "TradeAsset contract",
                description = "My Smart Contract",
                version = "0.0.1",
                license =
                        @License(name = "Apache-2.0",
                                url = ""),
                                contact =  @Contact(email = "java-smart-contract@example.com",
                                                name = "java-smart-contract",
                                                url = "http://java-smart-contract.me")))
@Default
public class TradeAssetContract implements ContractInterface {
    public  TradeAssetContract() {

    }
    @Transaction()
    public boolean tradeAssetExists(Context ctx, String tradeAssetId) {
        byte[] buffer = ctx.getStub().getState(tradeAssetId);
        return (buffer != null && buffer.length > 0);
    }

    @Transaction()
    public void createTradeAsset(Context ctx, String tradeAssetId, String value) {
        boolean exists = tradeAssetExists(ctx,tradeAssetId);
        if (exists) {
            throw new RuntimeException("The asset "+tradeAssetId+" already exists");
        }
        TradeAsset asset = new TradeAsset();
        asset.setValue(value);
        ctx.getStub().putState(tradeAssetId, asset.toJSONString().getBytes(UTF_8));
    }

    @Transaction()
    public TradeAsset readTradeAsset(Context ctx, String tradeAssetId) {
        boolean exists = tradeAssetExists(ctx,tradeAssetId);
        if (!exists) {
            throw new RuntimeException("The asset "+tradeAssetId+" does not exist");
        }

        TradeAsset newAsset = TradeAsset.fromJSONString(new String(ctx.getStub().getState(tradeAssetId),UTF_8));
        return newAsset;
    }

    @Transaction()
    public void updateTradeAsset(Context ctx, String tradeAssetId, String newValue) {
        boolean exists = tradeAssetExists(ctx,tradeAssetId);
        if (!exists) {
            throw new RuntimeException("The asset "+tradeAssetId+" does not exist");
        }
        TradeAsset asset = new TradeAsset();
        asset.setValue(newValue);

        ctx.getStub().putState(tradeAssetId, asset.toJSONString().getBytes(UTF_8));
    }

    @Transaction()
    public void deleteTradeAsset(Context ctx, String tradeAssetId) {
        boolean exists = tradeAssetExists(ctx,tradeAssetId);
        if (!exists) {
            throw new RuntimeException("The asset "+tradeAssetId+" does not exist");
        }
        ctx.getStub().delState(tradeAssetId);
    }

}
