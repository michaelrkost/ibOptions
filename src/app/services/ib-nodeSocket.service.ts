import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import {Observable} from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Socket.io // npm install socket.io-client --save 
//import * as io from "socket.io-client";

@Injectable()
export class IbNodeSocketService {
  // Http Dependency Injection w/in the Constructor
  constructor(private http: Http) { }
  // private instance variable to hold base url
  private ibNodeUrl = 'http://localhost:3000/ibLive';
 // private ibNodereqMktData = 'http://localhost:3000/ticker/1/symbol/BAC';
  private ibNodereqMktData = 'http://localhost:3000/reqMktData';
  private ibTicket = "http://localhost:3000/ticker/11/symbol/FB";

      // Socket.io
 // socket: SocketIOClient.Socket;
  //  socketr = io('http://localhost');

  getAPIRoute() {
    return this.http.get(this.ibTicket)
      // The arrow function's parameter res is actually a ResponseData object,
      // and can be parsed as binary (blob()), string (text()) or JavaScript via JSON (json())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('IbNodeService Server error'));

  }

  // Fetch all existing comments
  getIBNodereqMktData(ticker: number, symbol: string, exchange: string): Observable<string> {
    // ...using get request
    return this.http.get(this.ibNodereqMktData 
                   + '/ticker/' + ticker
                   + '/symbol/' + symbol
                   + '/exchange/'+ exchange)
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.text())     //.json())
      //...errors if any
     // .catch(error => Observable.throw("ccccc"));
      
 }
}
