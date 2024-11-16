import {Component, OnInit} from '@angular/core';
import { fruits } from './fruits-list';
import {Subscription} from 'rxjs';
import {FogDeviceService} from '../fog-device/fog-device.service';
import {ServerService} from '../server/server.service';
import {SensorService} from '../sensor/sensor.service';
import {BrokerService} from '../broker/broker.service';
import {GatewayService} from '../fog-gateway/gateway.service';
import {NbDialogService} from "@nebular/theme";
import {ClusterService} from "../cluster/cluster.service";
import {FogGatewayDialogComponent} from "../fog-gateway/fog-gateway-dialog/fog-gateway-dialog.component";
import {Gateway} from "../models/gateway.model";
import {Cluster} from '../models/cluster';
import {BrokerDialogComponent} from "../broker/broker-dialog/broker-dialog.component";
import {Broker} from "../models/broker.model";
import {SensorDialogComponent} from "../sensor/sensor-dialog/sensor-dialog.component";
import {Sensor} from "../models/sensor/sensor";
import {FogDevice} from "../models/fogDevice/fogdevice.model";
import {FogDeviceDialogComponent} from "../fog-device/fog-device-dialog/fog-device-dialog.component";
import {ServerDialogComponent} from "../server/server-dialog/server-dialog.component";
import {Server} from "../models/server.model";


@Component({
  selector: 'ngx-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent implements OnInit{
  subscriptions: Subscription[] = [];
  clusterList: Cluster[];

  constructor(
    private gatewayService: GatewayService,
    private clusterService: ClusterService,
    private brokerService: BrokerService,
    private sensorService: SensorService,
    private fogDeviceService: FogDeviceService,
    private serverService: ServerService,
    private dialogService: NbDialogService
  ) {
  }


  ngOnInit(): void {
    this.subscriptions.push(this.clusterService.clusters$.subscribe((clusters: Cluster[]) => {
      this.clusterList = clusters;
    }));
  }

  creatNewGateway(): void {
    this.dialogService.open<any>(FogGatewayDialogComponent, {
      context: {
        clusterList: this.clusterList,
        dialogMode: 'create'
      },
    })
      .onClose.subscribe((gateway: Gateway) => {
        const newGateway = {... new Gateway(), ...gateway}
        if (newGateway){
          this.clusterList.forEach((cluster: Cluster) => {
            if (cluster.name === newGateway.clusterName) {
              this.clusterService.addGateway(cluster, newGateway);
            }
          });
        }
    });
  }

  creatNewBroker(): void {
    this.dialogService.open<any>(BrokerDialogComponent, {
      context: {
        clusterList: this.clusterList,
        dialogMode: 'create'
      },
    })
      .onClose.subscribe((broker: Broker) => {
      const newBroker = {... new Broker(), ...broker};

      if (newBroker){
          this.clusterList.forEach((cluster: Cluster) => {
            if (cluster.name === newBroker.clusterName) {
              this.clusterService.addBroker(cluster, newBroker);
            }
          });
        }
    });
  }

  creatNewSensor(): void {
    this.dialogService.open<any>(SensorDialogComponent, {
      context: {
        clusterList: this.clusterList,
        dialogMode: 'create'
      },
    })
      .onClose.subscribe((sensor: Sensor) => {
      const newSensor = {... new Sensor(), ...sensor};

      if (newSensor){
          this.clusterList.forEach((cluster: Cluster) => {
            if (cluster.name === newSensor.clusterName) {
              this.clusterService.addSensor(cluster, newSensor);
            }
          });
        }
    });
  }


  creatNewFogDevice(): void {
    this.dialogService.open<any>(FogDeviceDialogComponent, {
      context: {
        clusterList: this.clusterList,
        dialogMode: 'create'
      },
    })
      .onClose.subscribe((fogDevice: FogDevice) => {
      const newFogDevice = {... new FogDevice(), ...fogDevice};

      if (newFogDevice){
          this.clusterList.forEach((cluster: Cluster) => {
            if (cluster.name === newFogDevice.clusterName) {
              this.clusterService.addFogDevice(cluster, newFogDevice);
            }
          });
        }
    });

  }

  creatNewCluster(): void {
    this.clusterService.creatNewCluster();
  }

  creatNewServer(): void {
    this.dialogService.open<any>(ServerDialogComponent, {
      context: {
        clusterList: this.clusterList,
        dialogMode: 'create'
      },
    })
      .onClose.subscribe((server: Server) => {
      const newServer = {... new Server(), ...server};

      if (newServer){
          this.clusterList.forEach((cluster: Cluster) => {
            if (cluster.name === newServer.clusterName) {
              this.clusterService.addServer(cluster, newServer);
            }
          });
        }

    });

  }
}
