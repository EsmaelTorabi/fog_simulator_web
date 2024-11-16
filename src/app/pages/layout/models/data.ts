import {SensorType} from './sensor_type.enum';
import {DataConfig} from './data_config.model';
import {TaskAnalyzeState} from './task_analyze_state.enum';

export class Data {
  id: string;
  value: string;
  sensorType: SensorType;
  config: DataConfig = new DataConfig();
  expireTime = 0.02;
  analyzeState: TaskAnalyzeState = TaskAnalyzeState.NOT_ANALYZED;
}
