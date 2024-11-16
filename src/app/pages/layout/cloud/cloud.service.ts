import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  cloudActivity: BehaviorSubject<boolean> = new BehaviorSubject(false);

  changeCloudActivity(isActive: boolean): void {
    this.cloudActivity.next(isActive);
  }
}
