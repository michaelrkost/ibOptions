import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Underlying } from "../classes/underlying";

@Component({
  selector: 'ib-stock-detail-form',
  templateUrl: './stock-detail-form.component.html',
  styleUrls: ['./stock-detail-form.component.css']
})
export class StockDetailFormComponent {
  stockDetailForm: FormGroup;
  anUnderlying: Underlying;
  public theSecurityTypes: any[] = [{ "secType": "STK" },
    { "secType": "IND" }, { "secType": "OPT" }, { "secType": "FUT" },
    { "secType": "FOP" }, { "secType": "CASH" }, { "secType": "BAG" },
    { "secType": "NEWS" }];

constructor() {
  this.stockDetailForm = new FormGroup({
    'symbol': new FormControl('SPX', Validators.required),
    'securityType': new FormControl(''),
    'exchange': new FormControl('CBOE', Validators.required),
    'currency': new FormControl('USD', Validators.required)
  });
  this.anUnderlying = new Underlying();
  // (<FormGroup>this.stockDetailForm)
  //             .setValue(this.theSecurityTypes, {onlySelf: true});
}

onSubmit(value: string): void {
  console.log('you submitted: ', value);
  this.anUnderlying.symbol = value['symbol'];
  this.anUnderlying.secType = value["securityType"].secType;
  this.anUnderlying.exchange = value['exchange'];
}

// (<FormGroup>this.myForm)
//             .setValue(this.CountryResponse, {onlySelf: true});

}
