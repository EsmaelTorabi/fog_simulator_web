import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Broker} from '../../models/broker.model';
import {DialogBaseComponent} from '../../core/base/dialog-base/dialog-base.component';

@Component({
  selector: 'ngx-start-dialog',
  templateUrl: './save-dialog.component.html',

})
export class SaveDialogComponent extends DialogBaseComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      });
  }

}
