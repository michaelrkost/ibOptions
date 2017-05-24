import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TickPrice, ReqMktData } from '../classes/ticker'

// Socket.IO module for Angular 2
// Socket.io module for Angular 2 // ng2-socket-io
// npm: https://www.npmjs.com/package/ng2-socket-io
// git: https://github.com/bougarfaoui/ng2-socket-io
import { Socket } from 'ng2-socket-io';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IbNodeSocketService {

  //     return this.socket.fromEvent("message")
  //
  // Takes an event name and returns an Observable that you can subscribe to.
  //
  // You should keep a reference to the Observable subscription and unsubscribe
  // when you're done with it. This prevents memory leaks as the event listener 
  // attached will be removed (using socket.removeListener) ONLY and when/if you unsubscribe.
  //
  theMktData: ReqMktData;
  nextContractIDNumber: number;

  constructor(private socket: Socket) {
    this.theMktData = new ReqMktData;
    // manages the Contract IDs 
    this.nextContractIDNumber = 1;
  }

  //-----------------------setReqMktData------------------------------------------------------
  // tickerId            - the request's identifier - int 
  // ContractID          - the Contract requested  Stock / Index / OPT - 
  //                     - nodeIBServer.contract.stock(contract),
  //                       http://interactivebrokers.github.io/tws-api/classIBApi_1_1Contract.html#gsc.tab=0
  // aSecType            - IND, STK, OPT etc
  // anExchange          - the exchange CBOE / PHX etc
  // genericTickList	   - comma separated ids of the available generic ticks: - string
  // snapshot            - bool - real time market data subscriptions. 
  //                               A true value will return a one-time snapshot,  
  // 							                 while a false value will provide streaming data.
  // regulatory snapshot - bool - snapshot requests NBBO snapshots for users 
  //                               which have "US Securities Snapshot Bundle" 
  // mktDataOptions      - List< TagValue >

  setReqMktData(aContractID: string, aSecType: string, anExchange: string,
    aGenericTickList: string = '', aSnapshot: boolean = false,
    aRegulatorySnapshot: boolean = false, aMktDataOptions: any = null) {
    if (aSecType == 'IND') {
      console.log('Call >> setIndReqMktData:  ' + this.theMktData.contract);
      this.setIndReqMktData(this.nextContractIDNumber, aContractID, aGenericTickList,
        aSnapshot, aRegulatorySnapshot, aMktDataOptions);
    }
    else if (aSecType == 'STK') {
      console.log('Call >> setStkReqMktData:  ' + this.theMktData.contract);
      this.setStkReqMktData(this.nextContractIDNumber, aContractID, aGenericTickList,
        aSnapshot, aRegulatorySnapshot, aMktDataOptions)
    }
    else { console.log('setReqMktData SecType Invalid: ' + aSecType) }
    return this.nextContractIDNumber++;
  }

  //-----------------------setStkReqMktData------------------------------------------------------

  setStkReqMktData(nextContractIDNumber: number, aContractID: string, aGenericTickList: string = '',
    aSnapshot: boolean = false, aRegulatorySnapshot: boolean = false,
    aMktDataOptions: any = null) {
    this.theMktData.tickerId = nextContractIDNumber;
    this.theMktData.contract = aContractID;
    this.theMktData.genericTickList = aGenericTickList;
    this.theMktData.snapshot = aSnapshot;
    this.theMktData.regulatorySnapshot = aRegulatorySnapshot;
    this.theMktData.mktDataOptions = aMktDataOptions;

    console.log('In setStkReqMktData:  ' + this.theMktData.contract);
    this.socket.emit("ReqStkMktData", this.theMktData);

  }

  //-----------------------setIndReqMktData------------------------------------------------------ 

  setIndReqMktData(nextContractIDNumber: number, aContractID: string, aGenericTickList: string = '',
    aSnapshot: boolean = false, aRegulatorySnapshot: boolean = false,
    aMktDataOptions: any = null) {
    this.theMktData.tickerId = nextContractIDNumber;
    this.theMktData.contract = aContractID;
    this.theMktData.genericTickList = aGenericTickList;
    this.theMktData.snapshot = aSnapshot;
    this.theMktData.regulatorySnapshot = aRegulatorySnapshot;
    this.theMktData.mktDataOptions = aMktDataOptions;

    console.log('In setIndReqMktData:  ' + this.theMktData.contract);
    this.socket.emit("ReqIndMktData", this.theMktData);

  }

  setVixMktData() {
    this.theMktData.tickerId = 7777;
    this.theMktData.contract = 'VIX';
    this.theMktData.genericTickList = '';
    this.theMktData.snapshot = false;
    this.theMktData.regulatorySnapshot = false;
    this.theMktData.mktDataOptions = null;

    this.socket.emit("ReqIndMktData", this.theMktData);
    console.log('setVixMktData:  ' + this.theMktData.contract);
  }

  setSpxMktData() {
    this.theMktData.tickerId = 8888;
    this.theMktData.contract = 'SPX';
    this.theMktData.genericTickList = '';
    this.theMktData.snapshot = false;
    this.theMktData.regulatorySnapshot = false;
    this.theMktData.mktDataOptions = null;

    this.socket.emit("ReqIndMktData", this.theMktData);
    console.log('setSpxMktData:  ' + this.theMktData.contract);
  }


  sendMessage(msg: string) {
    this.socket.emit("message", msg);
    console.log('sendMessage:  ' + msg);
  }


  getTickPrice(msg: string) {
    return this.socket
      .fromEvent<any>("tickPrice")
      .map(data => data)
      .filter(vixData => vixData.tickType == msg)
  }

  close() {
    this.socket.disconnect()
  }
}

