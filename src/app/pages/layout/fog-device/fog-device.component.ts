import {Component, ElementRef, HostBinding, Input, OnInit, TemplateRef} from '@angular/core';
import {FogDeviceService} from './fog-device.service';
import {Subscription} from 'rxjs';
import {BaseComponent} from '../core/base/base.component';
import {Cluster} from '../models/cluster';
import {MenuItem} from '../models/menu-item';
import {animate, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {delay, filter, tap} from 'rxjs/operators';
import {DeviceType, FogDevice} from '../models/fogDevice/fogdevice.model';
import {FogDeviceType} from '../models/fog_device_type.enum';
import {NbDialogService} from "@nebular/theme";
import {BrokerDialogComponent} from "../broker/broker-dialog/broker-dialog.component";
import {FogDeviceDialogComponent} from "./fog-device-dialog/fog-device-dialog.component";

@Component({
  selector: 'ngx-fog-device',
  templateUrl: './fog-device.component.html',
  // providers: [MatSnackBar],
  animations: [
    trigger('serverToDevice', [
      state('from', style({
        left: '{{left}}px',
        top: '55px',
        display: 'none',
      }), {params: {left: '0px', top: '0px'}}),
      state('to', style({
        left: '18px',
        top: '30px',

      })),
      transition('from => to', [
        style({
          display: 'block',
        }),
        animate('0.5s'),
      ]),
    ]),
    trigger('deviceToServer', [
      state('from', style({
        left: '15px',
        top: '12px',
        display: 'none',
      })),
      state('to', style({
        left: '{{left}}px',
        top: '55px',
      }), {params: {left: '0px', top: '0px'}}),
      transition('from => to', [
        style({
          display: 'block',
        }),
        animate('0.5s'),
      ]),
    ]),

  ],
})
export class FogDeviceComponent extends BaseComponent implements OnInit {
  @Input() fogDevice: FogDevice;
  @Input() cluster: Cluster;
  @HostBinding('style') style = {position: 'relative'};
  serverToDeviceAnimationState = 'from';
  subscription: Subscription[] = [];
  deviceType = DeviceType;
  value = 30;
  deviceOffsetLeft!: number;
  animateToServerState = 'from';

  // @HostBinding('style') style = {position: 'relative'}

  constructor(private fogDeviceService: FogDeviceService,protected dialogService: NbDialogService,
              el: ElementRef) {
    super(dialogService);
    this.deviceOffsetLeft = el.nativeElement.offsetLeft;
  }

  ngOnInit(): void {
    this.fogDeviceService.playAnimationFromServerToDevice$.pipe(
      filter((data) => {
        return data.deviceId == this.fogDevice.id;
      }),
      tap((data) => {
        this.sensorType = data.sensorType;
        this.serverToDeviceAnimationState = 'to';
      }),
      delay(500),
      tap(() => {
        this.serverToDeviceAnimationState = 'from';
      }),
    ).subscribe();
    this.subscription.push(
      this.fogDeviceService.currentFogDevice.subscribe((fogDeviceId) => {
        if (this.fogDevice.id === fogDeviceId) {
          this.makeDeviceActive();
        }
      }),
    );
    this.subscription.push(
      this.fogDeviceService.animateToServer$.subscribe((data) => {
        if (data.deviceId === this.fogDevice.id) {
          this.sensorType = data.sensorType;
          this.animateToServerState = 'to';
            setTimeout(() => {
              this.animateToServerState = 'from';
            }, 500);
        }
      }),
    );

  }

  openSnackBar(): void {
    this.dialogService.open<any>(FogDeviceDialogComponent, {
      context: {
        fogDevice: this.fogDevice,
      },
    })
      .onClose.subscribe((editedFogDevice: any) => {
      if (!editedFogDevice){
        return;
      } else if (editedFogDevice === 'delete'){
        this.delete.emit();
      } else {
        Object.assign(this.fogDevice, editedFogDevice);
      }
    });

  }

}
