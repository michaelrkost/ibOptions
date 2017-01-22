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
  private ibNodeUrl = 'http://localhost:3000/api';

  getAPIRoute() {
    return this.http.get(this.ibNodeUrl)
      // The arrow function's parameter res is actually a ResponseData object,
      // and can be parsed as binary (blob()), string (text()) or JavaScript via JSON (json())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  // Fetch all existing comments
  getibNode(): Observable<string> {
    // ...using get request
    return this.http.get(this.ibNodeUrl)
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.text())     //.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
