import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Socket.io // npm install socket.io-client --save 
//import * as io from "socket.io-client";

@Injectable()
export class IbNodeSocketService {
  private url = 'http://localhost:7777';
  private socket = io(this.url);
  private aString = 'yyy';

  constructor(private http: Http) {
    console.log('IbNodeSocketService constructor');
  }

  // getIbNodeSocketService(symbol: string): Observable<string> {
  //   this.socket.emit('Socket message', 'aMessage');

  //   this.socket.on('barf', function (data) { this.aString = data; console.log(data) });
  //   return this.aString;
  // }
}


