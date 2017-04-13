import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Import MomentModule ==> Moment.js
import { MomentModule } from 'angular2-moment';
import { Moment } from 'moment';

// classes
import { Underlying } from "./classes/underlying";

// Here we are, the Angular 2 version of the Angular UI Bootstrap library.
// This library is being built from scratch in Typescript using the Bootstrap 4 CSS framework.
// v1.0.0-alpha.18
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { IbNodeComponent } from './ib-node/ib-node.component';
import { IBNodeSocketComponent } from './ibnode-socket/ibnode-socket.component';;

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
  //   path: 'ibNode',
  //   component: IbNodeComponent
  // },
  // {
  //   path: 'node',
  //   component: IbNodeComponent
  // },
    {
    path: 'aIBNodeSocket',
    component: IBNodeSocketComponent
  },
  {
    path: 'aReqMktData',
    component: IbNodeComponent
  }
]
//services
import { IbNodeService } from  './services/ib-node.service';
import { StockDetailFormComponent } from './stock-detail-form/stock-detail-form.component';
import { IbNodeSocketService } from './services/ib-nodeSocket.service';


@NgModule({
  declarations: [
    AppComponent,
    StockDetailComponent,
    IbNodeComponent,
    StockDetailFormComponent,
    IBNodeSocketComponent
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
  providers: [IbNodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
