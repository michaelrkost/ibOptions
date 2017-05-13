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

  constructor(private socket: Socket) {
    this.theMktData = new ReqMktData;
   }


  setVixMktData() {
    this.theMktData.tickerId = 7777;
    this.theMktData.contract = 'VIX';
    this.theMktData.genericTickList = '';
    this.theMktData.snapshot = false;
    this.theMktData.regulatorySnapshot = false;
    this.theMktData.mktDataOptions = null;

    this.socket.emit("ReqMktData", this.theMktData);
    console.log('SetVIX:  ' + this.theMktData.contract);
  }

  setSpxMktData() {
    this.theMktData.tickerId = 8888;
    this.theMktData.contract = 'SPX';
    this.theMktData.genericTickList = '';
    this.theMktData.snapshot = false;
    this.theMktData.regulatorySnapshot = false;
    this.theMktData.mktDataOptions = null;

    this.socket.emit("ReqMktData", this.theMktData);
    console.log('SetVIX:  ' + this.theMktData.contract);
  }


  sendMessage(msg: string) {
    this.socket.emit("message", msg);
    console.log('sendMessage:  ' + msg);
  }


  getMessage() {
    return this.socket
      .fromEvent<any>("tickPrice")
      .map(data => data)
  }

  close() {
    this.socket.disconnect()
  }
}

