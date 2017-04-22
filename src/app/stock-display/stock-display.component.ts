import { Component, OnInit } from '@angular/core';
// Services
import { IbNodeSocketService } from '../services/ib-nodeSocket.service';

@Component({
  selector: 'ib-stock-display',
  templateUrl: './stock-display.component.html',
  styleUrls: ['./stock-display.component.css']
})
export class StockDisplayComponent implements OnInit  {
  theSocket: Date;
  constructor(private anIbNodeSocketService: IbNodeSocketService) {
  }

 ngOnInit(){console.log('IbNodeSocketService in  StockDisplayComponent ');
   this.anIbNodeSocketService.getIbNodeSocketService()
      .subscribe(
      data => this.theSocket = data,
      error => console.log('error:  ' + error));
 }
  
}

