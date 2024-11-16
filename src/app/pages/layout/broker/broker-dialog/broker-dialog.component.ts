import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {
  DialogNamePromptComponent
} from '../../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Cluster} from '../../models/cluster';
import {FogDeviceType} from '../../models/fog_device_type.enum';
import {Broker} from "../../models/broker.model";
import {ClusterService} from "../../cluster/cluster.service";
import {DeviceType} from "../../models/fogDevice/fogdevice.model";
import {DialogBaseComponent} from "../../core/base/dialog-base/dialog-base.component";

@Component({
  selector: 'ngx-broker-dialog',
  templateUrl: './broker-dialog.component.html',

})
export class BrokerDialogComponent extends DialogBaseComponent implements OnInit {
  @Input() broker: Broker;
  @Input() clusterList: Cluster[];

  ngOnInit() {
    super.ngOnInit();
    this.form = new FormGroup({
      name: new FormControl(this.broker?.name, Validators.required),
      serverId: new FormControl(this.broker?.serverId, Validators.required),
      delay: new FormControl(this.broker?.delay, Validators.required),
      clusterName: new FormControl(this.broker?.clusterName, Validators.required),
    });
  }


}
