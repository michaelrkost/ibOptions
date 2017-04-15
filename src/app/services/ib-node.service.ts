import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import {Observable} from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class IbNodeService {
  // Http Dependency Injection w/in the Constructor
  constructor(private http: Http) { }
  // private instance variable to hold base url
  private ibNodereqMktData = 'http://localhost:3000/reqMktData';

  // Request Market Data from node ib module
  getIBNodereqMktData(ticker: number, symbol: string, exchange: string): Observable<string> {
    // ...using get request
    return this.http.get(this.ibNodereqMktData 
                   + '/ticker/' + ticker
                   + '/symbol/' + symbol
                   + '/exchange/'+ exchange)
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.text())     //.json())
      //...errors if any
      .catch(error => Observable.throw("IbNodeService Server error in ib-node.ts"));
      
 }
}
