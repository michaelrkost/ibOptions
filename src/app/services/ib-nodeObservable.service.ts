import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IbNodeObservableService {
  // private instance variable to hold base url
  private ibNodeObservableData = 'http://localhost:7777/reqSocketData';

  private clock: Observable<Date>;
  timer = Observable.timer(0, 1000);

  constructor(private http: Http) {
    console.log('IbNodeObservableService constructor');
    this.clock = Observable.interval(1000).map(tick => new Date()).share();
  }
  getIbNodeTimeService(): Observable<Date> {
    // ...using get request
    return this.timer
      .map((v) => Date.now())
      //...errors if any
      .catch(error => Observable.throw("IbNodeObservableService Server error in ib-IbNodeObservableService.service.ts"));
  }

   getIBNodeObservableData(): Observable<string> {
    // ...using get request
    return this.http.get(this.ibNodeObservableData)
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.text())     //.json())
      //...errors if any
      .catch(error => Observable.throw("getIBNodeObservableData error in ib-IbNodeObservableService.service.ts"));
}
}

