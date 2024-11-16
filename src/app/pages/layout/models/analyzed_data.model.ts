import {SensorType} from './sensor_type.enum';
import {Data} from './data';

export class AnalyzedData {
  id: string;
  sensorType: SensorType;
  value: number;
  data: Data;
  runtime = 0;
}
