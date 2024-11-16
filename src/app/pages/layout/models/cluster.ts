import {FogDevice} from "./fogDevice/fogdevice.model";
import {Server} from "./server.model";
import {Broker} from './broker.model';
import {Gateway} from "./gateway.model";
import {Sensor} from "./sensor/sensor";


export class Cluster {
  id: string;
  name: string;
  fogDeviceList: FogDevice[] = [];
  server: Server;
  totalSpace = 0;
  emptySpace = 0;
  // total empty space in fog nodes
  broker: Broker;
  sensorList: Sensor[] = [];
  gateway: Gateway;
  // maxSimulationTime = 60; //add in start

  constructor(name?: string, fogDeviceList?: FogDevice[], server?: Server, broker?: Broker,
              sensorList?: Sensor[], gateWay?: Gateway) {
    this.name = name ?? this.name;
    this.fogDeviceList = fogDeviceList ?? this.fogDeviceList;
    this.server = server ?? this.server;
    this.broker = broker ?? this.broker;
    this.sensorList = sensorList ?? this.sensorList;
    this.gateway = gateWay ?? this.gateway;
  }

}
