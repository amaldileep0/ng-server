import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from "../_services/message.service";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  message: any;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
      this.subscription = this.messageService.getMessage().subscribe(message => {
          this.message = message; 
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
