import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IbNodeSocketService {
  socket = io('http://localhost:7777');
  private IBNode: Observable<JSON>;
  aE = this.socket.on('news', function (data) {
      console.log(data);
    });

  constructor() { }
 
     

getIbNodeTimeService(): Observable<JSON> {
    // ...using get request
    return this.aE
      .map(() => Date.now())
      //...errors if any
      .catch(error => Observable.throw("IbNodeObservableService Server error in ib-IbNodeObservableService.service.ts"));
  }
}

