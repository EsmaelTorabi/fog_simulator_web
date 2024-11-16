import {Component, Input, OnInit} from '@angular/core';
import {SensorType} from '../core/enums/sensor-type.enum';

@Component({
  selector: 'ngx-from-to-animation',
  templateUrl: './from-to-animation.component.html',
  styleUrls: ['./from-to-animation.component.css']
})
export class FromToAnimationComponent {
  sensorTypes = SensorType;
@Input() type: SensorType
  constructor() { }


}
