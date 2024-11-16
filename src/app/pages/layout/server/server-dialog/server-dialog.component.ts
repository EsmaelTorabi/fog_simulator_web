import {Component, Input, OnInit} from '@angular/core';
import {NbButtonModule, NbCardModule, NbDialogRef, NbInputModule} from "@nebular/theme";
import {
  DialogNamePromptComponent
} from '../../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DialogBaseComponent} from "../../core/base/dialog-base/dialog-base.component";
import {Server} from "../../models/server.model";

@Component({
  selector: 'ngx-server-dialog',
  templateUrl: './server-dialog.component.html',

})
export class ServerDialogComponent extends DialogBaseComponent  implements OnInit{
  @Input() server: Server;

  ngOnInit() {
    super.ngOnInit();
    this.form = new FormGroup({
      id: new FormControl(this.server?.id, Validators.required),
      name: new FormControl(this.server?.name, Validators.required),
      delay: new FormControl(this.server?.delay, Validators.required),
      clusterName: new FormControl(this.server?.clusterName, Validators.required),
    });
  }
}
