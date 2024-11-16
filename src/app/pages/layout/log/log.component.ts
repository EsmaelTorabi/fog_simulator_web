import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {map} from 'rxjs/operators';
import {EventHandlerService} from '../core/event-handler.service';
import {Event} from '../core/event';
import {EventType} from '../core/event-type.enum';
import {PageEvent} from '@angular/material/paginator/paginator';

@Component({
  selec: 'ngx-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['currentEntityId', 'NextEntityId', 'eventType'];
  events: Event[] = this.eventHandlerService.events;
  dataSource = new MatTableDataSource<Event>(this.events);
  lastPageIndex = 0;
  itemsPerPage = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private eventHandlerService: EventHandlerService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.updatePageIndex();
    // this.eventHandlerService.fogEvent.pipe(map(event => event as Event)).subscribe((event) => {
    //   this.events.push(event);
    //   this.updatePageIndex();
    // });
  }
  page(event: PageEvent): void{
    this.itemsPerPage = event.pageSize;
    this.updatePageIndex();
  }
  private updatePageIndex(): void{
    this.lastPageIndex = Math.floor(this.events.length / this.itemsPerPage);
  }
}



