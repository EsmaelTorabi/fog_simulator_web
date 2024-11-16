import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../../core/base/base.component";
import {DialogBaseComponent} from "../../core/base/dialog-base/dialog-base.component";
import {DataPlacementType} from "../../models/data-placement-type";
import {TaskPlacementType} from "../../models/task-placement-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-start-dialog',
  templateUrl: './start-dialog.component.html',
  styleUrls: ['./start-dialog.component.scss']
})
export class StartDialogComponent extends DialogBaseComponent implements OnInit {

  dataPlacementType = DataPlacementType;
  taskPlacementType = TaskPlacementType;
  ngOnInit() {
    super.ngOnInit();
    this.form = new FormGroup({
      dataPlacementType: new FormControl(null),
      taskPlacementType: new FormControl(null),
      maxSimulationTime: new FormControl(60),
    });
  }
  change(){
    setTimeout(()=>{
      switch (this.form.value['dataPlacementType']) {
        case DataPlacementType.CUSTOM_CA_REPLICA:
          this.form.controls['taskPlacementType'].setValue(TaskPlacementType.CUSTOM_PERFORMANCE_AWARE)
          break;
        case DataPlacementType.CA_REPLICA:
          this.form.controls['taskPlacementType'].setValue(TaskPlacementType.PERFORMANCE_AWARE)
          break;
        case DataPlacementType.FULL_REPLICA:
          this.form.controls['taskPlacementType'].setValue(TaskPlacementType.RANDOM)

          break;
        case DataPlacementType.NO_REPLICA:
          this.form.controls['taskPlacementType'].setValue(null)

          break;
        case DataPlacementType.ONE_REPLICA:
          this.form.controls['taskPlacementType'].setValue(TaskPlacementType.DATA_AWARE)

          break
      }
    })
 }
}
