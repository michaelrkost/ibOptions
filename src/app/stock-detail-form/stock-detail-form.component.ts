import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contract } from '../classes/contract';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// Services
import { IbNodeSocketService } from '../services/ib-nodeSocket.service';


@Component({
  selector: 'ib-stock-detail-form',
  templateUrl: './stock-detail-form.component.html',
  styleUrls: ['./stock-detail-form.component.css'],
})
export class StockDetailFormComponent {
  stockDetailForm: FormGroup;
  aContract: Contract;
  todayIs: Date;
  expiryDate: Date;
  tradeExecuted: Date;
  daysTillExpiry: Number;
  theContractCount: number = 1;
  theSocket: string;
  theVIXPrice: number;
  theVixData: string;
  theTickType: string;
  theContractPrice: number;
  theLastContractPrice: number;
  theCloseContractPrice: number;
  theOptionHistoricalVol: number;
  theOptionImpliedVol: number;
  theOptionCallOpenInterest: number;
  theOptionPutOpenInterest: number;
  theOptionCallVolume: number;
  theOptionPutVolume: number;


  // list of TickerIDs / Symbols
  tickerIDList: Array<Contract>;


  // ng-bootstrap - Calendar
  tradeDate: NgbDateStruct;
  aDate: NgbDateStruct;

  // Form Dropdown Data
  theSecurityTypes: any[] = ["STK", "IND", "OPT", "FUT", "FOP", "CASH", "BAG", "NEWS"];
  theExchangeTypes: any[] = ["SMART", "CBOE", "AMEX", "IDEAL", "ISLAND", "NYSE", "PHLX"];
  theTickTypes: any[] = ["LAST", "CLOSE", "BID", "ASK", "LOW", "HIGH"];
  // expiry: string = '';


  // IbNodeSocketService takes an event name 
  // and returns an Observable that you can subscribe to.
  constructor(private anIbNodeSocketService: IbNodeSocketService) {

    // ============= Stock Entry Form
    this.stockDetailForm = new FormGroup({
      'contract': new FormControl(),
      'symbol': new FormControl('SPX', Validators.required),
      'securityType': new FormControl('IND'),
      'exchange': new FormControl('CBOE'),
      'currency': new FormControl('USD', Validators.required),
      'tickType': new FormControl('LAST'),
      'expiryDate': new FormControl(''),
      'tradeExecuted': new FormControl('')
    });
    // ============ some vars
    this.aContract = new Contract();
    this.todayIs = new Date();
    this.expiryDate = new Date();
    this.tradeExecuted = new Date();
    this.daysTillExpiry = 0;
    this.theSocket = '';
    this.theVIXPrice = 0;
    this.theVixData = 'theData Init setting';
    this.theContractPrice = 0;
    this.theLastContractPrice = 0;
    this.theCloseContractPrice = 0;
    this.theOptionHistoricalVol = 0;
    this.theOptionImpliedVol = 0;
    this.theOptionCallOpenInterest = 0;
    this.theOptionPutOpenInterest = 0;
    this.theOptionCallVolume = 0;
    this.theOptionPutVolume = 0;

    this.tickerIDList = [];

    // ============ Set up Vix Socket Event
    this.anIbNodeSocketService.setVixMktData();
    // get VIX data
    this.anIbNodeSocketService.getTickPriceFilter('CLOSE')
      .filter(vixData => vixData.tickerId == 7777)
      .do(vixData => this.theVIXPrice = vixData.price)
      .subscribe(vixData => this.theVixData = vixData)
    error => console.log('anIbNodeSocketService.getMessage() error:  ' + error);

    console.log(">>> In StockDetailFormComponent Constructor <<<");
  }

  //======================onSubmit==================================
  onSubmit(value: string): void {
    console.log('you submitted: ', value);
    this.aContract.contractID = this.theContractCount++;
    this.aContract.symbol = value['symbol'];
    this.aContract.secType = value['securityType'];
    this.aContract.exchange = value['exchange'];
    this.theTickType = value['tickType'];
    // this.tradeExecuted = value['tradeExecuted'];
    // tradeDate
    // The expiration date. Use the format YYYYMM.
    // if (this.aDate.month <= 9)
    //   this.expiry = this.aDate.year + '0' + this.aDate.month;
    // else
    //   this.expiry = this.aDate.year.toString()
    //     + this.aDate.month.toString();
    this.tradeExecuted = new Date(this.tradeDate.year
      + '-' + this.tradeDate.month + '-' + this.tradeDate.day);

    this.expiryDate = new Date(this.aDate.year
      + '-' + this.aDate.month + '-' + this.aDate.day);

    this.daysTillExpiry = Math.ceil((this.expiryDate.getTime()
      - this.todayIs.getTime()) / (1000 * 60 * 60 * 24));

    this.aContract.contractID = this.anIbNodeSocketService.setReqMktData(this.aContract.symbol,
      this.aContract.secType, this.aContract.exchange);

    //Zero out Variables
    this.clearVars();

    // get contract Price data from Observable
    this.anIbNodeSocketService.getTickPrice()
      .filter(theContractData => theContractData.tickerId == this.aContract.contractID)
      .do(theContractData => {
        switch (theContractData.tickType) {
          case 'CLOSE': this.theCloseContractPrice = theContractData.price; break;
          case 'LAST': this.theLastContractPrice = theContractData.price; break;
          case 'BID': this.theLastContractPrice = theContractData.price; break;
        }
        console.log('getTickPrice(): id: ' + this.aContract.contractID)
      })
      .subscribe(theContractData => theContractData,
      error => console.log('anIbNodeSocketService.getTickPrice() error:  ' + error));

    // get contract Generic data from Observable
    this.anIbNodeSocketService.getTickGeneric()
      .filter(theContractData => theContractData.tickerId == this.aContract.contractID)
      .do(theContractData => {
        switch (theContractData.tickType) {
          case 'OPTION_HISTORICAL_VOL': this.theOptionHistoricalVol = theContractData.value; break;
          case 'OPTION_IMPLIED_VOL': this.theOptionImpliedVol = theContractData.value;
        }
      })
      .subscribe(theContractData => console.log('getTickGEneric' + theContractData),
      error => console.log('anIbNodeSocketService.getTickGeneric() error:  ' + error));

    // get contract Size data from Observable
    this.anIbNodeSocketService.getTickSize()
      .filter(theContractData => theContractData.tickerId == this.aContract.contractID)
      .map(theContractData => {
        switch (theContractData.tickType) {
          case 'OPTION_CALL_OPEN_INTEREST': this.theOptionCallOpenInterest = theContractData.size; break;
          case 'OPTION_PUT_OPEN_INTEREST': this.theOptionPutOpenInterest = theContractData.size; break;
          case 'OPTION_CALL_VOLUME': this.theOptionCallVolume = theContractData.size; break;
          case 'OPTION_PUT_VOLUME': this.theOptionPutVolume = theContractData.size;
        }
      })
      .subscribe(theContractData => theContractData,
      error => console.log('anIbNodeSocketService.getTickPrice() error:  ' + error));


    // Save the Trade Data from the form
    this.tickerIDList[this.aContract.contractID] = this.aContract;

  }
  //==============   onSubmit  =================================

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

  clearVars() {
    this.theLastContractPrice = 0;
    this.theCloseContractPrice = 0;
    this.theOptionHistoricalVol = 0;
    this.theOptionImpliedVol = 0;
    this.theOptionCallOpenInterest = 0;
    this.theOptionPutOpenInterest = 0;
    this.theOptionCallVolume = 0;
    this.theOptionPutVolume = 0;
  }
}
