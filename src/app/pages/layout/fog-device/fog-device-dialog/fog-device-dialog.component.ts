import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {
  DialogNamePromptComponent
} from '../../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Cluster} from '../../models/cluster';
import {DeviceType, FogDevice} from '../../models/fogDevice/fogdevice.model';
import {FogDeviceType} from "../../models/fog_device_type.enum";
import {Broker} from "../../models/broker.model";
import {DialogBaseComponent} from "../../core/base/dialog-base/dialog-base.component";

@Component({
  selector: 'ngx-server-dialog',
  templateUrl: './fog-device-dialog.component.html',

})
export class FogDeviceDialogComponent extends DialogBaseComponent implements OnInit{
  @Input() fogDevice: FogDevice;
  fogDeviceTypes = FogDeviceType;
  deviceTypes = DeviceType;
configForm: any;
  ngOnInit(): void {
    super.ngOnInit();
    this.form = new FormGroup({
      clusterName: new FormControl(this.fogDevice?.clusterName, Validators.required),
      name: new FormControl(this.fogDevice?.name, Validators.required),
      storage: new FormControl(this.fogDevice?.storage),
      serverId: new FormControl(this.fogDevice?.serverId),
      type: new FormControl(this.fogDevice?.type),
      createdAt: new FormControl(this.fogDevice?.createdAt),
      deviceType: new FormControl(this.fogDevice?.deviceType),
    });
    this.configForm = new FormGroup({
      aEpsilon: new FormControl(this.fogDevice?.config?.aEpsilon),
      bEpsilon: new FormControl(this.fogDevice?.config?.bEpsilon),
      tEpsilon: new FormControl(this.fogDevice?.config?.tEpsilon),
      db1: new FormControl(this.fogDevice?.config?.db1),
      db2: new FormControl(this.fogDevice?.config?.db2),
      db3: new FormControl(this.fogDevice?.config?.db3),
      db4: new FormControl(this.fogDevice?.config?.db4),
      db5: new FormControl(this.fogDevice?.config?.db5),
      costPerBusyTime: new FormControl(this.fogDevice?.config?.costPerBusyTime),
      costPerIdleTime: new FormControl(this.fogDevice?.config?.costPerIdleTime),
      currentAttendanceTime: new FormControl(this.fogDevice?.config?.currentAttendanceTime),
      devicePresenceMiddle: new FormControl(this.fogDevice?.config?.devicePresenceMiddle),
      downloadBW: new FormControl(this.fogDevice?.config?.downloadBW),
      devicesPresenceVariance: new FormControl(this.fogDevice?.config?.devicesPresenceVariance),
      flu: new FormControl(this.fogDevice?.config?.flu),
      minDataSize: new FormControl(this.fogDevice?.config?.minDataSize),
      minExpireTime: new FormControl(this.fogDevice?.config?.minExpireTime),
      uploadBW: new FormControl(this.fogDevice?.config?.uploadBW),
      minStoragePercent: new FormControl(this.fogDevice?.config?.minStoragePercent),
    });
  }

  submit(){
    this.form.value.config = this.configForm.value;
    super.submit();
  }}
