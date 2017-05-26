export class Contract {
    contractID: number;       // The unique contract identifier //tickerId
    currency: string;         // Specifies the currency.
    exchange: string;         // The order destination, such as Smart, CBOE etc.
    expiry: string;           // The expiration date. Use the format YYYYMM.
    includeExpired: boolean;  // If set to true, contract details requests and historical data queries can be performed pertaining to expired contracts.
    localSymbol: string; 		  // This is the local exchange symbol of the underlying asset.
    multiplier: string;       // Allows you to specify a futures or options multiplier. This is only necessary when multiple possibilities exist.
    primaryExch: string; 		  // Identifies the listing exchange for the contract (do not list SMART).
    right: string;            // Specifies a Put or Call. Valid values are: P, PUT, C, CALL
    secIdType: string;			  // Security identifier, when querying contract details or when placing orders.  Supported identifiers are: SIN, CUSIP, SE
    secType: string;          // This is the security type. Valid values are: STK,OPT,FUT,IND,FOP,CASH,BAG,NEWS
    strike: number;           // The strike price
    symbol: string;           // This is the symbol of the underlying asset.
    tradingClass: string;     // The trading class name for this contract.



    constructor() {  }

    // get date
    getExpriyDate(dateExpiry: string) {
        var today = new Date();
        dateExpiry = '' + today.getFullYear();
        if ((today.getMonth() + 1) <= 9)
        { return dateExpiry = dateExpiry + '0' + (today.getMonth() + 1); }
        else { return dateExpiry + today.getMonth() + 1; };
    }

}
