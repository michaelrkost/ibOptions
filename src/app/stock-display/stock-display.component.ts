import { Component, OnInit } from '@angular/core';
// Services
import { IbNodeObservableService } from '../services/ib-nodeObservable.service';
import { IbNodeSocketService } from '../services/ib-nodeSocket.service'
import * as io from 'socket.io-client';

@Component({
  selector: 'ib-stock-display',
  templateUrl: './stock-display.component.html',
  styleUrls: ['./stock-display.component.css']
})
export class StockDisplayComponent { //implements OnInit {

  theData:string = 'theData Init setting';
  vixPrice: string = 'VIX price!'

  constructor(private anIbNodeSocketService: IbNodeSocketService) {
  }

  ngOnInit() {
    console.log('IbNodeObservableService in  StockDisplayComponent ');
   this.anIbNodeSocketService.setSpxMktData();
    console.log('ngOnInit  after/// this.anIbNodeSocketService.setVixMktData()');
    this.anIbNodeSocketService.getMessage()
    .filter( (vixData) => vixData.tickType == 'CLOSE')
    //   .filter( (vixTickerID) => {
    //     if ( vixTickerID.tickType = 'ASK')
    //       this.vixPrice = vixTickerID.price;
    //       return vixTickerID.tickerID == 'ASK'
    //  })

      .subscribe(
      data => this.theData = data,
      error => console.log('anIbNodeSocketService.getMessage() error:  ' + error));
  }

}

