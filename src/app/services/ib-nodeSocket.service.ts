import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Socket.io // npm install socket.io-client --save 
//import * as io from "socket.io-client";

@Injectable()
export class IbNodeSocketService {
  private url = 'http://localhost:7777';
  private socket;

//  constructor () {
//    console.log('constructor');
//     this.socket.emit('Socket message', 'aMessage');
  }

}

