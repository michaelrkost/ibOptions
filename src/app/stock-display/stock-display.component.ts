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

  theData: string = 'theData Init setting';
  vixPrice: string = 'VIX price!'

  constructor(private anIbNodeSocketService: IbNodeSocketService) {
  }

  ngOnInit() {
    console.log('IbNodeObservableService in  StockDisplayComponent ');
    this.anIbNodeSocketService.setVixMktData();
    // get VIX data
    this.anIbNodeSocketService.getTickPrice()
      .filter(vixData => vixData.tickerId == 7777)
      .filter(vixData => vixData.tickType == 'CLOSE')
      .do(vixData => this.vixPrice = vixData.price)
      .subscribe(data => this.theData = data,
      error => console.log('anIbNodeSocketService.getMessage() error:  ' + error));
  }

}

