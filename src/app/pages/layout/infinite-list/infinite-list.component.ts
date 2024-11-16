import {Component, Input, OnInit} from '@angular/core';
import { NewsService } from '../news.service';
import {BaseComponent} from '../core/base/base.component';
import {Subscription} from 'rxjs';
import {Result} from '../models/result';
import {EventHandlerService} from '../core/event-handler.service';
import {AppService} from '../app.service';
import {NbDialogService} from "@nebular/theme";
import {J} from "@angular/cdk/keycodes";

@Component({
  selector: 'ngx-infinite-list',
  templateUrl: 'infinite-list.component.html',
  styleUrls: ['infinite-list.component.scss'],
})
export class InfiniteListComponent  extends BaseComponent implements OnInit{

  subscriptions: Subscription[] = [];
 result!: any;
  constructor( private eventHandler: EventHandlerService, private appService: AppService,
               protected dialogService: NbDialogService
  ) {
    super(dialogService);
  }
ngOnInit() {
  super.ngOnInit();
 const results = localStorage.getItem('results') ;
const result = results ? JSON.parse(results) : {
   uploadCost: {},
   downloadCost:  {},
   energyCost:  {},
   transferCost:  {},
   runtime:  {},
   storageCost: {},
   accessibility:  {},
   availability:  {},
   totalCpuTime:  {},
   networkCost:  {},
 };
  this.result = [
    {title: 'Upload Cost', xData: Object.keys(result.uploadCost), yData: Object.values(result.uploadCost)},
    {title: 'Download Cost', xData: Object.keys(result.downloadCost), yData: Object.values(result.downloadCost)},
    {title: 'Energy Cost', xData: Object.keys(result.energyCost), yData: Object.values(result.energyCost)},
    {title: 'Transfer Cost', xData: Object.keys(result.transferCost), yData: Object.values(result.transferCost)},
    {title: 'Runtime', xData: Object.keys(result.runtime), yData: Object.values(result.runtime)},
    {title: 'Storage Cost', xData: Object.keys(result.storageCost), yData: Object.values(result.storageCost)},
    {title: 'Accessibility', xData: Object.keys(result.accessibility), yData: Object.values(result.accessibility)},
    {title: 'Availability', xData: Object.keys(result.availability), yData: Object.values(result.availability)},
    {title: 'Total Cpu Time', xData: Object.keys(result.totalCpuTime), yData: Object.values(result.totalCpuTime)},
    {title: 'Network Cost', xData: Object.keys(result.networkCost), yData: Object.values(result.networkCost)},
  ]
}

  restartApp(): void {
    this.appService.restartApp();

  }
}
