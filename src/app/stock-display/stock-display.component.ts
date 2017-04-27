import { Component, OnInit } from '@angular/core';
// Services
import { IbNodeObservableService } from '../services/ib-nodeObservable.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'ib-stock-display',
  templateUrl: './stock-display.component.html',
  styleUrls: ['./stock-display.component.css']
})
export class StockDisplayComponent implements OnInit {
  theSocket: Date;
  theData: JSON;
  socket = io('http://localhost:7777');
  constructor(private anIbNodeObservableService: IbNodeObservableService) {
  }

  ngOnInit() {
    console.log('IbNodeObservableService in  StockDisplayComponent ');
    this.anIbNodeObservableService.getIbNodeTimeService()
      .subscribe(
      data => this.theSocket = data,
      error => console.log('error:  ' + error));

    this.anIbNodeObservableService.getIBNodeObservableData()
      .subscribe(
      data => this.theData = data,
      error => console.log('StockDisplayComponent - IbNodeObservableService // error:  ' + error));


    this.socket.on('news', function (data) {
      console.log(data);
     //this.socket.emit('my other event', { my: 'data' });
    });

  }

}

