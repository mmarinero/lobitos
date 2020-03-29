import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, Input } from '@angular/core';
import { Message } from '../types';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { tap } from 'rxjs/operators';
// import { JugadoresService } from '../jugadores/jugadores.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked, AfterViewInit {

  @Input() isLobo: boolean;

  @Input() user: any;

  @ViewChild('chatBox', { static: true }) chatBox: ElementRef;

  newMessage = '';
  messages: Observable<Message[]>;

  constructor(private chatService: ChatService) {
  }

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
    if (this.isLobo) {
      this.messages = this.chatService.getWolfMessages().pipe(
        tap(() => this.scrollToBottom())
      );
    } else {
      this.messages = this.chatService.getHumanMessages().pipe(
        tap(() => this.scrollToBottom())
      );
    }
  }

  sendMessage() {
    const myMessage = {
      playerName: this.user.nombre,
      message: this.newMessage,
      date: new Date().getTime()
    } as Message;

    if (this.isLobo) {
      this.chatService.sendWolfMessage(myMessage);

    } else {
      this.chatService.sendHumanMessage(myMessage);

    }
  }

  scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch (error) {
      console.log(error);
    }
  }




}
