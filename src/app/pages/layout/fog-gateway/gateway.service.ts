import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormDialogData} from '../core/form-dialog/form-dialog-data';
import {FormDialogModel, FormDialogModelTypes} from '../core/form-dialog/form-dialog-model';
import {Cluster} from '../models/cluster';
import {SensorType} from '../core/enums/sensor-type.enum';
import {Gateway} from "../models/gateway.model";

@Injectable({
  providedIn: 'root',
})
export class GatewayService {
  currentGateway$: Subject<{ gatewayId: string, sensorType: SensorType }> = new Subject();
  animationToBroker$: Subject<{ gateWayId: string, sensorType: SensorType }> = new Subject();

  // constructor(private dialog: MatDialog) {
  // }

  animationToBroker(gateWayId: string, sensorType: SensorType) {
    this.animationToBroker$.next({gateWayId: gateWayId, sensorType: sensorType});
  }

  setCurrentGateway = (gatewayId, sensorType) => {
    this.currentGateway$.next({gatewayId, sensorType});
  }

  private gatewayFormDialogList(initValue: Gateway, clusters: Cluster[], isEditMode = false): FormDialogModel[] {
    return [
      new FormDialogModel(
        'name',
        FormDialogModelTypes.string,
        'name',
        null,
        initValue.name,
        true,
      ),
      new FormDialogModel(
        'clusterName',
        isEditMode ? FormDialogModelTypes.string : FormDialogModelTypes.select,
        'cluster',
        clusters,
        null,
        true,
        null,
        'name',
        'name',
        null,
        null,
        null,
        isEditMode,
      ),
      new FormDialogModel(
        'delay',
        FormDialogModelTypes.number,
        'delay',
        clusters,
        initValue.delay,
        true,
        null,
      ),
    ];
  }



  editGateway(gateway: Gateway): Observable<any> {
    const dialogData = new FormDialogData(
      'ویرایش Gateway',
      this.gatewayFormDialogList(gateway, null, true),
    );
    return new Observable<any>();
    // const dialogRef = this.dialog.open(SimpleFormDialogComponent, {
    //   minWidth: '400px',
    //   data: dialogData,
    // });
    // return dialogRef
    //   .afterClosed()
    //   .pipe(
    //     filter((res: any) => res),
    //     map((mapResult: Map<string, any>) => mapResult.get('data') as Gateway),
    //     tap((editedGateway) => {
    //       Object.assign(gateway, editedGateway);
    //     }),
    //   );
  }
}
