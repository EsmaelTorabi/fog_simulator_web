import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {
  DialogNamePromptComponent
} from "../../../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component";
import {Cluster} from "../../../models/cluster";

@Component({
  selector: 'ngx-dialog-base',
  templateUrl: './dialog-base.component.html',
  styleUrls: ['./dialog-base.component.scss']
})
export class DialogBaseComponent implements OnInit {
  @Input() clusterList: Cluster[];

   @Input() dialogMode: 'edit' | 'view' | 'create' = 'view';
  form: any;


  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>) {
  }

  ngOnInit() {
  }

  edit() {
    this.dialogMode = 'edit';
  }

  delete() {
    this.ref.close('delete');
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close(this.form.value);
  }

}
