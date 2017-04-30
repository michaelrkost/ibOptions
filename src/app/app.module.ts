import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Import MomentModule ==> Moment.js
import { MomentModule } from 'angular2-moment';
import { Moment } from 'moment';

// classes for IB APIs
import { Underlying } from "./classes/underlying";

// Here we are, the Angular 2 version of the Angular UI Bootstrap library.
// This library is being built from scratch in Typescript using the Bootstrap 4 CSS framework.
// v1.0.0-alpha.18
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
//import { IbNodeComponent } from './ib-node/ib-node.component';

// Nodejs Router setup
import { RouterModule } from '@angular/router';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  // {
  //   path: 'aReqMktData',
  //   component: IbNodeComponent
  // }
]
//services
import { IbNodeService } from './services/ib-node.service';
import { StockDetailFormComponent } from './stock-detail-form/stock-detail-form.component';
import { IbNodeObservableService } from './services/ib-nodeObservable.service';
import { StockDisplayComponent } from './stock-display/stock-display.component';
import { IbNodeSocketService } from './services/ib-nodeSocket.service';


@NgModule({
  declarations: [
    AppComponent,
    StockDetailFormComponent,
    StockDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MomentModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  // Make sure all the Services are here otherwise will get the error:
  // "Cannot set property stack of [object Object] which has only a getter"
  providers: [IbNodeService, IbNodeObservableService, IbNodeSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
