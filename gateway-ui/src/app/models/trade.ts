export class Trade {
   tradeId: number;
   account: string;
   exchange: string;
   contract: string;
   putCall: string;
   month: number;
   year: number;
   strike: number;
   quantity: number;
   buySell: number;
   tradeDescription: string;
}

export class TradeAssets {
  tradeAssets: Trade[];
}
