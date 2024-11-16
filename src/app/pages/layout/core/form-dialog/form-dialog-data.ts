import { FormDialogModel } from './form-dialog-model';

export class FormDialogData {
  dialogTitle: string;
  cancelBtnText: string;
  submitBtnText: string;
  formDialogList: FormDialogModel[];
  isCancelBtnVisible: boolean;

  constructor(
    dialogTitle: string,
    formDialogList: FormDialogModel[],
    cancelBtnText: string = 'انصراف',
    submitBtnText: string = 'ثبت',
    isCancelBtnVisible = true
  ) {
    this.dialogTitle = dialogTitle;
    this.cancelBtnText = cancelBtnText;
    this.submitBtnText = submitBtnText;
    this.formDialogList = formDialogList;
    this.isCancelBtnVisible = isCancelBtnVisible;
  }
}
