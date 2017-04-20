import { Component, OnInit } from '@angular/core';
// Services
import { IbNodeSocketService } from '../services/ib-nodeSocket.service';

@Component({
  selector: 'ib-stock-display',
  templateUrl: './stock-display.component.html',
  styleUrls: ['./stock-display.component.css']
})
export class StockDisplayComponent implements OnInit {

  constructor() { }//private anIbNodeSocketService:  IbNodeSocketService) { }

  ngOnInit() {
  }

}
