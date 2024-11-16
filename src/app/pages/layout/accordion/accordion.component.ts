import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../@core/data/smart-table';
import {EventHandlerService} from '../core/event-handler.service';
import {Event} from "../models/event";

@Component({
  selector: 'ngx-accordion',
  templateUrl: 'accordion.component.html',
  styleUrls: ['accordion.component.scss'],
})
export class AccordionComponent implements OnInit{

  settings = {
    actions: false,
    columns: {
      eventType: {
        title: 'Event Type',
        type: 'string',
      },
      senderId: {
        title: 'Sender Id',
        type: 'string',
      },
      receiverId: {
        title: 'Receiver Id',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource([]);
  logs: Event[] = [];
  constructor(private service: SmartTableData, private eventHandlerService: EventHandlerService) {

    this.source.load(this.logs);
  }
  ngOnInit(): void {
    this.updatePageIndex();
    this.eventHandlerService.logs$.subscribe((logs: Event[]) => {
      this.logs= logs
      this.source.load(this.logs)

    });
  }
  private updatePageIndex(): void{
    this.source.update(null,null);
    // this.lastPageIndex = Math.floor(this.events.length / this.itemsPerPage);
  }

}
