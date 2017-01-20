import { Component, OnInit } from '@angular/core';
import { IbNodeService } from '../services/ib-node.service'

@Component({
  selector: 'ib-ib-node',
  templateUrl: './ib-node.component.html',
  styleUrls: ['./ib-node.component.css']
})
export class IbNodeComponent implements OnInit {
   xpost: string = 'cat';


  constructor(private anibNodeService: IbNodeService) { }

  ngOnInit() {
    this.anibNodeService.getAllPosts().subscribe(post => {
      this.xpost = post;
    })
 }
 }
