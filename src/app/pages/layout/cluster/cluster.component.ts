import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit,
  QueryList,
  Renderer2, SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import {BaseComponent} from '../core/base/base.component';
import {Subject} from 'rxjs';
import {ClusterService} from './cluster.service';
import {tap} from 'rxjs/operators';
import {FogDeviceComponent} from '../fog-device/fog-device.component';
import {SensorComponent} from '../sensor/sensor.component';
import {FogDeviceService} from '../fog-device/fog-device.service';
import {Cluster} from '../models/cluster';
import {Server} from '../models/server.model';
import {NbDialogService} from "@nebular/theme";

@Component({
  selector: 'ngx-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss'],
  // providers: [MatSnackBar],

})
export class ClusterComponent extends BaseComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChildren(FogDeviceComponent, {read: ElementRef}) devices: QueryList<ElementRef>;
  @ViewChildren(SensorComponent, {read: ElementRef}) sensors: QueryList<ElementRef>;
  @ViewChild('server', {read: ElementRef}) server: ElementRef<any>;
  @ViewChild('broker', {read: ElementRef}) broker: ElementRef<any>;
  @ViewChild('gateway', {read: ElementRef}) gateway: ElementRef<any>;

  @ViewChild('line', {static: true}) line: ElementRef<any>;
  @ViewChild('deviceServerSvg', {static: true}) serverDeviceSvg: ElementRef<any>;
  @ViewChild('gatewayBrokerSvg', {static: true}) gatewayBrokerSvg: ElementRef<any>;
  @ViewChild('brokerServerSvg', {static: true}) brokerServerSvg: ElementRef<any>;
  @ViewChild('gatewaySensorSvg', {static: true}) sensorGatewaySvg: ElementRef<any>;

  drawFogDeviceConnectionLines: Subject<any> = this.clusterService.drawFogDeviceConnectionLines;

  constructor(private renderer: Renderer2,
              private el: ElementRef,
              protected dialogService: NbDialogService,
              private clusterService: ClusterService,
              private fogDeviceService: FogDeviceService) {
    super(dialogService);
  }

  @Input() cluster: Cluster;

  ngOnInit(): void {
    this.drawFogDeviceConnectionLines.pipe(
      tap(() => {
        this.drawServerToDeviceConnectionLines();
      }),
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.cluste && !changes.cluste.firstChange) {
      this.drawServerToDeviceConnectionLines();
    }

  }

  ngAfterViewInit(): void {
    this.drawServerToDeviceConnectionLines();
    this.drawBrokerToServerConnectionLine();
    this.drawSensorsToGatewayConnectionLines();
  }



  onDeleteGateway(): void {
    delete this.cluster.gateway;
    setTimeout(() => {
      this.drawSensorsToGatewayConnectionLines();
      }, 0);

  }

  onDeleteBroker(): void {
    delete this.cluster.broker;
    setTimeout(() => {
      this.drawBrokerToServerConnectionLine();
    }, 0);

  }

  onDeleteServer(): void {
    delete this.cluster.server;
    setTimeout(() => {
      this.drawServerToDeviceConnectionLines();
      this.drawBrokerToServerConnectionLine();
    }, 0);

  }

  onDeleteDevice(deviceId: string): void {
    this.cluster.fogDeviceList.forEach((device, index) => {
      if (device.id === deviceId) {
        this.cluster.fogDeviceList.splice(index, 1);
        return;
      }
    });
    setTimeout(() => {
      this.drawServerToDeviceConnectionLines();
    }, 0);
  }

  onDeleteSensor(sensorId: string): void {
    this.cluster.sensorList.forEach((sensor, index) => {
      if (sensor.id === sensorId) {
        this.cluster.sensorList.splice(index, 1);
        return;
      }
    });
    setTimeout(() => {
      this.drawSensorsToGatewayConnectionLines();
    }, 0);
  }
  onEditServer(server: Server){}
  onEditBroker(broker){

  }
  onEditGateway(gateway){}
  onEditSensoe(sensor){}
  drawServerToDeviceConnectionLines(): void {
    if (!this.cluster.server || this.cluster.fogDeviceList?.length === 0) {
      return;
    }
    // const svg = this.serverDeviceSvg.nativeElement;
    // svg.querySelectorAll(':not(.original)').forEach(node => {
    //   this.renderer.removeChild(svg, node);
    // });
    this.devices?.forEach((device, index) => {
      // const clonedLine = svg.querySelector('#line').cloneNode(true);
      // this.renderer.appendChild(svg, clonedLine);
      // this.renderer.removeClass(clonedLine, 'original');
      const x1 = device.nativeElement.offsetLeft + (device.nativeElement.offsetWidth / 2);
      const x2 = this.server.nativeElement.offsetLeft + (this.server.nativeElement.offsetWidth / 2);
      this.cluster.fogDeviceList[index].animLeft = (x2 - x1 + 15 - this.animationItemWidth / 2);
      this.cluster.fogDeviceList[index].animTop = (84 - this.animationItemWidth / 2);
      //
      // this.renderer.setAttribute(clonedLine, 'x1', x1);
      // this.renderer.setAttribute(clonedLine, 'y1', '0');
      // this.renderer.setAttribute(clonedLine, 'x2', x2);
      // this.renderer.setAttribute(clonedLine, 'y2', '30');
    });
  }

  drawSensorsToGatewayConnectionLines(): void {
    const middleSensorIndex = Math.floor(this.sensors.length / 2);
    this.sensors?.forEach((sensor, currentIndex) => {
      const diffWithMiddle = middleSensorIndex - currentIndex;
      this.cluster.sensorList[currentIndex].animLeft = (diffWithMiddle * (36 + 5) ) + 'px';
    });
  }


  drawBrokerToServerConnectionLine(): void {
    if (this.cluster.server && this.cluster.broker) {
      this.cluster.broker.animTop = (-120 + this.animationItemWidth / 2).toString() + 'px';

    }
  }
}
