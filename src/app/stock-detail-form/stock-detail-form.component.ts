import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contract } from '../classes/contract';
//import { TickPrice } from '../classes/ticker';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// Services
import { IbNodeSocketService } from '../services/ib-nodeSocket.service';

// parent input/output
import { StockDisplayComponent } from '../stock-display/stock-display.component';



@Component({
  selector: 'ib-stock-detail-form',
  templateUrl: './stock-detail-form.component.html',
  styleUrls: ['./stock-detail-form.component.css'],
})
export class StockDetailFormComponent {
  @Input() vixPrice: string;
  stockDetailForm: FormGroup;
  aContract: Contract;
  todayIs: Date;
  expiryDate: Date;
  daysTillExpiry: Number;
  theContractCount: number = 1;
  theSocket: string;
  theVIXPrice: string;


  // ng-bootstrap - Calendar
  aDate: NgbDateStruct;
  // Form Dropdown Data
  theSecurityTypes: any[] = ["STK", "IND", "OPT", "FUT", "FOP", "CASH", "BAG", "NEWS"];
  theExchangeTypes: any[] = ["SMART", "CBOE", "AMEX", "IDEAL", "ISLAND", "NYSE", "PHLX"];
  expiry: string = '';

  constructor(private anIbNodeSocketService: IbNodeSocketService) {
    this.stockDetailForm = new FormGroup({
      'contract': new FormControl(),
      'symbol': new FormControl('SPX', Validators.required),
      'securityType': new FormControl('IND'),
      'exchange': new FormControl('CBOE'),
      'currency': new FormControl('USD', Validators.required),
      // '' needed for IND
      'expiryDate': new FormControl('')
    });
    this.aContract = new Contract();
    this.todayIs = new Date();
    this.expiryDate = new Date();
    this.daysTillExpiry = 0;
    this.theSocket = '';
    this.theVIXPrice = '';

    console.log(">>> In StockDetailFormComponent Constructor <<<");
  }

  onSubmit(value: string): void {
    console.log('you submitted: ', value);
    this.aContract.contractID = this.theContractCount++;
    this.aContract.symbol = value['symbol'];
    this.aContract.secType = value['securityType'];
    this.aContract.exchange = value['exchange'];
    // The expiration date. Use the format YYYYMM.
    if (this.aDate.month <= 9)
      this.expiry = this.aDate.year + '0' + this.aDate.month;
    else
      this.expiry = this.aDate.year.toString()
        + this.aDate.month.toString();

    this.expiryDate = new Date(this.aDate.year
      + '-' + this.aDate.month + '-' + this.aDate.day);

    this.daysTillExpiry = Math.ceil((this.expiryDate.getTime() - this.todayIs.getTime()) / (1000 * 60 * 60 * 24));

    // console.log('Today is: ' + this.expiryDate + moment(this.todayIs);
    // console.log('Today is: ' + (this.todayIs.getTime() + '  Expiry is: ' + this.expiryDate.getTime()));
    // console.log('Operation took ' + Math.ceil((this.expiryDate.getTime() - this.todayIs.getTime()) / (1000 * 60 * 60 * 24)));
    // console.log(' onSubmit // anIbNodeService:  '
    //   + this.anIbNodeService.getIBNodereqMktData(this.aContract.contractID, this.aContract.symbol,
    //    this.aContract.exchange));

    this.aContract.contractID = this.anIbNodeSocketService.setReqMktData(this.aContract.symbol,
      this.aContract.secType, this.aContract.exchange);

  }  //==============   onSubmit  =================================
  // this.expiryDate.setTime(Date.parse(this.aDate.year.toString() + '-'+
  //                                    this.aDate.month.toString() + '-'+
  //                                    this.aDate.day.toString()));

  //  date time string set in ISO 8601 format. 
  //  For example, "2011-10-10" (just date) or "2011-10-10T14:48:00" (date and time) 
  //  can be passed and parsed. Where the string is ISO 8601 date only, 
  //  the UTC time zone is used to interpret arguments.
  //   If the string is date and time in ISO 8601 format, it will be treated as local.
  //   Year:
  //       YYYY (eg 1997)
  //    Year and month:
  //       YYYY-MM (eg 1997-07)
  //    Complete date:
  //       YYYY-MM-DD (eg 1997-07-16)
  //    Complete date plus hours and minutes:
  //       YYYY-MM-DDThh:mmTZD (eg 1997-07-16T19:20+01:00)
  //    Complete date plus hours, minutes and seconds:
  //       YYYY-MM-DDThh:mm:ssTZD (eg 1997-07-16T19:20:30+01:00)
  //    Complete date plus hours, minutes, seconds and a decimal fraction of a
  // second
  //       YYYY-MM-DDThh:mm:ss.sTZD (eg 1997-07-16T19:20:30.45+01:00)
  // where:

  //      YYYY = four-digit year
  //      MM   = two-digit month (01=January, etc.)
  //      DD   = two-digit day of month (01 through 31)
  //      hh   = two digits of hour (00 through 23) (am/pm NOT allowed)
  //      mm   = two digits of minute (00 through 59)
  //      ss   = two digits of second (00 through 59)
  //      s    = one or more digits representing a decimal fraction of a second
  //      TZD  = time zone designator (Z or +hh:mm or -hh:mm)

  // --------- ng-bootstrap - Calendar ---------------

  // NgbDateStruct{ year: number;  // The year, for example 2016
  //                month: number; // The month, with default calendar we use ISO 8601: 1=Jan ... 12=Dec
  //                day: number;}  // The day of month, starting at 1
  //===============================================================

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
  // --------- ng-bootstrap - Calendar ---------------
}
