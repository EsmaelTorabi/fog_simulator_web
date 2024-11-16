import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {FormDialogData} from '../core/form-dialog/form-dialog-data';
import {FormDialogModel, FormDialogModelTypes} from '../core/form-dialog/form-dialog-model';
import {SimpleFormDialogComponent} from '../core/form-dialog/simple-form-dialog/simple-form-dialog.component';
import {filter, map, tap} from 'rxjs/operators';
import {Event} from '../models/event';
import {Server, ServerType} from '../models/server.model';


@Injectable({
  providedIn: 'root',
})
export class ServerService {
  currentServer$ = new Subject<{id: string, type: ServerType}>();
  serverTuple$ = new Subject<Event>();



    setCurrentServer(serverId: string, type: ServerType, tuple?: Event): void {
    this.currentServer$.next({id: serverId, type: type});
  }
  updateServerTuple(tuple: Event){
    this.serverTuple$.next(tuple);
  }

    private serverFormDialogList(initValue: Server, clusters: Cluster[], isEditMode = false): FormDialogModel[] {
   return  [
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
     isEditMode),
 ];
  }
    editServer(server: Server): Observable<any> {
    const dialogData = new FormDialogData(
      'ویرایش سرور',
      this.serverFormDialogList(server, null, true),
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
    //     map((mapResult: Map<string, any>) => mapResult.get('data') as Server),
    //     tap((editedServer) => {
    //       Object.assign(server, editedServer);
    //     }),
    //   );
  }

}
