export class Underlying {
    closePrice: number;     // the last closing price of the underlying
    currency: string;       // Specifies the currency.
    exchange: string;       // The order destination, such as Smart, CBOE etc.
    lastPrice: number;      // the last price of the underlying
    localSymbol: string; 		// This is the local exchange symbol of the underlying asset.
    primaryExch: string; 		// Identifies the listing exchange for the contract (do not list SMART).
    secType: string;        // This is the security type. Valid values are: STK,OPT,FUT,IND,FOP,CASH,BAG,NEWS
    symbol: string;         // This is the symbol of the underlying asset.

    constructor(theSymbol: string) {
        this.currency = 'USD';
        this.exchange = 'CBOE';
        this.localSymbol =  theSymbol;
        this.primaryExch = 'CBOE' ;
        this.secType = 'IND' ;
        this.symbol = theSymbol ;
    }
}
