import { Component, OnInit } from '@angular/core';
// Services
import { IbNodeObservableService } from '../services/ib-nodeObservable.service';

@Component({
  selector: 'ib-stock-display',
  templateUrl: './stock-display.component.html',
  styleUrls: ['./stock-display.component.css']
})
export class StockDisplayComponent implements OnInit {
  theSocket: Date;
  theData: JSON;
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
  }

}

