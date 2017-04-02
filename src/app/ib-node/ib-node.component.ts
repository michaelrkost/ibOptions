import { Component, OnInit } from '@angular/core';
import { IbNodeService } from '../services/ib-node.service'

@Component({
  selector: 'ib-ib-node',
  templateUrl: './ib-node.component.html',
  styleUrls: ['./ib-node.component.css']
})
export class IbNodeComponent implements OnInit {
  xpost: string = 'cat';

// inject IbNodeService Service
  constructor(private anibNodeService: IbNodeService) { }

  ngOnInit() {
  //  this.anIBNodeService.getIBNodereqMktData()
  //     .subscribe((data) =>  {this.xpost = data})
      // console.error,
      // () => console.log('Completed!'));
  }
}
