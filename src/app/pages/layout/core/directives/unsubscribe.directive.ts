import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[ngxUnsubscribe]',
})
export class UnsubscribeDirective implements OnDestroy {
  unsubscribe$ = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
