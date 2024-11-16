import {Component, Input, OnInit} from '@angular/core';
import {ServerService} from './server.service';
import {Subscription} from 'rxjs';
import {BaseComponent} from '../core/base/base.component';
import {Server, ServerType} from '../models/server.model';
import {NbDialogService} from "@nebular/theme";
import {BrokerDialogComponent} from "../broker/broker-dialog/broker-dialog.component";
import {ServerDialogComponent} from "./server-dialog/server-dialog.component";

// import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'ngx-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
  // providers: [MatSnackBar]
})
export class ServerComponent extends BaseComponent implements OnInit {
  @Input() server: Server;
  // @HostBinding('style') style = {position: 'relative'}
  // tupleToDeviceArray;
  isCoreActive = false;
  isRuntimeActive = false;
  isGarbageActive = false;
  subscription: Subscription[] = [];
  currentServer$ = this.serverService.currentServer$;
  constructor(private serverService: ServerService,
    protected dialogService: NbDialogService
  ) {
    super(dialogService);

  }

  ngOnInit(): void {
    this.subscription.push(
      this.currentServer$.subscribe((currentServer) => {
        if (true) {
          this.makeServerActive(ServerType.Core );
        }
      }),
    );
    // this.subscription.push(
    //   this.serverService.serverTuple$.subscribe((newTuple) => {
    //     const isExist = !!(this.server.tupleList.find(tuple => tuple.id === newTuple.id));
    //     if (!isExist) {
    //       this.server.tupleList.push(newTuple);
    //     }
    //   }),
    // );
    // this.tupleToDeviceArray = Array.from(this.server.tupleToDeviceMap);

  }
makeServerActive(type: ServerType) {
    switch (type) {
      case ServerType.Core:
        this.isCoreActive = true;
        setTimeout(() => {
          this.isCoreActive = false;
        }, 1000);
        break;
      case ServerType.Garbage:
        this.isGarbageActive = true;
        setTimeout(() => {
          this.isGarbageActive = false;
        }, 1000);
        break;
      case ServerType.Runtimetime:
        this.isRuntimeActive = true;
        setTimeout(() => {
          this.isRuntimeActive = false;
        }, 1000);
        break;
    }
  }
  openSnackBar(): void {
    this.dialogService.open<any>(ServerDialogComponent, {
      context: {
        server: this.server,
      },
    })
      .onClose.subscribe((editedServer: any) => {
      if (!editedServer){
        return;
      } else if (editedServer === 'delete'){
        this.delete.emit();
      } else {
        Object.assign(this.server, editedServer);
      }
    });

  }
}
