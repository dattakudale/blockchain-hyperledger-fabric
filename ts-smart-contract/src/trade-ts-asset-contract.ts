/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { TradeTsAsset } from './trade-ts-asset';

@Info({ title: 'TradeTsAssetContract', description: 'Trade Smart Contract' })
export class TradeTsAssetContract extends Contract {

    @Transaction(false)
    @Returns('boolean')
    public async tradeTsAssetExists(ctx: Context, tradeTsAssetId: string): Promise<boolean> {
        const buffer = await ctx.stub.getState(tradeTsAssetId);
        return (!!buffer && buffer.length > 0);
    }

    @Transaction()
    public async createTradeTsAsset(ctx: Context, tradeTsAssetId: string, tradeJson: string): Promise<void> {
        const exists = await this.tradeTsAssetExists(ctx, tradeTsAssetId);
        if (exists) {
            throw new Error(`The trade ts asset ${tradeTsAssetId} already exists`);
        }

        const buffer = Buffer.from(JSON.stringify(tradeJson));
        await ctx.stub.putState(tradeTsAssetId, buffer);
    }

    @Transaction(false)
    @Returns('TradeTsAsset')
    public async readTradeTsAsset(ctx: Context, tradeTsAssetId: string): Promise<TradeTsAsset> {
        const exists = await this.tradeTsAssetExists(ctx, tradeTsAssetId);
        if (!exists) {
            throw new Error(`The trade ts asset ${tradeTsAssetId} does not exist`);
        }
        const buffer = await ctx.stub.getState(tradeTsAssetId);
        const tradeTsAsset = JSON.parse(buffer.toString()) as TradeTsAsset;
        return tradeTsAsset;
    }

    @Transaction(false)
    @Returns('TradeTsAsset[]')
    public async readAllTradeTsAsset(ctx: Context): Promise<TradeTsAsset[]> {
        const allResults = [];

        const queryString = {
            selector: {},
        };

        const resultsIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));

        while (true) {

            const res = await resultsIterator.next();
            if (res.value && res.value.value.toString()) {

                const strValue = res.value.value.toString('utf8');

                console.info('TradeTsAsset Key :' + res.value.key);
                console.log('TradeTsAsset Value :' + strValue);

                let tradeTsAsset;
                try {
                    tradeTsAsset = JSON.parse(strValue) as TradeTsAsset;
                } catch (err) {
                    console.log(err);
                    tradeTsAsset = strValue;
                }
                console.info('TradeTsAsset :' + tradeTsAsset);
                allResults.push({ Key: res.value.key, Record: tradeTsAsset });
            }

            if (res.done) {
                console.log('end of data');
                await resultsIterator.close();
                console.info('TradeTsAsset list : ' + allResults);
                return allResults;
            }
        }

        console.info('TradeTsAsset list : ' + allResults);
        return allResults;
    }

    @Transaction()
    public async updateTradeTsAsset(ctx: Context, tradeTsAssetId: string, tradeJson: string): Promise<void> {
        const exists = await this.tradeTsAssetExists(ctx, tradeTsAssetId);
        if (!exists) {
            throw new Error(`The trade ts asset ${tradeTsAssetId} does not exist`);
        }

        const tradeTsAsset = JSON.parse(tradeJson) as TradeTsAsset;
        const buffer = Buffer.from(JSON.stringify(tradeTsAsset));
        await ctx.stub.putState(tradeTsAssetId, buffer);
    }

    @Transaction()
    public async deleteTradeTsAsset(ctx: Context, tradeTsAssetId: string): Promise<void> {
        const exists = await this.tradeTsAssetExists(ctx, tradeTsAssetId);
        if (!exists) {
            throw new Error(`The trade ts asset ${tradeTsAssetId} does not exist`);
        }
        await ctx.stub.deleteState(tradeTsAssetId);
    }

}
