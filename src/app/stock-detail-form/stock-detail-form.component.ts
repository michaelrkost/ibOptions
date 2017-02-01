import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Underlying } from "../classes/underlying";
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ib-stock-detail-form',
  templateUrl: './stock-detail-form.component.html',
  styleUrls: ['./stock-detail-form.component.css']
})
export class StockDetailFormComponent {
  stockDetailForm: FormGroup;
  anUnderlying: Underlying;
  // ng-bootstrap - Calendar
  aDate: NgbDateStruct;
  // Form Dropdown Data
  theSecurityTypes: any[] = ["STK", "IND", "OPT", "FUT", "FOP", "CASH", "BAG", "NEWS"];
  theExchangeTypes: any[] = ["SMART", "CBOE", "AMEX", "IDEAL", "ISLAND", "NYSE", "PHLX"];
  expiry: string = '';

  constructor() {
    this.stockDetailForm = new FormGroup({
      'symbol': new FormControl('SPX', Validators.required),
      'securityType': new FormControl('IND'),
      'exchange': new FormControl('CBOE'),
      'currency': new FormControl('USD', Validators.required),
      'expiryDate': new FormControl('')
    });
    this.anUnderlying = new Underlying();
  }

  onSubmit(value: string): void {
    console.log('you submitted: ', value);
    this.anUnderlying.symbol = value['symbol'];
    this.anUnderlying.secType = value['securityType'];
    this.anUnderlying.exchange = value['exchange'];
    // The expiration date. Use the format YYYYMM.
    if (this.aDate.month <= 9)
      this.expiry =  this.aDate.year + '0' + this.aDate.month ;
    else
      this.expiry = this.aDate.year.toString()
        + this.aDate.month.toString();

  }
  // ng-bootstrap - Calendar ---------------------
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isThurs(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 4;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }
  // --------------------   ng-bootstrap - Calendar
}
