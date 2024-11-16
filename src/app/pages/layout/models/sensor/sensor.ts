import {SensorCharacteristic} from './sensor_characteristic.model';
import {SensorType} from '../sensor_type.enum';
import {DataConfig} from '../data_config.model';

export class Sensor {
  id: string;
  name: string;
  gatewayId: string;
  characteristics: SensorCharacteristic[] = [
    {
      cpu: 1000,
      ram: 100,
      bandwidth: 100,
      power: 1000,
    },
  ];
  latency: number = 0;
  frequency: number = Math.floor(Math.random() * (12000 - 6000 + 1)) + 6000;
  availability: number = Math.random() * (1 - 0.95) + 0.95;
  sensorType: SensorType = SensorType.TEMPERATURE;
  dataConfig: DataConfig = new DataConfig();
  clusterName: string;
  animLeft?: string;
  animTop?: string;
  dataProcessTime: number = 3000;

  constructor(name?: string) {
    this.name = name;
  }
}
