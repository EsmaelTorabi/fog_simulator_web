import {Component, Inject, OnInit} from '@angular/core';

import {FormDialogData} from '../form-dialog-data';
import {FormDialogModel, FormDialogModelTypes} from '../form-dialog-model';


@Component({
  selector: 'ngx-simple-form-dialog',
  templateUrl: './simple-form-dialog.component.html',
  styleUrls: ['./simple-form-dialog.component.scss'],
})
export class SimpleFormDialogComponent {
  localFormDialogModel = FormDialogModelTypes;

  // constructor(
  //   private dialogRef: MatDialogRef<SimpleFormDialogComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: FormDialogData,
  // ) {
  // }


  submit() {
  }

  return() {
    // this.dialogRef.close();
  }


  formDataToMap(): Map<string, any> {
    const filterMap = new Map();
    const data = {};
    // for (const item of this.data.formDialogList) {
    //   if (item.objKey) {
    //     if (!data[item.objKey]) {
    //       data[item.objKey] = {};
    //     }
    //     data[item.objKey][item.key] = item.value;
    //   } else {
    //     data[item.key] = item.value;
    //   }
    //   filterMap.set('data', data);
    // }
    return filterMap;
  }

  selectorChange(selector: FormDialogModel): void {
    // const dependentSelectors = this.data.formDialogList.filter(item => item.relatedKey === selector.key);
    // dependentSelectors.forEach((dependentSelector) => {
    //   dependentSelector.itemList = dependentSelector.itemMap.get(selector.value);
    //   dependentSelector.value = dependentSelector.itemList[0];
    // });
  }
}
