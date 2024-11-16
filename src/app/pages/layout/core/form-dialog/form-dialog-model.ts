export class FormDialogModel {
  key: string;
  type: string;
  label: string;
  itemList: any[] | Map<string, any>;
  itemFieldName: string;
  valueFieldName: string;
  value: string | number | boolean;
  required: boolean;
  objKey: string;
  hasEmptyOption: boolean;
  relatedKey: string;
  itemMap: Map<any, any[]>;
  readonly: boolean;

  constructor(
    key: string,
    type: string,
    label?: string,
    itemList?: any[] | Map<string, any>,
    value?: string | number | boolean,
    required: boolean = false,
    objKey?: string,
    itemFieldName?: string,
    valueFieldName?: string,
    hasEmptyOption: boolean = true,
    relatedKey?:string,
    itemMap?: Map<any, any[]>,
    readOnly?: boolean,
  ) {
    this.key = key;
    this.type = type;
    this.label = label;
    this.itemList = itemList;
    this.itemFieldName = itemFieldName;
    this.valueFieldName = valueFieldName;
    this.value = value;
    this.required = required;
    this.objKey = objKey;
    this.hasEmptyOption = hasEmptyOption;
    this.relatedKey = relatedKey;
    this.readonly = readOnly;
    this.itemMap = itemMap;
  }
}

export enum FormDialogModelTypes {
  select = 'select',
  dependentSelect = 'dependentSelect',
  string = 'string',
  number = 'number',
  checkBox = 'checkBox',
  radioButton = 'radioButton',
  date = 'date',
  password = 'password',
  latLng = 'latLng',
  selectAddressFromCedar = 'selectAddressFromCedar',
}
