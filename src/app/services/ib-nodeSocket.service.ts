import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IbNodeSocketService {
  // private instance variable to hold base url
  private ibNodeSocketData = 'http://localhost:7777/reqSocketData';

  private clock: Observable<Date>;
  timer = Observable.timer(0, 1000);

  constructor(private http: Http) {
    console.log('IbNodeSocketService constructor');
    this.clock = Observable.interval(1000).map(tick => new Date()).share();
  }
  getIbNodeSocketService(): Observable<Date> {
    // ...using get request
    return this.timer
      .map((v) => Date.now())
      //...errors if any
      .catch(error => Observable.throw("IbNodeSocketService Server error in ib-nodeSocket.service.ts"));
  }
}
