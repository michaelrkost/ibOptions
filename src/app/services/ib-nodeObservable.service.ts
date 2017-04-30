import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IbNodeObservableService {

//  private clock: Observable<Date>;
  timer = Observable.timer(0, 1000);

  constructor(private http: Http) {
    console.log('IbNodeObservableService constructor');
 //   this.clock = Observable.interval(1000).map(tick => new Date()).share();
  }
  getIbNodeTimeService(): Observable<Date> {
    // ...using get request
    return this.timer
      .map(() => Date.now())
      //...errors if any
      .catch(error => Observable.throw("IbNodeObservableService Server error in ib-IbNodeObservableService.service.ts"));
  }

}

