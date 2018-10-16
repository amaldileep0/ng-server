import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService } from "../../services/message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    alerts: Array<any> = [];

    constructor(private messageService : MessageService) {
        this.subscription = this.messageService.getMessage().subscribe(message => {
            //fix it to hande array of errors.
            this.alerts = message;
    });
    }
    ngOnInit() {}
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
