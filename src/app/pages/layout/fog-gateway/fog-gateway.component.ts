import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {GatewayService} from './gateway.service';
import {Subscription} from 'rxjs';
import {BaseComponent} from '../core/base/base.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SensorType} from '../core/enums/sensor-type.enum';
import {Gateway} from "../models/gateway.model";
import {NbDialogService} from "@nebular/theme";
import {BrokerDialogComponent} from "../broker/broker-dialog/broker-dialog.component";
import {FogGatewayDialogComponent} from "./fog-gateway-dialog/fog-gateway-dialog.component";

@Component({
  selector: 'ngx-fog-gateway',
  templateUrl: './fog-gateway.component.html',
  styleUrls: ['./fog-gateway.component.scss'],
  animations: [
    trigger('fromTo', [
      // ...
      state('from', style({
        left: 'calc(50% - 15px)',
        top: '10px',
        display: 'none'
      })),
      state('to', style({
        top: '-100px',
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
export class FogGatewayComponent extends BaseComponent implements OnInit {
  @Input() gateway: Gateway;
  @HostBinding('style') style = {position: 'relative'}
  subscription: Subscription[] = [];


  constructor(private gatewayService: GatewayService,
              protected dialogService: NbDialogService
  ) {
    super(dialogService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.subscription.push(
      this.gatewayService.currentGateway$.subscribe((gateway) => {
        if (gateway.gatewayId == this.gateway.id) {
          this.makeDeviceActive();
        }
      }),
    );
    this.subscription.push(
      this.gatewayService.animationToBroker$.subscribe((data:{gateWayId: string, sensorType: SensorType}) => {
        if (this.gateway.id === data.gateWayId) {
          this.sensorType = data.sensorType;
          this.playAnimation$.next();
        }
      }),
    );
  }

  openSnackBar(): void {
    this.dialogService.open<any>(FogGatewayDialogComponent, {
      context: {
        gateWay: this.gateway,
      },
    })
      .onClose.subscribe((editedGateway: any) => {
      if (!editedGateway){
        return;
      } else if (editedGateway === 'delete'){
        this.delete.emit();
      } else {
        Object.assign(this.gateway, editedGateway);
      }
    });

  }

}
