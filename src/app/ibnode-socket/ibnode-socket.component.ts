import { Component, OnInit } from '@angular/core';
import { IbNodeSocketService } from '../services/ib-nodeSocket.service'

@Component({
  selector: 'ib-ibnode-socket',
  templateUrl: './ibnode-socket.component.html',
  styleUrls: ['./ibnode-socket.component.css']
})
export class IBNodeSocketComponent implements OnInit {
    xpost: string = 'cat test in Socket';

 constructor() { }
 //   constructor() { }

  ngOnInit() {
  }

}
