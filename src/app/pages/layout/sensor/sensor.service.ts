import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {FormDialogData} from '../core/form-dialog/form-dialog-data';
import {FormDialogModel, FormDialogModelTypes} from '../core/form-dialog/form-dialog-model';
import {Cluster} from '../models/cluster';
import {SensorType} from '../core/enums/sensor-type.enum';
import {Sensor} from "../models/sensor/sensor";
import {SensorDialogComponent} from "./sensor-dialog/sensor-dialog.component";
import {NbDialogService} from "@nebular/theme";

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  currentSensorId: BehaviorSubject<{ sensorId: string, sensorType: SensorType }> = new BehaviorSubject(null);
  animationToGateWay$: Subject<{ sensorId: string, sensorType: SensorType }> = new Subject();

  constructor(private dialogService: NbDialogService) {

  }

  setCurrentSensor = (sensorId, sensorType: SensorType) => {
    const data = {sensorId, sensorType};
    this.currentSensorId.next({...data});
  }

  animationToGateWay(sensorId: string, sensorType: SensorType): void {
    this.animationToGateWay$.next({sensorId: sensorId, sensorType: sensorType});
  }


  editSensor(sensor: Sensor) {
    this.dialogService.open<any>(SensorDialogComponent, {
      context: {
        sensor: sensor,
      },
    })
      .onClose.subscribe((editedSensor: Sensor) => {
      Object.assign(sensor, editedSensor);
    });

  }

}
