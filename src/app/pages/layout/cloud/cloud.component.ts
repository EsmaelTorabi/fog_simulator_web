import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CloudService} from './cloud.service';
import {BaseComponent} from '../core/base/base.component';
import {NbDialogService} from "@nebular/theme";

@Component({
  selector: 'ngx-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.scss'],
  // providers: [MatSnackBar]
})
export class CloudComponent extends BaseComponent implements OnInit {
@Input() cloud;
  subscription: Subscription[] = [];

  constructor(private cloudService: CloudService,
              protected dialogService: NbDialogService
  ) {
    super(dialogService);
  }

  ngOnInit(): void {
    this.subscription.push(
      this.cloudService.cloudActivity.subscribe((isActive) => {
       this.makeDeviceActive();
      }),
    );  }

}
