import {Component, Input, OnInit} from '@angular/core';
import {NbButtonModule, NbCardModule, NbDialogRef, NbInputModule} from '@nebular/theme';
import {
  DialogNamePromptComponent
} from '../../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Cluster} from '../../models/cluster';
import {FogDeviceType} from '../../models/fog_device_type.enum';
import {DialogBaseComponent} from "../../core/base/dialog-base/dialog-base.component";
import {Broker} from "../../models/broker.model";
import {Gateway} from "../../models/gateway.model";

@Component({
  selector: 'ngx-server-dialog',
  templateUrl: './fog-gateway-dialog.component.html',

})
export class FogGatewayDialogComponent extends DialogBaseComponent implements OnInit {
  @Input() gateWay: Gateway;

  ngOnInit() {
    super.ngOnInit();
    this.form = new FormGroup({
      name: new FormControl(this.gateWay?.name, Validators.required),
      brokerId: new FormControl(this.gateWay?.brokerId, Validators.required),
      delay: new FormControl(this.gateWay?.delay, Validators.required),
      clusterName: new FormControl(this.gateWay?.clusterName, Validators.required),
    });
  }
}
