import {Injectable} from '@angular/core';
import {FormDialogData} from '../core/form-dialog/form-dialog-data';
import { Observable, Subject} from 'rxjs';
import {SensorType} from '../core/enums/sensor-type.enum';
import {SensorDialogComponent} from '../sensor/sensor-dialog/sensor-dialog.component';
import {FogDevice} from '../models/fogDevice/fogdevice.model';
import {NbDialogService} from '@nebular/theme';
import {FogDeviceDialogComponent} from "./fog-device-dialog/fog-device-dialog.component";

@Injectable({
  providedIn: 'root',
})
export class FogDeviceService {
  currentFogDevice: Subject<string> = new Subject();
  animateToServer$: Subject<{ deviceId: string, sensorType: SensorType }> = new Subject();
  playAnimationFromServerToDevice$: Subject<{ deviceId: string, sensorType: SensorType }> = new Subject();

  constructor(private dialogService: NbDialogService) {}
  animateToServer(deviceId: string, sensorType: SensorType) {
    this.animateToServer$.next({deviceId: deviceId, sensorType: sensorType});
  }

  playAnimationFromServerToDevice(deviceId: string, sensorType: SensorType) {
    this.playAnimationFromServerToDevice$.next({deviceId: deviceId, sensorType: sensorType});
  }

  setCurrentFogDevice(fogDeviceId): void {
    this.currentFogDevice.next(fogDeviceId);
  }


  editFogDevice(fogDevice: FogDevice): void {
    this.dialogService.open<any>(FogDeviceDialogComponent, {
      context: {
        fogDevice: FogDevice,
      },
    })
      .onClose.subscribe((editedFogDevice: FogDevice) => {
      Object.assign(fogDevice, editedFogDevice);
    });
  }



}
