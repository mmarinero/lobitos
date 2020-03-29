import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, Input } from '@angular/core';
import { Message } from '../types';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { tap } from 'rxjs/operators';
import { JugadoresService } from '../jugadores/jugadores.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked, AfterViewInit {

  @Input() isLobo: boolean;

  @ViewChild('chatBox', {static: true}) chatBox: ElementRef;

  newMessage = '';
  messages: Observable<Message[]>;
  playerId = 'id';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.getMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  getMessages() {
    this.messages = this.chatService.getMessages().pipe(
      tap(() => this.scrollToBottom())
    );
  }

  sendMessage() {
    const myMessage = {
      playerId: this.playerId,
      message: this.newMessage,
      timestamp: new Date()
    } as Message;
    this.chatService.sendMessage(myMessage);
  }

  scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch (error) {
      console.log(error);
    }
  }




}
