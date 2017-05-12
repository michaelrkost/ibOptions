export class TickPrice {
    tickerId: number;
    tickType: string;
    price: number;
    canAutoExecute: string;

    constructor() {
        this.tickerId = 0;
        this.tickType = '';
        this.price = 0;
        this.canAutoExecute = '';
    }
}

export class TickGeneric {
    tickerId: number;
    tickType: string;
    value: number;

    constructor() {
        this.tickerId = 0;
        this.tickType = '';
        this.value = 0;
    }
}

export class TickOptionComputation {
    tickerId: number;
    tickType: string;
    impliedVol: number;
    delta: number;
    optPrice: number;
    pvDividend: number;
    gamma: number;
    vega: number;
    theta: number;
    undPrice: number;

    constructor() {

        this.tickerId = 0;
        this.tickType = '';
        this.impliedVol = 0;;
        this.delta = 0;;
        this.optPrice = 0;
        this.pvDividend = 0;
        this.gamma = 0;;
        this.vega = 0;;
        this.theta = 0;;
        this.undPrice = 0;;
    }
}


export class ReqMktData {
    tickerId: number;
    contract: string;
    genericTickList: string;
    snapshot: boolean;
    regulatorySnapshot: boolean;
    mktDataOptions: any[];

    constructor() {
        // this.tickerId = 777777;
        // this.contract = '';
        // this.genericTickList = '';
        // this.snapshot = false;
        // this.regulatorySnapshot = false;
        // this.mktDataOptions = null;
    }
}