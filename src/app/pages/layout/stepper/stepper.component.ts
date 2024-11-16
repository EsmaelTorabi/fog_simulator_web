import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Subscription} from 'rxjs';
import {ClusterComponent} from '../cluster/cluster.component';
import {ClusterService} from '../cluster/cluster.service';
import {NbSelectComponent} from '@nebular/theme';
import {AppService} from '../app.service';
import {WebSocketService} from '../core/web-socket.service';
import {Cluster} from '../models/cluster';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
})
export class StepperComponent implements OnInit, AfterViewInit {
  subscriptions: Subscription[] = [];
  @ViewChildren(ClusterComponent) clusterComponents: QueryList<ClusterComponent>;
  @ViewChild('clustersContainer', {static: true}) clustersContainer: ElementRef<any>;
  @ViewChild('line', {static: true}) line: ElementRef<any>;
  @ViewChild('svg', {static: true}) svg: ElementRef<any>;
  @ViewChild('historyListSelector') historyListSelector: NbSelectComponent;
  @ViewChild('cloudEl', {read: ElementRef}) cloudEl: ElementRef<any>;
  @HostBinding('style') style = {position: 'relative'}

  cloud = this.appService.cloud;
  clusterList: Cluster[] = [];
  clustersHistory = [];
  Object = Object;
  isSocketConnected$ = this.webSocketService.isSocketConnected$;
  isSocketStarted$ = this.webSocketService.isSocketStarted$;
  isSocketConnected = this.webSocketService.isSocketConnected;
  isSocketStarted = this.webSocketService.isSocketStarted;
  constructor(private appService: AppService,
              private clusterService: ClusterService,
              private webSocketService: WebSocketService,
  ) {
  }

  ngOnInit(): void {
    this.drawBrokerConnectionLines();
    this.clusterService.clustersHistory$.subscribe((clustersHistory) => {
      this.clustersHistory = clustersHistory;
    });
this.clusterService.clusters$.subscribe((clusters: Cluster[])=>{
  this.clusterList = clusters
})
  }

  ngAfterViewInit(): void {
    this.drawBrokerConnectionLines();
  }

  save(clusterList: Cluster[]): void {
    this.clusterService.save(clusterList);
  }

  deleteClustersFromHistory(key: string): void {
    this.clusterService.deleteClustersFromHistory(key);
  }

  showOldClusterList(historyKey: string): void {
    this.clusterList = this.clustersHistory[historyKey];
  }

  openHistoryList(): void {
    // this.historyListSelector.open();
  }

  drawBrokerConnectionLines(): void {
    // if (!this.clusterList) {
    //   return;
    // }
    // this.svg.nativeElement.querySelectorAll(':not(.original)').forEach(node => {
    //   this.renderer.removeChild(this.svg.nativeElement, node);
    // });
    // const x1 = this.clustersContainer?.nativeElement.offsetLeft + (-200);
    // const x2 = this.clustersContainer?.nativeElement.offsetLeft +
    // (this.clustersContainer?.nativeElement.offsetWidth) + 200;
    //
    // const clonedLine = this.line?.nativeElement.cloneNode(true);
    // this.renderer.appendChild(this.svg?.nativeElement, clonedLine);
    // this.renderer.addClass(clonedLine, 'clone');
    // this.renderer.addClass(clonedLine, 'brokers-connection');
    // this.renderer.removeClass(clonedLine, 'original');
    // this.renderer.setAttribute(clonedLine, 'x1', x1);
    // this.renderer.setAttribute(clonedLine, 'y1', '1');
    // this.renderer.setAttribute(clonedLine, 'x2', x2);
    // this.renderer.setAttribute(clonedLine,   'y2', '1');
  }

  start(): void {
    this.appService.start(this.clusterList);
  }

  reload(): void {
    // this.appService.disconnectSocket();
    window.location.reload();
  }


  connect(): void {
    this.webSocketService.connectSocket();
  }

}
