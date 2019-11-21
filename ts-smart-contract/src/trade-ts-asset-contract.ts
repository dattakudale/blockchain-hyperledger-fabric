/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { TradeTsAsset } from './trade-ts-asset';

@Info({title: 'TradeTsAssetContract', description: 'My Smart Contract' })
export class TradeTsAssetContract extends Contract {

    @Transaction(false)
    @Returns('boolean')
    public async tradeTsAssetExists(ctx: Context, tradeTsAssetId: string): Promise<boolean> {
        const buffer = await ctx.stub.getState(tradeTsAssetId);
        return (!!buffer && buffer.length > 0);
    }

    @Transaction()
    public async createTradeTsAsset(ctx: Context, tradeTsAssetId: string, value: string): Promise<void> {
        const exists = await this.tradeTsAssetExists(ctx, tradeTsAssetId);
        if (exists) {
            throw new Error(`The trade ts asset ${tradeTsAssetId} already exists`);
        }
        const tradeTsAsset = new TradeTsAsset();
        tradeTsAsset.value = value;
        const buffer = Buffer.from(JSON.stringify(tradeTsAsset));
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

    @Transaction()
    public async updateTradeTsAsset(ctx: Context, tradeTsAssetId: string, newValue: string): Promise<void> {
        const exists = await this.tradeTsAssetExists(ctx, tradeTsAssetId);
        if (!exists) {
            throw new Error(`The trade ts asset ${tradeTsAssetId} does not exist`);
        }
        const tradeTsAsset = new TradeTsAsset();
        tradeTsAsset.value = newValue;
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
