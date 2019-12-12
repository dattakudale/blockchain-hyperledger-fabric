/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class TradeTsAsset {

    @Property()
    public account: string;

    @Property()
    public exchange: string;

    @Property()
    public contract: string;

    @Property()
    public putCall: string;

    @Property()
    public month: number;

    @Property()
    public year: number;

    @Property()
    public strike: number;

    @Property()
    public quantity: number;

    @Property()
    public buySell: number;

    @Property()
    public tradeDescription: string;

}
