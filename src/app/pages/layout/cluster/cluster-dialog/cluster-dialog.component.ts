import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {
  DialogNamePromptComponent
} from "../../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-cluster-dialog',
  templateUrl: './cluster-dialog.component.html',
})
export class ClusterDialogComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    totalSpace: new FormControl(0, Validators.required),
    emptySpace: new FormControl(0, Validators.required),
  });

  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>) {
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close(this.form.value);
  }
}
