import {FogDeviceType} from '../fog_device_type.enum';
import {FogDeviceConfig} from './fogdevice_config.model';

export class FogDevice {
  id: string;
  name: string;
  config: FogDeviceConfig = new FogDeviceConfig();
  storage: number = 10000.0;
  serverId: string ;
  type: FogDeviceType = FogDeviceType.Analyzer;
  deviceType: DeviceType = DeviceType.laptop;
  createdAt: number;
  location: [number, number] = [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ];
  availability: number = Math.random() * (1 - 0.85) + 0.85;
  accessibility: number = Math.random() * (1 - 0.85) + 0.85;
  clusterName: string;
  animLeft?: number;
  animTop?: number;
constructor(name?: string, deviceType?: DeviceType) {
this.name = name;
this.deviceType = deviceType
}

}

export enum DeviceType {
  mobile = 'mobile',
  laptop = 'laptop',
}
