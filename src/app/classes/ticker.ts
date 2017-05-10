export class tickPrice {
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

export class tickGeneric {
    tickerId: number;
    tickType: string;
    value: number;

    constructor() {
        this.tickerId = 0;
        this.tickType = '';
        this.value = 0;
    }
}

export class tickOptionComputation {
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
        this.tickType ='';
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