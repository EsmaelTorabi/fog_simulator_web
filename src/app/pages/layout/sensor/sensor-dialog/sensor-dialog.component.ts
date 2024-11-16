import {Component, Input, OnInit} from '@angular/core';
import {NbButtonModule, NbCardModule, NbDialogRef, NbInputModule} from '@nebular/theme';
import {
  DialogNamePromptComponent
} from '../../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Cluster} from '../../models/cluster';
import {FogDeviceType} from '../../models/fog_device_type.enum';
import {Sensor} from "../../models/sensor/sensor";
import {DialogBaseComponent} from "../../core/base/dialog-base/dialog-base.component";
import {Broker} from "../../models/broker.model";

@Component({
  selector: 'ngx-sensor-dialog',
  templateUrl: './sensor-dialog.component.html',

})
export class SensorDialogComponent extends DialogBaseComponent implements OnInit{
  @Input() sensor: Sensor;

  ngOnInit() {
    super.ngOnInit();
    this.form = new FormGroup({
      name: new FormControl(this.sensor?.name, Validators.required),
      clusterName: new FormControl(this.sensor?.clusterName, Validators.required),
    });
  }
}
