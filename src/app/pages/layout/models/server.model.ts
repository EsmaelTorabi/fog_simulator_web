import {FogDevice} from './fogDevice/fogdevice.model';


export class Server {
  id: string;
  name: string;
  delay: number = 0;
  deviceList: FogDevice[];
  location: [number, number] = [0, 0];
  clusterName: string;
  constructor(name?: string) {
    this.name = name;
  }
}
export enum ServerType {
  Core = 'core',
  Garbage = 'garbage_collector',
  Runtimetime = 'runtimetime_adaption'
}
