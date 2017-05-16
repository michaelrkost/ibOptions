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
  aTickerId: number;

  constructor(private socket: Socket) {
    this.theMktData = new ReqMktData;
    this.aTickerId = 1; 
  }



  setReqMktData(aContract: string, aSecType: string, anExchange: string,
    aGenericTickList: string = '', aSnapshot: boolean = false,
    aRegulatorySnapshot: boolean = false, aMktDataOptions: any = null) {
    if (aSecType == 'IND') {
      this.setIndReqMktData(this.aTickerId++, aContract, aGenericTickList,
        aSnapshot, aRegulatorySnapshot, aMktDataOptions);
      console.log('Call >> setIndReqMktData:  ' + this.theMktData.contract);
    }
    else {
      this.setStkReqMktData(this.aTickerId, aContract, aGenericTickList,
        aSnapshot, aRegulatorySnapshot, aMktDataOptions)
      console.log('Call >> setStkReqMktData:  ' + this.theMktData.contract);
    }
  }

  setStkReqMktData(aTickerId: number, aContract: string, aGenericTickList: string = '',
    aSnapshot: boolean = false, aRegulatorySnapshot: boolean = false,
    aMktDataOptions: any = null) {
    this.theMktData.tickerId = aTickerId;
    this.theMktData.contract = aContract;
    this.theMktData.genericTickList = aGenericTickList;
    this.theMktData.snapshot = aSnapshot;
    this.theMktData.regulatorySnapshot = aRegulatorySnapshot;
    this.theMktData.mktDataOptions = aMktDataOptions;

    console.log('In setStkReqMktData:  ' + this.theMktData.contract);
    this.socket.emit("ReqMktData", this.theMktData);

  }

  setIndReqMktData(aTickerId: number, aContract: string, aGenericTickList: string = '',
    aSnapshot: boolean = false, aRegulatorySnapshot: boolean = false,
    aMktDataOptions: any = null) {
    this.theMktData.tickerId = aTickerId;
    this.theMktData.contract = aContract;
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


  getTickPrice() {
    return this.socket
      .fromEvent<any>("tickPrice")
      .map(vixData => vixData)
    // .filter( vixData => vixData.tickerId == 7777 )
    // .filter( vixData => vixData.tickType == 'CLOSE')    
  }

  close() {
    this.socket.disconnect()
  }
}

