

export class tradeData {
    tickerID:number;
    symbol: string;         // This is the symbol of the underlying asset.
    secType: string;        // This is the security type. Valid values are: STK,OPT,FUT,IND,FOP,CASH,BAG,NEWS
    exchange: string;       // The order destination, such as Smart, CBOE etc.
    optionExpriy: Date;       // Specifies the currency.
    tradeExecuted: Date;      // the last price of the underlying
}
