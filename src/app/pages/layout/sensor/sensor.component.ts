import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {SensorService} from './sensor.service';
import {BaseComponent} from '../core/base/base.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SensorType} from '../core/enums/sensor-type.enum';
import {Sensor} from '../models/sensor/sensor';
import {NbDialogService} from "@nebular/theme";
import {ServerDialogComponent} from "../server/server-dialog/server-dialog.component";
import {SensorDialogComponent} from "./sensor-dialog/sensor-dialog.component";

@Component({
  selector: 'ngx-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss'],
  // providers: [MatSnackBar],
  animations: [
    trigger('fromTo', [
      // ...
      state('from', style({
        left: 'calc(50% - 15px)',
        top: '10px',
        display: 'none',
      })),
      state('to', style({
        left: '{{left}}',
        top: '-70px',
      }), {params: {left: '0px', top: '0px'}}),
      transition('from => to', [
        style({
          display: 'block',
        }),
        animate('1s'),
      ]),
    ]),
  ],
})
export class SensorComponent extends BaseComponent implements OnInit {
  @HostBinding('style') style = {position: 'relative'};
  @Input() sensor: Sensor;
  subscription: Subscription[] = [];

  constructor(private sensorService: SensorService, protected dialogService: NbDialogService
  ) {
    super(dialogService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.subscription.push(
      this.sensorService.currentSensorId.subscribe((sensor) => {
        if (this.sensor.id === sensor?.sensorId) {
          this.makeDeviceActive();
        }
      }),
    );
    this.subscription.push(
      this.sensorService.animationToGateWay$.subscribe((data: { sensorId: string, sensorType: SensorType }) => {
        if (this.sensor.id === data.sensorId) {
          this.sensorType = data.sensorType;
          this.playAnimation$.next();
        }
      }),
    );
  }
  openSnackBar(): void {
    this.dialogService.open<any>(SensorDialogComponent, {
      context: {
        sensor: this.sensor,
      },
    })
      .onClose.subscribe((editedSensor: any) => {
      if (!editedSensor){
        return;
      } else if (editedSensor === 'delete'){
        this.delete.emit();
      } else {
        Object.assign(this.sensor, editedSensor);
      }
    });

  }

  _edit(): void {
    this.sensorService.editSensor(this.sensor);
  }
}
