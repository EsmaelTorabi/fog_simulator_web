import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormDialogData} from '../core/form-dialog/form-dialog-data';
import {FormDialogModel, FormDialogModelTypes} from '../core/form-dialog/form-dialog-model';
import {Cluster} from '../models/cluster';
import {SensorType} from '../core/enums/sensor-type.enum';
import {Broker} from "../models/broker.model";
import {FogDeviceDialogComponent} from "../fog-device/fog-device-dialog/fog-device-dialog.component";
import {FogDevice} from "../models/fogDevice/fogdevice.model";
import {NbDialogService} from "@nebular/theme";


@Injectable({
  providedIn: 'root'
})
export class BrokerService {
  currentBrokerId: Subject<string> = new Subject();
  animationToServer$: Subject<{brokerId: string,sensorType: SensorType}> = new Subject();

  constructor(private dialogService: NbDialogService) {}

  animationToServer(brokerId: string, sensorType:SensorType){
    this.animationToServer$.next({brokerId: brokerId,sensorType: sensorType});
  }
  setCurrentBroker(brokerId): void {
    this.currentBrokerId.next(brokerId);
  }


}
