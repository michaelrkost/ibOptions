import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IbNodeService {
  // Resolve HTTP using the constructor
  constructor (private http: Http) {}
  // private instance variable to hold base url
  private ibNodeUrl = 'http://localhost:3000/ibNode';

  // Fetch all existing comments
     getibNode() : Observable<string> {
         // ...using get request
         return this.http.get(this.ibNodeUrl)
              // ...and calling .json() on the response to return data
              .map((res:Response) => res.toString())     //.json())
              //...errors if any
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }
}
