import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Cloud} from './models/cloud';
import {ClusterService} from './cluster/cluster.service';
import {EventHandlerService} from './core/event-handler.service';
import {WebSocketService} from './core/web-socket.service';
import {NbDialogService} from "@nebular/theme";
import {StartDialogComponent} from './stepper/start-dialog/start-dialog.component';
import {filter, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AppService {
  cloud = new Cloud('cloud');
  buttonsVisibility: BehaviorSubject<boolean> = new BehaviorSubject(true);
  connectButtonVisibility: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(
    protected dialogService: NbDialogService,
    private clusterService: ClusterService,
    private eventHandlerService: EventHandlerService,
    private webSocketService: WebSocketService,
  ) {
  }

  start(clusterList)
    :
    void {
    this.dialogService.open<any>(StartDialogComponent)
      .onClose.pipe(
      filter((res: any) => res),
      tap((startData: any) => {
        localStorage.setItem('currentMethod', startData.dataPlacementType);
      }),
      map(((data: any) => {
        const mappedData = {
          type: 'START',
          clusterList: clusterList,
          ...data,
        };
        return JSON.stringify(mappedData).toString();
      })),
      tap((startData: any) => {
        this.webSocketService.startSocket(startData);
      }),
    ).subscribe(() => {});
  }

  restartApp()
    :
    void {
    this.webSocketService.disconnectSocket();
    this.clusterService.resetClusters();
  }

}
