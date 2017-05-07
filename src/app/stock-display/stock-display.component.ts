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
  theSocket: Date;
  theData:string = 'theData Init setting';
  // socket = io('http://localhost:7777');
  constructor(private anIbNodeSocketService: IbNodeSocketService) {
  }

  ngOnInit() {
    console.log('IbNodeObservableService in  StockDisplayComponent ');
   this.anIbNodeSocketService.sendMessage('my other event');

    this.anIbNodeSocketService.getMessage()
      .subscribe(
      data => this.theData = data,
      error => console.log('anIbNodeSocketService.getMessage() error:  ' + error));

    // this.socket.on('news', function (data) {
    //   console.log(data);
    //  //this.socket.emit('my other event', { my: 'data' });
    // });

  }

}

