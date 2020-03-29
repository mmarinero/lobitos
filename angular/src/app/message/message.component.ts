import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../types';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;
  @Input() playerId: string;
  @Input() index: number;

  messageDate: string;

  constructor() { }

  ngOnInit() {
    this.messageDate =  new Date(this.message.timestamp.seconds * 1000).toLocaleString();
    console.log(this.messageDate);
  }

}
