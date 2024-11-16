import {Component, HostBinding, Input, OnInit, TemplateRef} from '@angular/core';
import {BrokerService} from './broker.service';
import {Subscription} from 'rxjs';
import {BaseComponent} from '../core/base/base.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SensorType} from '../core/enums/sensor-type.enum';
import {Broker} from '../models/broker.model';
import {NbDialogRef, NbDialogService, NbIconLibraries} from "@nebular/theme";
import {DialogNamePromptComponent} from "../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component";
import {FogDevice} from "../models/fogDevice/fogdevice.model";
import {FogDeviceDialogComponent} from "../fog-device/fog-device-dialog/fog-device-dialog.component";
import {BrokerDialogComponent} from "./broker-dialog/broker-dialog.component";

@Component({
  selector: 'ngx-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss'],
  // providers: [MatSnackBar],
  animations: [
    trigger('fromTo', [
      state('from', style({
        left: 'calc(50% - 15px)',
        top: '10px',
        display: 'none'
      })),
      state('to', style({
        top: '-120px',
        left: 'calc(50% - 15px)',
      })),
      transition('from => to', [
        style({
          display: 'block'
        }),
        animate('1s')
      ])
    ]),
  ],
})
export class BrokerComponent extends BaseComponent implements OnInit {
  @Input() broker: Broker;
  @HostBinding('style') style = {position: 'relative'}
  subscription: Subscription[] = [];


  constructor(iconsLibrary: NbIconLibraries, private brokerService: BrokerService,
              protected dialogService: NbDialogService) {
    super(dialogService);
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }


  ngOnInit(): void {
    super.ngOnInit();
    this.subscription.push(
      this.brokerService.currentBrokerId.pipe().subscribe((brokerId) => {
       if (brokerId== this.broker.id) {
         this.makeDeviceActive();
       }
      })
    );
    this.subscription.push(
      this.brokerService.animationToServer$.subscribe((data:{brokerId: string,sensorType: SensorType}) => {
        if (this.broker.id === data.brokerId) {
          this.sensorType = data.sensorType,
          this.playAnimation$.next();
        }
      })
    );
  }
  openSnackBar(): void {
    this.dialogService.open<any>(BrokerDialogComponent, {
      context: {
        broker: this.broker,
      },
    })
      .onClose.subscribe((editedBroker: any) => {
        if (!editedBroker){
          return;
        } else if (editedBroker === 'delete'){
          this.delete.emit();
        } else {
          Object.assign(this.broker, editedBroker);
        }
    });

  }

}
