import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Here we are, the Angular 2 version of the Angular UI Bootstrap library.
// This library is being built from scratch in Typescript using the Bootstrap 4 CSS framework.
// v1.0.0-alpha.18
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { IbNodeComponent } from './ib-node/ib-node.component';

// Nodejs Router setup
import { RouterModule } from '@angular/router';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'ibNode',
    component: IbNodeComponent
  },
  {
    path: 'node',
    component: IbNodeComponent
  },
  {
    path: 'api',
    component: IbNodeComponent
  }
];

//services
import { IbNodeService } from  './services/ib-node.service';

@NgModule({
  declarations: [
    AppComponent,
    StockDetailComponent,
    IbNodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [IbNodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
