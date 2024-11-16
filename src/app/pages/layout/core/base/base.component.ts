import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {delay, tap} from 'rxjs/operators';
import {SensorType} from '../enums/sensor-type.enum';
import {MenuItem} from '../../models/menu-item';
import {FogDevice} from '../../models/fogDevice/fogdevice.model';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {Subject} from 'rxjs';
import {
  DialogNamePromptComponent
} from "../../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component";

@Component({
  selector: 'ngx-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  // providers: [MatSnackBar],
})
export class BaseComponent implements OnInit {
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  animationItemWidth = 30;
  playAnimation$ = new Subject<any>();
  animationState = 'from';
  isActive = false;
  isButtonsVisible = true;
  sensorType: SensorType;
  animationDelay = 0;
  snackBarMenuItems: MenuItem[] = [
    {
      text: 'delete',
      action: () => {
        this._delete();
      },
    },
    {
      text: 'edit',
      action: () => {
        this._edit();
      },
    }];

  constructor(protected dialogService: NbDialogService) {}

  ngOnInit(): void {
    this.playAnimation$.pipe(
      delay(this.animationDelay),
      tap(() => {
        this.animationState = 'to';
      }),
      delay(1000),
      tap(() => {
        this.animationState = 'from';
      }),
    ).subscribe();
  }

  makeDeviceActive(): void {
    this.isActive = true;
    setTimeout(() => {
      this.isActive = false;
    }, 1000);
  }


  closeSnackbar(): void {
  }

  private _delete(): void {
    this.delete.emit();
  }

  _edit(): void {
  }
}
