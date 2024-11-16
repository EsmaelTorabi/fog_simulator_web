import {Data} from './data';
import {EventType} from './event_type.enum';
import {AnalyzedData} from './analyzed_data.model';
import {Warning} from './warning.model';
import {Cluster} from "./cluster";
import {Result} from "./result";

export class Event {
  id = '0';
  data: Data = new Data();
  senderId = '0';
  receiverId = '0';
  delay = 0;
  date: number = null;
  eventType: EventType = EventType.NONE;

  dataId = '0';
  requestedData: AnalyzedData;
  type: string;
  warning: Warning;
  clusterList: Cluster[];
  result: Result

}
